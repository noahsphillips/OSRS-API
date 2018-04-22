let Classroom = require('../classes/Classroom'),
    Models = require('../classes/Models'),
    _ = require('underscore')

module.exports = (router) => {

    router.get('/', async (req, res) => {

        var classrooms = new Models('classroom')
        try {
            classrooms = await classrooms.getAll()
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (!classrooms) {
            return res.status(404).json({})
        }

        return res.json(classrooms)

    })

    router.post('/', async (req, res) => {

        var classroom = new Classroom()

        classroom = await classroom.create(req.body)

        return res.json(classroom)

    })

    router.get('/:id([0-9]+)', async (req, res) => {

        var classrooms = new Models('classroom')

        try {
            classrooms = await classrooms.getOne({id: req.params.id})
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (!classrooms) {
            return res.status(404).json({})
        }

        return res.json(classrooms)

    })

    router.patch('/:id([0-9]+)', async (req, res) => {

        var classroom = new Classroom()

        try {
            await classroom.fetch({id:req.params.id})
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (classroom.getAttributes()['id'] === null) {
            return res.status(404).json({message: "Classroom not found"})
        }

        try {
            await classroom.update(req.body)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
        return res.json(classroom.getAttributes())

    })

    router.delete('/:id([0-9]+)', async (req, res) => {

        var classroom = new Classroom()

        try {
            await classroom.fetch({id:req.params.id})
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (classroom.getAttributes().id === undefined) {
            return res.status(404).json({})
        }

        try {
            await classroom.delete()
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        return res.send('deleted')

    })

    return router
}
