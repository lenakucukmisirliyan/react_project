export const getPaginationItems = (currentPage, totalPages) => {
    const pages = [];
    const maxPage = Math.min(totalPages, 1000); // API erişim izni bu kadar

    if (maxPage <= 7) { // Sayfa sayısı 7'den küçükse hepsini göster
        for (let i = 1; i <= maxPage; i++) {
            pages.push(i);
        }
    } else {
        pages.push(1);  // İlk sayfayı her zaman göster

        if (currentPage > 4) {  // 5. sayfadan itibaren araya ... koy
            pages.push("...");
        }

        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            if (i > 1 && i < maxPage) { // 1'den büyük son sayfa sayısından küçükse sayfayı aç
                pages.push(i);
            }
        }

        if (currentPage < maxPage - 3) {  // Son sayfaya 3'ten daha uzaksa ... koy
            pages.push("...");
        }

        pages.push(maxPage);  // Son sayfayı her zaman göster
    }

    return pages;
};