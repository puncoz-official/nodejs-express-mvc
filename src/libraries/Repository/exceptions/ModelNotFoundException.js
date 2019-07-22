export default class ModelNotFoundException extends Error {
    constructor(modelName, id, idColumn = "id") {
        super()
        this.modelName = modelName
        this.id = id
        this.message = `No record found for ${this.modelName} with ${idColumn}: ${this.id}`
    }
}
