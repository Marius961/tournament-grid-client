export default {

    generatePagination(pageData, query, url) {
        let pages = [];
        let currentPage = pageData.number;
        let max = pageData.totalPages;
        const start = currentPage - 3 > 0 ? currentPage - 3 : 0;
        const end = currentPage + 3 < max ? currentPage + 3 : max;


        if (start > 0) {
            pages.push(this.generatePaginationObject(0, 'На 1', false, {...query}, url));
        }

        for (let i = start; i< end; i++) {
            pages.push(this.generatePaginationObject(+i, +i+1, +i === currentPage, {...query}, url));
        }

        if (end !== max) {
            pages.push(this.generatePaginationObject(max-1, 'на ' +  +max, false, {...query}, url));
        }
        return pages;
    },
    generatePaginationObject(pageNumber, name, isCurrent, query, url) {
        query.p = pageNumber;
        return {
            url,
            name: name,
            isCurrent: isCurrent,
            query: query
        }
    }
}
