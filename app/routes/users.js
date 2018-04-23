let User = require('../classes/User'),
    Models = require('../classes/Models'),
    _ = require('underscore')

module.exports = (router) => {

    router.get('/', async (req, res) => {

        var users = new Models('user')
        try {
            users = await users.getAll(req.query)
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
        await user.fetch({username: req.body.username.trim().toLowerCase()})

        if (user.getAttribute('username')) {
            return res.status(400).json({message: "User exists already"})
        }

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
            await user.fetch({id:req.params.id})
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (user.getAttributes()['id'] === null) {
            return res.status(404).json({message: "User not found"})
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
            await user.fetch({id:req.params.id})
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        if (user.getAttributes()['id'] === null) {
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

    router.post('/signin', async (req, res) => {
        var user = new User()
        
        var data = await user.signIn(req.body.username.trim().toLowerCase(), req.body.password.trim())

        if (!data) {
            return res.status(401).json({message: "Wrong credentials"})
        }

        return res.json({data})

    })

    router.get('/:id([0-9]+)/courses', async (req, res) => {

        var user = new User()

        await user.fetch({id:req.params.id})

        var courses = user.getCourses()

        return res.json(courses)

    })

    router.post('/:id([0-9]+)/courses/:courseID([0-9]+)', async (req, res) => {

        var user = new User()

        await user.fetch({id:req.params.id})

        var courses = await user.addCourse({id:req.params.courseID})

        return res.json({message: "added", courses})

    })

    return router
}
