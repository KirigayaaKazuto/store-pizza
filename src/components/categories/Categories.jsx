import React from 'react';
const categoriesName = [
  { id: 0, name: 'Все' },
  { id: 1, name: 'Мясные' },
  { id: 2, name: 'Вегетарианская' },
  { id: 3, name: 'Гриль' },
  { id: 4, name: 'Острые' },
  { id: 5, name: 'Закрытые' },
];
export const Categories = ({ category, setCategory }) => {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       //await axios.get();
  //     } catch (error) {
  //       console.warn(error);
  //       alert('Ошибка при получение категорий');
  //     }
  //   };
  // }, []);

  const onClickCategory = (id) => {
    setCategory(id);
  };

  return (
    <div className='categories'>
      <ul>
        {categoriesName.map((obj) => (
          <li
            onClick={() => onClickCategory(obj.id)}
            key={obj.id}
            className={`${category === obj.id ? 'active' : ''}`}
          >
            {obj.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
