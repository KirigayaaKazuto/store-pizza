import React, { useState, useEffect, useContext } from 'react';
import { Categories } from '../../components/categories/Categories';
import { Sort } from '../../components/sort/Sort';
import { PizzaItem } from '../../components/pizza-item/PizzaItem';

import { Skeleton } from '../../components/Skeleton';
import axios from 'axios';
import { Context } from '../../components/Context';
import { Pagination } from '../../components/pagination/Pagination';

export const Home = () => {
  const {searchValue} = useContext(Context)
  const [pizza, setPizza] = useState([]);
  const [pizzaSelected, setPizzaSelected] = useState('-rating');
  const [pizzaCategory, setPizzaCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1)
  
  const skeletons = [...new Array(8)].map((_, i) => <Skeleton key={i} />)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const order = pizzaSelected.includes('-') ? "asc" : 'desc'
        setIsLoading(true);
        const [pizza] = await Promise.all([
          axios.get(
            `https://64d663f02a017531bc12965c.mockapi.io/kfdl?page=${page}&limit=4&${
              pizzaCategory > 0 ? `category=${pizzaCategory}` : ''
            }&sortBy=${pizzaSelected.replace('-', '')}&order=${order}`,
          ),
        ]);

        setIsLoading(false);

        setPizza(pizza.data);
      } catch (error) {
        console.warn(error);
        alert('Произошла ошибка при получение данных');
      }
    };
    window.scrollTo(0, 0);
    fetchData();
  }, [pizzaCategory, pizzaSelected, page]);
  return (
    <div className='content'>
      <div className='container'>
        <div className='content__top'>
          <Categories category={pizzaCategory} setCategory={setPizzaCategory} />
          <Sort setSelected={setPizzaSelected} />
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
        <Pagination onClickPage={num => setPage(num)}/>
      </div>
    </div>
  );
};
