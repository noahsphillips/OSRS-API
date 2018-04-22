'use strict'
var SessionDB = require('../models').session,
SingleModel = require('./SingleModel'),
    _ = require('underscore'),
    jwt = require('jsonwebtoken')

module.exports = class UserSession extends SingleModel {

    constructor(modelObject, id = null) {
        super()
    }

    create(modelObject = {}) {
        return new Promise( async (res, rej) => {
            var result = await super.createModel(this, SessionDB, modelObject)
            var token = jwt.sign({
                id: modelObject.user_id,
                session_id: this._id
            }, process.env.TOKEN_SECRET || 'devSecret')
            await super.updateModel(this, SessionDB, {token})
            return res(this.getAttributes(SessionDB.getAttributes()))
        })
    }

    fetch(filter) {
        return new Promise( async (res, rej) => {
            if (filter === null ) {
                return res(false)
            }
            await super.getFromDB(this, SessionDB, filter)
            return res(this.getAttributes(SessionDB.getAttributes()))
        })
    }

    getAttribute(attribute) {
        return this[`_${attribute}`]
    }

    getAttributes(arrayOfAtts = null) {
        var values = {}
        if (arrayOfAtts === null) {
            arrayOfAtts = SessionDB.getAttributes()
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
            return res( await super.destroyModel(this, SessionDB, this._id))
        })
    }

    update(newValsObj = null) {
        return new Promise( async (res, rej) => {
            return res( await super.updateModel(this, SessionDB, newValsObj))
        })
    }
    
}
