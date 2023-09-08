import React, { useCallback, useRef, useState } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import {GrClose} from 'react-icons/gr'

import styles from './Search.module.scss'
import debounce from 'lodash/debounce'
import { useDispatch } from 'react-redux'
import { setSearch } from '../../redux/slice/filterSlice'




export const Search: React.FC = () => {
  const dispath = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')


  const onClickClear = () => {
    setValue('')
    dispath(setSearch(''))
    inputRef.current?.focus()
  }

  const updateSearchValue = useCallback(
      debounce((str: string) => {
        console.log(str)
        dispath(setSearch(str)) 
      }, 250), []
    )

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
