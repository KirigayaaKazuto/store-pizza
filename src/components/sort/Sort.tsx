import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setSort } from '../../redux/slice/filterSlice';
import { useRef } from 'react';
import { useEffect } from 'react';
import { TSort } from '../../@types/types';
export const sortList: TSort[] = [
    { id: 0, title: 'популярности(по возрастанию)', sortProperty: '-rating' },
    { id: 1, title: 'популярности(по убыванию)', sortProperty: 'rating' },
    { id: 2, title: 'цене(по возрастанию)', sortProperty: '-price' },
    { id: 3, title: 'цене(по убыванию)', sortProperty: 'price' },
    { id: 4, title: 'алфавиту(по возрастанию)', sortProperty: '-title' },
    { id: 5, title: 'алфавиту(по убыванию)', sortProperty: 'title' },
  ];

type TPopupClick = MouseEvent & {
  composedPath: Node[]
};

export const Sort: React.FC = () => {
  const sortRef = useRef<HTMLDivElement>(null)
  const [isOpened, setIsOpened] = useState(false);
  
  const dispath = useDispatch()
  const {sort} = useSelector(selectFilter)

  const onClickSortSelected = (obj: TSort) => {
    dispath(setSort(obj));
    setIsOpened(false)
  };

  useEffect (() => {
    const handleClickSort = (e: MouseEvent) => {
      const _e = e as TPopupClick
      if(sortRef.current && !_e.composedPath.includes(sortRef.current)) {
        setIsOpened(false)
      }
    }
    document.body.addEventListener('click', handleClickSort)

    return () => {
      document.body.removeEventListener('click', handleClickSort)
    }
  }, [])

  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label'>
        <svg
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpened(!isOpened)}>{sort.title}</span>
      </div>
      {isOpened && (
        <div className='sort__popup'>
          <ul>
            {sortList.map((obj) => (
              <li
                onClick={() => onClickSortSelected(obj)}
                key={obj.id}
                className={`${sort.sortProperty === obj.sortProperty && 'active'}`}
              >
                {obj.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
