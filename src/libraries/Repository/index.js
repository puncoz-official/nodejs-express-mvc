import { isArray }     from "../../helpers/core.helper"
import Pagination      from "./helpers/Pagination"
import RepositoryMixin from "./RepositoryMixin"
import BaseTransformer from "./transformer"

@RepositoryMixin
export default class BaseRepository {
    constructor() {
        this._init()
    }

    _init() {
        if (this.model === undefined) {
            throw new TypeError("Repository should have 'model' method defined.")
        }

        this.model = this.model()
        this.transformer = null
        this.transformerSkipped = false
    }

    setTransformer(transformer) {
        this.transformer = transformer

        return this
    }

    skipTransformer(skip = true) {
        this.transformerSkipped = skip
    }

    parserResult(data) {
        if (this.transformerSkipped || !(this.transformer instanceof BaseTransformer)) {
            return data instanceof Pagination ? data.get() : data
        }

        if (data instanceof Pagination) {
            const paginatedResults = data.get()
            const results = paginatedResults.data.map(datum => this.transformer.transform(datum))
            return { paginatedData: results, meta: { pagination: paginatedResults.pagination } }
        }

        return isArray(data) ? data.map(datum => this.transformer.transform(datum)) : this.transformer.transform(data)
    }
}
