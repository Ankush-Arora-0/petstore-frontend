import './App.css';
import {Routes,Route} from 'react-router-dom';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import  Login  from './components/Login';
import Register  from './components/Register';
import { Cart } from './components/Cart';
import { Order } from './components/Order';
import { AddPet} from './components/AddPet.jsx';
import { About } from './components/About';
import {store} from './redux/index.js'
import {Provider} from 'react-redux';
import { Account } from './components/Account.jsx';
import { Details } from './components/Details.jsx';
import { MyPets } from './components/MyPets.jsx';
function App() {
  return (
    <div className="App">
    <Provider store={store}>
    <Navbar></Navbar>
     <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>
      <Route path='/cart' element={<Cart></Cart>}></Route>
      <Route path='/orders' element={<Order></Order>}></Route>
      <Route path='/addpet' element={<AddPet></AddPet>}></Route>
      <Route path='/about' element={<About></About>}></Route>
      <Route path='/account' element={<Account></Account>}></Route>
      <Route path='/details' element={<Details></Details>}></Route>
      <Route path='/mypets' element={<MyPets></MyPets>}></Route>
     </Routes>
     </Provider>
    </div>
  );
}

export default App;
