let Building = require('../classes/Building'),
    Models = require('../classes/Models'),
    _ = require('underscore')

module.exports = (router) => {

    router.get('/', async (req, res) => {

        var buildings = new Models('building')
        try {
            buildings = await buildings.getAll()
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (!buildings) {
            return res.status(404).json({})
        }

        return res.json(buildings)

    })

    router.post('/', async (req, res) => {

        var building = new Building()

        building = await building.create(req.body)

        return res.json(building)

    })

    router.get('/:id([0-9]+)', async (req, res) => {

        var buildings = new Models('building')

        try {
            buildings = await buildings.getOne({id: req.params.id})
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (!buildings) {
            return res.status(404).json({})
        }

        return res.json(buildings)

    })

    router.patch('/:id([0-9]+)', async (req, res) => {

        var building = new Building()

        try {
            await building.fetch({id:req.params.id})
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (building.getAttributes().id === undefined) {
            return res.status(404).json({})
        }
        try {
            await building.update(req.body)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
        return res.json(building.getAttributes())

    })

    router.delete('/:id([0-9]+)', async (req, res) => {

        var building = new Building()

        try {
            await building.fetch({id:req.params.id})
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (building.getAttributes().id === undefined) {
            return res.status(404).json({})
        }

        try {
            await building.delete()
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        return res.send('deleted')

    })

    return router
}
