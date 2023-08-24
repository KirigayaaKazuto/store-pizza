import React from 'react'
import styles from './Pagination.module.scss'
import ReactPaginate from 'react-paginate'
export const Pagination = ({setPageCount}) => {
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
  />
  )
}
