let Grade = require('../classes/Grade'),
    Models = require('../classes/Models'),
    _ = require('underscore')

module.exports = (router) => {

    router.get('/', async (req, res) => {

        var include = []

        if (req.query.include) {
            include = req.query.include
            delete req.query.include
        }

        var grades = new Models('grade')
        try {
            grades = await grades.getAll(req.query, include)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (!grades) {
            return res.status(404).json({})
        }

        return res.json(grades)

    })

    router.post('/', async (req, res) => {

        var grade = new Grade()

        grade = await grade.create(req.body)

        return res.json(grade)

    })

    router.get('/:id([0-9]+)', async (req, res) => {

        var include = []

        if (req.query.include) {
            include = req.query.include
            delete req.query.include
        }

        var grades = new Models('grade')

        try {
            grades = await grades.getOne({id: req.params.id}, include)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (!grades) {
            return res.status(404).json({})
        }

        return res.json(grades)

    })

    router.patch('/:id([0-9]+)', async (req, res) => {

        var grade = new Grade()

        try {
            await grade.fetch({id:req.params.id})
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (grade.getAttributes()['id'] === null) {
            return res.status(404).json({message: "Grade not found"})
        }

        try {
            await grade.update(req.body)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
        return res.json(grade.getAttributes())

    })

    router.delete('/:id([0-9]+)', async (req, res) => {

        var grade = new Grade()

        try {
            await grade.fetch({id:req.params.id})
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (grade.getAttributes().id === undefined) {
            return res.status(404).json({})
        }

        try {
            await grade.delete()
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        return res.send('deleted')

    })

    return router
}
