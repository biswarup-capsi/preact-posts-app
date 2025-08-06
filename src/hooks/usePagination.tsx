import { useState } from "preact/hooks";
import type { Comment } from "../types/commentType";

export function usePagination({ items }: { items: Comment[] }, { pageLimit }: { pageLimit: number }) { 
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(items.length / pageLimit);

    const changePage = (page:number) => {
        setCurrentPage(page);
    }

    const pageData = () => {
        const startIndex = currentPage * pageLimit;
        const endIndex=startIndex+ pageLimit;
        return items.slice(startIndex, endIndex);
    }

    const nextPage = () => {
        setCurrentPage(Math.min(currentPage + 1, totalPages - 1));
    }

    const prevPage = () => {
        setCurrentPage(Math.max(currentPage - 1, 0));
    }

    return {currentPage, totalPages, changePage, pageData, nextPage, prevPage};
}