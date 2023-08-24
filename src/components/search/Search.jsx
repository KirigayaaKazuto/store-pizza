import React, { useCallback, useContext, useRef, useState } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import {GrClose} from 'react-icons/gr'

import styles from './Search.module.scss'
import { Context } from '../Context'
import { debounce } from 'lodash'




export const Search = () => {
  const {setSearchValue} = useContext(Context)
  const inputRef = useRef()
  const [value, setValue] = useState('')


  const onClickClear = () => {
    setValue('')
    setSearchValue('')
    inputRef.current.focus()
  }

  const updateSearchValue = useCallback(
      debounce((str) => {
        setSearchValue(str)
      }, 250), []
    )

  const onChangeInput = (e) => {
    setValue(e.target.value)
    updateSearchValue(e.target.value)
  }

  return (
    <label className={styles.root}>
      <AiOutlineSearch className={styles.searchIcon}/> 
      <input ref={inputRef} value={value} onChange={onChangeInput} className={styles.input} placeholder='Поиск пиццы...' />
      {value && (
        <GrClose onClick={onClickClear} className={styles.closeIcon} />
      )}
    </label>
  )
}
