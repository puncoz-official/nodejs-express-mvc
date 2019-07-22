export default base => class extends base {
    fullName() {
        if (!this.full_name) {
            return ""
        }
        
        const fullName = []

        if (this.full_name.hasOwnProperty("first_name")) {
            fullName.push(this.full_name.first_name)
        }

        if (this.full_name.hasOwnProperty("last_name")) {
            fullName.push(this.full_name.last_name)
        }

        return fullName.join(" ")
    }
}
