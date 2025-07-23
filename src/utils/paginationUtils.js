export const getPaginationItems = (currentPage, totalPages) => {
    const pages = [];
    const maxPage = Math.min(totalPages, 1000); // API erişim izni bu kadar

    if (maxPage <= 7) { // Sayfa sayısı 7'den küçükse hepsini göster
        for (let i = 1; i <= maxPage; i++) {
            pages.push(i);
        }
        return pages;
    }
    pages.push(1);  // İlk sayfayı her zaman göster

    if (currentPage > 4) pages.push("...");  // 5. sayfadan itibaren araya ... koy

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(maxPage - 1, currentPage + 1); i++) {
        pages.push(i);
    }
    if (currentPage < maxPage - 3) pages.push("...");  // Son sayfaya 3'ten daha uzaksa ... koy
    
    pages.push(maxPage)
    
    return pages;  // Son sayfayı her zaman göster
}; 