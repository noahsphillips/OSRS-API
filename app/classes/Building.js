'use strict'
var BuildingDB = require('../models').building,
SingleModel = require('./SingleModel'),
    _ = require('underscore')

module.exports = class Building extends SingleModel {

    constructor(modelObject, id = null) {
        super()
    }

    create(modelObject = {}) {
        return new Promise( async (res, rej) => {
            var result = await super.createModel(this, BuildingDB, modelObject)
            return res(this.getAttributes(BuildingDB.getAttributes()))
        })
    }

    fetch(filter) {
        return new Promise( async (res, rej) => {
            if (id === null ) {
                return res(false)
            }
            await super.getFromDB(this, BuildingDB, filter)
            return res(this.getAttributes(BuildingDB.getAttributes()))
        })
    }

    getAttribute(attribute) {
        return this[`_${attribute}`]
    }

    getAttributes(arrayOfAtts = null) {
        var values = {}
        if (arrayOfAtts === null) {
            arrayOfAtts = BuildingDB.getAttributes()
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
            return res( await super.destroyModel(this, BuildingDB, this._id))
        })
    }

    update(newValsObj = null) {
        return new Promise( async (res, rej) => {
            return res( await super.updateModel(this, BuildingDB, newValsObj))
        })
    }
    
}
