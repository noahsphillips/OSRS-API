let Department = require('../classes/Department'),
    Models = require('../classes/Models'),
    _ = require('underscore')

module.exports = (router) => {

    router.get('/', async (req, res) => {

        var departments = new Models('department')
        try {
            departments = await departments.getAll()
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (!departments) {
            return res.status(404).json({})
        }

        return res.json(departments)

    })

    router.post('/', async (req, res) => {

        var department = new Department()

        department = await department.create(req.body)

        return res.json(department)

    })

    router.get('/:id([0-9]+)', async (req, res) => {

        var departments = new Models('department')

        try {
            departments = await departments.getOne({id: req.params.id})
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (!departments) {
            return res.status(404).json({})
        }

        return res.json(departments)

    })

    router.patch('/:id([0-9]+)', async (req, res) => {

        var department = new Department()

        try {
            await department.fetch({id:req.params.id})
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (department.getAttributes()['id'] === null) {
            return res.status(404).json({message: "Department not found"})
        }

        try {
            await department.update(req.body)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
        return res.json(department.getAttributes())

    })

    router.delete('/:id([0-9]+)', async (req, res) => {

        var department = new Department()

        try {
            await department.fetch({id:req.params.id})
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (department.getAttributes().id === undefined) {
            return res.status(404).json({})
        }

        try {
            await department.delete()
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        return res.send('deleted')

    })

    return router
}
