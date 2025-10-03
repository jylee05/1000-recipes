import React, { useMemo } from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxPagesToShow = 5;
    const half = Math.floor(maxPagesToShow / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage - half < 1) {
      end = Math.min(totalPages, maxPagesToShow);
    }
    if (currentPage + half > totalPages) {
      start = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <nav className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="page-btn"
      >
        이전
      </button>
      {pageNumbers[0] > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="page-btn">
            1
          </button>
          {pageNumbers[0] > 2 && <span className="page-ellipsis">...</span>}
        </>
      )}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`page-btn ${currentPage === number ? "active" : ""}`}
        >
          {number}
        </button>
      ))}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="page-ellipsis">...</span>
          )}
          <button onClick={() => onPageChange(totalPages)} className="page-btn">
            {totalPages}
          </button>
        </>
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="page-btn"
      >
        다음
      </button>
    </nav>
  );
};

export default Pagination;
