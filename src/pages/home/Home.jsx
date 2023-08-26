import React, { useState, useEffect, useContext, useRef } from 'react';
import { Categories } from '../../components/categories/Categories';
import { Sort, sortList } from '../../components/sort/Sort';
import { PizzaItem } from '../../components/pizza-item/PizzaItem';

import { Skeleton } from '../../components/Skeleton';
import axios from 'axios';
import { Context } from '../../components/Context';
import { Pagination } from '../../components/pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setCurrentPage, setFilters } from '../../redux/slice/filterSlice';
import qs from 'qs'
import { useNavigate } from 'react-router';

export const Home = () => {
  const {category, sort, currentPage} = useSelector(state => state.filter)
  const dispath = useDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const {searchValue} = useContext(Context)
  const [pizza, setPizza] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()
  
  const skeletons = [...new Array(8)].map((_, i) => <Skeleton key={i} />)

  const onChangeCategory = (id) => {
    dispath(setCategory(id))
  }

  const onChangePage = (num) => {
    dispath(setCurrentPage(num))
  }

  const fetchPizzas = async() => {
    setIsLoading(true)
    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? "asc" : 'desc'
    const categoryId = category > 0 ? `category=${category}` : ''
 
    const pizza = await axios.get(`https://64d663f02a017531bc12965c.mockapi.io/kfdl?page=${currentPage}&limit=4&${categoryId}&sortBy=${sortBy}&order=${order}`)

        setIsLoading(false);

        setPizza(pizza.data);
  }

  // если при первой загрузке isMounted = false, то мы не добавляем параметры в адресную строку
  useEffect(() => {
    if(isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        category,
        currentPage
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [category, sort.sortProperty, currentPage])

  // если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
  useEffect(() => {
    if(window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      
      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
      
      dispath(
        setFilters({
          ...params,
          sort
        })
      )
      isSearch.current = true
    }
  }, [])

// если был первый рендер, то вызываем наши пиццы  
  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      if(!isSearch.current) {
        fetchPizzas()
      }
      isSearch.current = false

    } catch (error) {
      console.warn(error);
      alert('Произошла ошибка при получение данных');
    }
  }, [category, sort.sortProperty, currentPage]);



  return (
    <div className='content'>
      <div className='container'>
        <div className='content__top'>
          <Categories category={category} setCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className='content__title'>Все пиццы</h2>
        <div className='content__items'>
          {isLoading
            ? skeletons
            : pizza.filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase())).map((obj) => (
                <PizzaItem
                  key={obj.id}
                  image={obj.imageUrl}
                  title={obj.title}
                  price={obj.price}
                  sizes={obj.sizes}
                  types={obj.types}
                />
              ))}
        </div>
        <Pagination setPageCount={onChangePage}/>
      </div>
    </div>
  );
};
