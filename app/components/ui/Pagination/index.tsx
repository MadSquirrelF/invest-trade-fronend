import React from 'react'
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage, totalPages }) => {
  return (
    <ReactPaginate className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={totalPages}
      pageCount={totalPages}
      forcePage={currentPage - 1}
    />
  )
}
export default Pagination;