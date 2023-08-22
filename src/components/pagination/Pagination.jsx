import React from 'react'
import styles from './Pagination.module.scss'
import ReactPaginate from 'react-paginate'
export const Pagination = ({onClickPage}) => {
  return (
    <ReactPaginate
    className={styles.paginate}
    breakLabel="..."
    nextLabel=">"
    onPageChange={e => onClickPage(e.selected + 1)}
    pageRangeDisplayed={5}
    pageCount={3}
    previousLabel="<"
    renderOnZeroPageCount={null}
  />
  )
}
