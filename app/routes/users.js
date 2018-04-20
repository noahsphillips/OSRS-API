let User = require('../classes/User'),
    Models = require('../classes/Models'),
    _ = require('underscore')

module.exports = (router) => {

    router.get('/', async (req, res) => {

        var users = new Models('user')
        try {
            users = await users.getAll()
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (!users) {
            return res.status(404).json({})
        }

        return res.json(users)

    })

    router.post('/', async (req, res) => {

        var user = new User()

        User.fetch({username: req.user.username.trim().toLowerCase()})

        user = await user.create(req.body)

        return res.json(user)

    })

    router.get('/:id([0-9]+)', async (req, res) => {

        var users = new Models('user')

        try {
            users = await users.getOne({id: req.params.id})
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (!users) {
            return res.status(404).json({})
        }

        return res.json(users)

    })

    router.patch('/:id([0-9]+)', async (req, res) => {

        var user = new User()

        try {
            await user.fetch(req.params.id)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (user.getAttributes().id === undefined) {
            return res.status(404).json({})
        }
        try {
            await user.update(req.body)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
        return res.json(user.getAttributes())

    })

    router.delete('/:id([0-9]+)', async (req, res) => {

        var user = new User()

        try {
            await user.fetch(req.params.id)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (user.getAttributes().id === undefined) {
            return res.status(404).json({})
        }

        try {
            await user.delete()
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        return res.send('deleted')

    })

    return router
}
