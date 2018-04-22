'use strict'
var DepartmentDB = require('../models').department,
SingleModel = require('./SingleModel'),
    _ = require('underscore')

module.exports = class Department extends SingleModel {

    constructor(modelObject, id = null) {
        super()
    }

    create(modelObject = {}) {
        return new Promise( async (res, rej) => {
            var result = await super.createModel(this, DepartmentDB, modelObject)
            return res(this.getAttributes(DepartmentDB.getAttributes()))
        })
    }

    fetch(filter) {
        return new Promise( async (res, rej) => {
            if (filter === null ) {
                return res(false)
            }
            await super.getFromDB(this, DepartmentDB, filter)
            return res(this.getAttributes(DepartmentDB.getAttributes()))
        })
    }

    getAttribute(attribute) {
        return this[`_${attribute}`]
    }

    getAttributes(arrayOfAtts = null) {
        var values = {}
        if (arrayOfAtts === null) {
            arrayOfAtts = DepartmentDB.getAttributes()
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
            return res( await super.destroyModel(this, DepartmentDB, this._id))
        })
    }

    update(newValsObj = null) {
        return new Promise( async (res, rej) => {
            return res( await super.updateModel(this, DepartmentDB, newValsObj))
        })
    }
    
}
