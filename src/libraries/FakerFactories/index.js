import FakerFactory from "./FakerFactory"

const registeredFaker = {}

/**
 * @param {string} label
 * @param {Number} number
 * @returns {FakerFactory}
 */
const factory = (label, number = 1) => {
    const faker = registeredFaker[label]

    if (!(faker instanceof FakerFactory)) {
        throw new Error(`Faker '${label}' not defined.`)
    }

    faker.number = number

    return faker
}

/**
 *
 * @param {string} label
 * @param {BaseModel} model
 * @param {function} callback
 */
factory.define = (label, model, callback) => {
    registeredFaker[label] = new FakerFactory(model, callback)
}

export default factory
