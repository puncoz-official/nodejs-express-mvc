import { ModelNotFoundException } from "./exceptions"
import Pagination                 from "./helpers/Pagination"

export default base => class extends base {
    async create(data) {
        const result = await this.model.query().insert(data)

        return this.parserResult(result)
    }

    async update(data, id) {
        await this.find(id)

        const result = await this.model.query().patchAndFetchById(id, data)

        return this.parserResult(result)
    }

    async delete(id) {
        await this.find(id)
        //
        // const result = await this.model.query().patchAndFetchById(id, data)
        //
        // return this.parserResult(result)
        return await this.model.query().deleteById(id)
    }

    async find(id) {
        const result = await this.model.query().findById(id)

        if (!result) {
            throw new ModelNotFoundException(null, id)
        }

        return this.parserResult(result)
    }

    async findByColumn(column, value) {
        const result = await this.model.query().where(column, value)

        if (result.length === 0) {
            throw new ModelNotFoundException(null, value, column)
        }

        return this.parserResult(result[0])
    }

    async all() {
        const results = await this.model.query()

        return this.parserResult(results)
    }

    async paginate(perPage = 10, page = 1) {
        const results = await this.model.query().page(page - 1, perPage)

        return this.parserResult(new Pagination(results, perPage, page))
    }
}
