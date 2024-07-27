

// [1,2,3,...,7]
// [1,2,3,...,21,22,23]
 export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {

    // If pages total are less then 7 show all 
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1 );
    };
    
    // If current page is within first 3 pages, show first 3 then '...' then last 2 pages 
    if (currentPage <= 3) {
        return [1,2,3,'...', totalPages - 1, totalPages];
    };

    // If current page is within last 3 pages, show first 2 then '...' then last 3 pages
    if (currentPage >= totalPages - 2) {
        return [1,2,'...', totalPages -2, totalPages - 1, totalPages];
    };

    // If current page is anywhere between middle, show page 1, '...', current and surrounded pages 
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
}