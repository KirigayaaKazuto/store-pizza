import React from 'react'
import styles from './Pagination.module.scss'
import ReactPaginate from 'react-paginate'

interface TPagination  {
  currentPage: number
  setPageCount: (page:number) => void
}

export const Pagination: React.FC<TPagination> = ({currentPage, setPageCount}) => {
  return (
    <ReactPaginate
    className={styles.paginate}
    breakLabel="..."
    nextLabel=">"
    onPageChange={e => setPageCount(e.selected + 1)}
    pageRangeDisplayed={5}
    pageCount={3}
    previousLabel="<"
    renderOnZeroPageCount={null}
    forcePage={currentPage  - 1}
  />
  )
}
