export default class BaseTransformer {
    constructor() {
        if (this.transform === undefined) {
            throw new TypeError("Transformer should have 'transform' method defined.")
        }
    }
}
