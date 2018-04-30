let Course = require('../classes/Course'),
    Models = require('../classes/Models'),
    _ = require('underscore')

module.exports = (router) => {

    router.get('/', async (req, res) => {

        console.log(req.query)

        var include = []

        if (req.query.include) {
            include = req.query.include
            delete req.query.include
        }

        var courses = new Models('course')
        console.log('made it past')
        try {
            courses = await courses.getAll(req.query, include)
            console.log('so it is here')
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (!courses) {
            return res.status(404).json({})
        }

        return res.json(courses)

    })

    router.post('/', async (req, res) => {

        var course = new Course()

        course = await course.create(req.body)

        return res.json(course)

    })

    router.get('/:id([0-9]+)', async (req, res) => {

        var include = []

        if (req.query.include) {
            include = req.query.include
            delete req.query.include
        }

        var courses = new Models('course')

        try {
            courses = await courses.getOne({id: req.params.id}, include)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (!courses) {
            return res.status(404).json({})
        }

        return res.json(courses)

    })

    router.patch('/:id([0-9]+)', async (req, res) => {

        var course = new Course()

        try {
            await course.fetch({id:req.params.id})
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (course.getAttributes()['id'] === null) {
            return res.status(404).json({message: "Course not found"})
        }

        try {
            await course.update(req.body)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
        return res.json(course.getAttributes())

    })

    router.delete('/:id([0-9]+)', async (req, res) => {

        var course = new Course()

        try {
            await course.fetch({id:req.params.id})
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (course.getAttributes().id === undefined) {
            return res.status(404).json({})
        }

        try {
            await course.delete()
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        return res.send('deleted')

    })

    return router
}
