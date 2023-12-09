import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import style from "./Pagination.module.css";
import usePageStore from "@/app/store/pageStore";

interface Props {
  totalPages: number;
}

function Pagination({ totalPages }: Props) {
  const { page, setPage } = usePageStore();

  const setPageNumber = (selectedPage: number) => {
    setPage(selectedPage);
  };

  const setPreviousPage = (pageNumber: number) => {
    if (pageNumber > 1) {
      setPage(pageNumber - 1);
    }
  };

  const setNextPage = (pageNumber: number) => {
    if (pageNumber < totalPages) {
      setPage(pageNumber + 1);
    }
  };

  return (
    <div className={style.paginationList}>
      <div
        className={page === 1 ? style.disable : ""}
        onClick={() => setPreviousPage(page)}
      >
        <FaChevronLeft className={style.pervious} />
      </div>
      <div>
        {totalPages < 8 ? (
          <div className="flex">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <div
                  key={number}
                  className={`${style.pageNumber} ${
                    page === number ? style.active : ""
                  }`}
                  onClick={() => setPageNumber(number)}
                >
                  {number}
                </div>
              )
            )}
          </div>
        ) : (
          <div>
            {page <= 3 && (
              <div className="flex">
                <div
                  className={`${style.pageNumber} ${
                    page === 1 ? style.active : ""
                  }`}
                  onClick={() => setPageNumber(1)}
                >
                  1
                </div>
                <div
                  className={`${style.pageNumber} ${
                    page === 2 ? style.active : ""
                  }`}
                  onClick={() => setPageNumber(2)}
                >
                  2
                </div>
                <div
                  className={`${style.pageNumber} ${
                    page === 3 ? style.active : ""
                  }`}
                  onClick={() => setPageNumber(3)}
                >
                  3
                </div>
                <div
                  className={`${style.pageNumber} ${
                    page === 4 ? style.active : ""
                  }`}
                  onClick={() => setPageNumber(4)}
                >
                  4
                </div>
                <div className={style.numberSeparator}>...</div>
                <div
                  className={`${style.pageNumber} ${
                    page === totalPages ? style.active : ""
                  }`}
                  onClick={() => setPageNumber(totalPages)}
                >
                  {totalPages}
                </div>
              </div>
            )}
            {page > 3 && page <= totalPages - 3 && (
              <div className="flex">
                <div
                  className={`${style.pageNumber} ${
                    page === 1 ? style.active : ""
                  }`}
                  onClick={() => setPageNumber(1)}
                >
                  1
                </div>
                <div className={style.numberSeparator}>...</div>
                <div
                  className={`${style.pageNumber} ${
                    page === page - 1 ? style.active : ""
                  }`}
                  onClick={() => setPageNumber(page - 1)}
                >
                  {page - 1}
                </div>
                <div className={`${style.pageNumber} ${style.active}`}>
                  {page}
                </div>
                <div
                  className={`${style.pageNumber} ${
                    page === page + 1 ? style.active : ""
                  }`}
                  onClick={() => setPageNumber(page + 1)}
                >
                  {page + 1}
                </div>
                <div className={style.numberSeparator}>...</div>
                <div
                  className={`${style.pageNumber} ${
                    page === totalPages ? style.active : ""
                  }`}
                  onClick={() => setPageNumber(totalPages)}
                >
                  {totalPages}
                </div>
              </div>
            )}
            {page > totalPages - 3 && (
              <div className="flex">
                <div
                  className={`${style.pageNumber} ${
                    page === 1 ? style.active : ""
                  }`}
                  onClick={() => setPageNumber(1)}
                >
                  1
                </div>
                <div className={style.numberSeparator}>...</div>
                <div
                  className={`${style.pageNumber} ${
                    page === totalPages - 3 ? style.active : ""
                  }`}
                  onClick={() => setPageNumber(totalPages - 3)}
                >
                  {totalPages - 3}
                </div>
                <div
                  className={`${style.pageNumber} ${
                    page === totalPages - 2 ? style.active : ""
                  }`}
                  onClick={() => setPageNumber(totalPages - 2)}
                >
                  {totalPages - 2}
                </div>
                <div
                  className={`${style.pageNumber} ${
                    page === totalPages - 1 ? style.active : ""
                  }`}
                  onClick={() => setPageNumber(totalPages - 1)}
                >
                  {totalPages - 1}
                </div>
                <div
                  className={`${style.pageNumber} ${
                    page === totalPages ? style.active : ""
                  }`}
                  onClick={() => setPageNumber(totalPages)}
                >
                  {totalPages}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div
        className={page === totalPages ? style.disable : ""}
        onClick={() => setNextPage(page)}
      >
        <FaChevronRight className={style.next} />
      </div>
    </div>
  );
}

export default Pagination;
