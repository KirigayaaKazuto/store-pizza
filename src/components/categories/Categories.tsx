export const categoriesName = [
  { id: 0, name: 'Все' },
  { id: 1, name: 'Мясные' },
  { id: 2, name: 'Вегетарианская' },
  { id: 3, name: 'Гриль' },
  { id: 4, name: 'Острые' },
  { id: 5, name: 'Закрытые' },
];

export type TCategories = {
  category: number;
  setCategory: (id: number) => void; 
}

export const Categories: React.FC<TCategories> = ({ category, setCategory }) => {

  const onClickCategory = (id: number) => {
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
