'use strict'
var UserDB = require('../models').user,
    SingleModel = require('./SingleModel'),
    bcrypt = require('bcrypt'),
    _ = require('underscore'),
    Session = require('./UserSession'),
    Course = require('./Course')

module.exports = class Building extends SingleModel {

    constructor(modelObject, id = null) {
        super()
    }

    create(modelObject = {}) {
        return new Promise( async (res, rej) => {
            if (!this.checkRequiredFields(modelObject)) {
                return res(false)
            }

            if (modelObject.password) {
                try {
                    modelObject.password = await this.hashPassword(modelObject.password)
                } catch (error) {
                    console.log(error)
                }
            }

            var result = await super.createModel(this, UserDB, modelObject)

            return res(this.getAttributes(UserDB.getAttributes()))
        })
    }

    checkRequiredFields(modelObject) {
        if (!modelObject.username || !modelObject.password) {
            return false
        } else {
            return true
        }
    }

    hashPassword(password) {
        return new Promise( async (res, rej) => {
            password = await bcrypt.hash(password, 12)
            console.log(password)
            return res(password)
        })
    }

    fetch(filter) {
        return new Promise( async (res, rej) => {
            if (filter === null ) {
                return res(false)
            }
            await super.getFromDB(this, UserDB, filter)
            return res(this.getAttributes(UserDB.getAttributes()))
        })
    }

    getAttribute(attribute) {
        return this[`_${attribute}`]
    }

    getAttributes(arrayOfAtts = null) {
        var values = {}
        if (arrayOfAtts === null) {
            arrayOfAtts = UserDB.getAttributes()
        }
        arrayOfAtts.forEach(attribute => {
            values[attribute] = this[`_${attribute}`]
        })
        return values
    }

    delete() {
        return new Promise( async (res, rej) => {
            if (this._id === null) {
                return res(false)
            }
            return res( await super.destroyModel(this, UserDB, this._id))
        })
    }

    update(newValsObj = null) {
        return new Promise( async (res, rej) => {
            if (newValsObj.password !== this._password && newValsObj.password !== null && newValsObj.password !== "") {
                try {
                    newValsObj.password = await this.hashPassword(newValsObj.password)
                } catch (error) {
                    console.log(error)
                }
            }
            return res( await super.updateModel(this, UserDB, newValsObj))
        })
    }

    signIn(username, password) {
        return new Promise( async (res, rej) => {
            await this.fetch({username: username.trim().toLowerCase()})
            if (this._id == null) {
                return res(false)
            }
            if (await this._comparePasswords(password)) {
                return res(await this._makeSession())
            } else {
                return res(false)
            }
        })
    }

    _makeSession() {
        return new Promise(async (res, rej) => {
            var session = new Session()
            var returnedSession = await session.create({isValid:true, user_id: this._id})
            res({token: returnedSession.token, role:this._role, id:this._id})
        })
    }

    _comparePasswords(password) {
        return new Promise(async (res, rej) => {
            console.log(password)
            console.log(this._password)
            return res(await bcrypt.compare(password, this._password))
        })
    }

    getCourses() {
        return new Promise( async (res, rej) => {
            var courses = await UserDB.where({id:this._id}).fetch()
            courses = await courses.courses()
            return res(courses)
        })
    }

    addCourse(courseID) {
        return new Promise( async (res, rej) => {
            var course = new Course()
            await course.fetch({id:courseID})

            await course.attachUser(this._rawModel)

            return res(true)
        })
    }
    
}
