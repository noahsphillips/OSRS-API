'use strict'
var _ = require('underscore'),
    models = require('../models')

module.exports = class Models {

    constructor(dbModelName) {
        this._dbModel = models[dbModelName]
    }

    setModel(dbModelName) {
        this._dbModel = models[dbModelName]
    }

    getAll(filter = {}, includes = []) {
        return new Promise(async (res, rej) => {
            try {
                var models = await this._dbModel.where(filter).fetchAll({
                    withRelated: includes
                })
            } catch (error) {
                console.error(error)
                return false
            }
            res(models)
        })
    }

    getOne(filter = {}) {
        return new Promise(async (res, rej) => {
            try {
                var model = await this._dbModel.where(filter).fetch()
            } catch (error) {
                console.error(error)
                return false
            }
            res(model)
        })
    }
}
