'use strict'
var UserDB = require('../models').user,
    SingleModel = require('./SingleModel'),
    bcrypt = require('bcrypt'),
    _ = require('underscore')

module.exports = class Building extends SingleModel {

    constructor(modelObject, id = null) {
        super()
    }

    create(modelObject = {}) {
        return new Promise( async (res, rej) => {
            if (!checkRequiredFields) {
                return res(false)
            }
            modelObject.password = await this.hashPassword(modelObject.password)
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
            password = await bcrypt.hash(userBody.password, 12)
            return res(password)
        })
    }

    fetch(filter) {
        return new Promise( async (res, rej) => {
            if (id === null ) {
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
            return res( await super.updateModel(this, UserDB, newValsObj))
        })
    }
    
}
