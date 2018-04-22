'use strict'
var _ = require('underscore')


module.exports = class SingleModel {

    constructor() {

    }

    getFromDB(context, theModel, filter) {
        return new Promise( async (res, rej) => {
            try {
                var model = await theModel.where(filter).fetch()
            } catch (error) {
                console.error(error)
                return res(false)
            }
             return res(this._updateLocalVars(context, theModel, model))
        })
    
    }

    _updateLocalVars(context, theModel, vals) {
        if (vals === null) {
            theModel.getAttributes().forEach(attribute => {
                context[`_${attribute}`] = null
            })
        } else {
            vals = vals.toJSON()
            theModel.getAttributes().forEach(attribute => {
                context[`_${attribute}`] = vals[attribute]
            })
        }
        return true
    }

    trimmer(anObject) {
        for (let key in anObject) {
            if (typeof myVar === 'string' || anObject[key] instanceof String) {
                anObject[key] = anObject[key].trim()
            }
        }
        return anObject
    }

    createModel(context, theModel, vals) {
        return new Promise(async (res, rej) => {
            var modelVals = _.pick(vals, theModel.getAttributes())

            modelVals = this.trimmer(modelVals)

            try {
                var model = await theModel.forge(modelVals).save()
            } catch (error) {
                console.error(error)
                return res(false)
            }
            return res(this._updateLocalVars(context, theModel, model))
        })
    }

    destroyModel(context, theModel, id) {
        return new Promise( async (res, rej) => {
            try {
                var model = await theModel.where({id: id}).fetch()
            } catch (error) {
                console.error(error)
                return res(false)
            }
    
            try {
                await model.destroy()
            } catch (error) {
                console.error(error)
                return res(false)
            }

            return res(true)
        })
    }

    updateModel(context, theModel, vals) {
        return new Promise( async (res, rej) => {
            try {
                var model = await theModel.where({id: context._id})
            } catch (error) {
                console.error(error)
                return res(false)
            }
            var modelVals = _.pick(vals, theModel.getAttributes())

            modelVals = this.trimmer(modelVals)

            modelVals = _.omit(modelVals, 'id')
            if (!modelVals) {
                return res(false)
            }
            try {
                model = await model.save(modelVals, { method: 'update' })
            } catch (error) {
                console.error(error)
                return res(false)
            }
            return res(this._updateLocalVars(context, theModel, model) )
        })
    }
}
