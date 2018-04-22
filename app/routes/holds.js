let Hold = require('../classes/Hold'),
    Models = require('../classes/Models'),
    _ = require('underscore')

module.exports = (router) => {

    router.get('/', async (req, res) => {

        var holds = new Models('hold')
        try {
            holds = await holds.getAll()
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (!holds) {
            return res.status(404).json({})
        }

        return res.json(holds)

    })

    router.post('/', async (req, res) => {

        var hold = new Hold()

        hold = await hold.create(req.body)

        return res.json(hold)

    })

    router.get('/:id([0-9]+)', async (req, res) => {

        var holds = new Models('hold')

        try {
            holds = await holds.getOne({id: req.params.id})
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (!holds) {
            return res.status(404).json({})
        }

        return res.json(holds)

    })

    router.patch('/:id([0-9]+)', async (req, res) => {

        var hold = new Hold()

        try {
            await hold.fetch({id:req.params.id})
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (hold.getAttributes()['id'] === null) {
            return res.status(404).json({message: "Hold not found"})
        }

        try {
            await hold.update(req.body)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
        return res.json(hold.getAttributes())

    })

    router.delete('/:id([0-9]+)', async (req, res) => {

        var hold = new Hold()

        try {
            await hold.fetch({id:req.params.id})
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (hold.getAttributes().id === undefined) {
            return res.status(404).json({})
        }

        try {
            await hold.delete()
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        return res.send('deleted')

    })

    return router
}
