import faker        from "faker"
import Knex         from "knex"
import { Model }    from "objection"
import { DBConfig } from "../../config"
import { range }    from "../../helpers/core.helper"

export default class FakerFactory {
    /**
     * @param {BaseModel} model
     * @param {function} callback
     * @return {FakerFactory}
     */
    constructor(model, callback) {
        this.initDatabase()

        this.model = model
        this.callback = callback
        this.number = 1
    }

    initDatabase() {
        const knex = Knex(DBConfig)
        Model.knex(knex)
    }

    /**
     *
     * @param attributes
     * @return {object|Array}
     */
    async create(attributes = {}) {
        let data = this.make(attributes)

        return await this.model.query().insert(data)
    }

    /**
     * @param {object} attributes
     * @return {Array|object}
     */
    make(attributes = {}) {
        if (this.number === 1) {
            return this.prepareData(attributes)
        }

        const data = []
        for (let i of range(0, this.number)) {
            data.push(this.prepareData(attributes))
        }

        return data
    }

    /**
     * @param {object} attributes
     * @return {object}
     */
    prepareData(attributes) {
        return { ...this.callback(faker), ...attributes }
    }
}
