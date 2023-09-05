import React, { useState, useEffect, useRef } from 'react';
import { Categories } from '../../components/categories/Categories';
import { Sort, sortList } from '../../components/sort/Sort';
import { PizzaItem } from '../../components/pizzaItem/PizzaItem';

import { Skeleton } from '../../components/Skeleton';
import { Pagination } from '../../components/pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setCategory, setCurrentPage, setFilters } from '../../redux/slice/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router';
import { fetchPizzas, selectPizzaData } from '../../redux/slice/pizzasSlice';
import { Link } from 'react-router-dom';

export const Home = () => {
  const { category, sort, currentPage } = useSelector(selectFilter);
  const {items , status} = useSelector(selectPizzaData)
  const dispath = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const {search} = useSelector(selectFilter)
  const navigate = useNavigate();

  const skeletons = [...new Array(8)].map((_, i) => <Skeleton key={i} />);

  const onChangeCategory = (id) => {
    dispath(setCategory(id));
  };

  const onChangePage = (num) => {
    dispath(setCurrentPage(num));
  };

  const fetchPizzasItem = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const categoryId = category > 0 ? `category=${category}` : '';
    dispath(fetchPizzas({
      sortBy, order, categoryId,currentPage
    }))
  };

  // если категория = 0, то в параметры url ниче не добавляем
  useEffect(() => {
    if(category === 0) navigate('')
  }, [category, sort.sortProperty, currentPage])

  // если при первой загрузке isMounted = false, то мы не добавляем параметры в адресную строку
  useEffect(() => {
    if (isMounted.current) {
      
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        category,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [category, sort.sortProperty, currentPage]);

  // если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispath(
        setFilters({
          ...params,
          sort,
          category
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // если был первый рендер, то вызываем наши пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
      if (!isSearch.current) {
        fetchPizzasItem();
      }
      isSearch.current = false;
  }, [category, sort.sortProperty, currentPage]);

  return (
    <div className='content'>
      <div className='container'>
        <div className='content__top'>
          <Categories category={category} setCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className='content__title'>Все пиццы</h2>
        {
           status === 'error'
           ? (
             <h2 className='content-error'>Извините, произошла ошибка</h2>
           )
           : (
            <div className='content__items'>
          
              {status === 'loading'
            ? skeletons
            : items
                .filter((obj) => obj.title.toLowerCase().includes(search.toLowerCase()))
                .map((obj) => (
                  <Link key={obj.id} to={`pizza/${obj.id}`}>
                    <PizzaItem
                      id={obj.id}
                      image={obj.imageUrl}
                      title={obj.title}
                      price={obj.price}
                      sizes={obj.sizes}
                      types={obj.types}
                    />
                  </Link>
                ))}
            
          
        </div>
           )
        }
        
        <Pagination setPageCount={onChangePage} />
      </div>
    </div>
  );
};
