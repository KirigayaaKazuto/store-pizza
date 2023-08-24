import { Home } from './pages/home/Home';
import './scss/app.scss';
import { useSelector, useDispatch } from 'react-redux';
//git remote add origin https://github.com/KirigayaaKazuto/store-pizza.git
import { Context } from './components/Context';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { NotFound } from './pages/notFound/NotFound';
import { Basket } from './pages/basket/Basket';
import { useState } from 'react';
// json-server db.json -p 4200 --watch
function App() {
  const [searchValue, setSearchValue] = useState('')
  
  return (
    <Context.Provider value={{
      searchValue,
      setSearchValue
    }}>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='basket' element={<Basket />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Context.Provider>
  );
}

export default App;
