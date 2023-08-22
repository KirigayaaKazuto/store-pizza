import React, { useContext } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import {GrClose} from 'react-icons/gr'

import styles from './Search.module.scss'
import { Context } from '../Context'

export const Search = () => {
  const {searchValue, setSearchValue} = useContext(Context)
  return (
    <label className={styles.root}>
      <AiOutlineSearch className={styles.searchIcon}/> 
      <input value={searchValue} onChange={e => setSearchValue(e.target.value)} className={styles.input} placeholder='Поиск пиццы...' />
      {searchValue && (
        <GrClose onClick={() => setSearchValue('')} className={styles.closeIcon} />
      )}
    </label>
  )
}
