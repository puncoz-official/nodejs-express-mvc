export default class Pagination {
    constructor(data, perPage, page) {
        this.data = data
        this.perPage = perPage
        this.page = parseInt(page)

        this.setup()
    }

    setup() {
        const totalPages = Math.ceil(this.data.total / this.perPage)

        this.pagination = {
            total: this.data.total,
            count: this.data.results.length,
            per_page: this.perPage,
            current_page: this.page,
            total_pages: totalPages,
        }
    }

    get() {
        return {
            data: this.data.results,
            pagination: this.pagination,
        }
    }
}
