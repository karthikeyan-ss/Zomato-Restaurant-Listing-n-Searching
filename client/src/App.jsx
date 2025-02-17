import { Routes, Route } from 'react-router-dom';
import RestaurantsList from './pages/RestaurantsList';
import RestaurantDetails from './pages/RestaurantDetails';

function App() {
  return (
    <Routes>
      <Route path='/' element={<RestaurantsList/>}/>
      <Route path='/restaurants/:id' element={<RestaurantDetails/>}/>
    </Routes>
  );
}

export default App;