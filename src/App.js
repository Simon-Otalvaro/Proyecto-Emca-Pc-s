import { Home } from "./components/Home/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Sesion } from "./components/Sesion/Sesion";
import { Register } from "./components/Register/Register";
import { From } from "./components/From/From";
import {Details} from "./components/Details/Details";
import { Main } from "./components/Main/Main";
import { View } from "./components/View/View";


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route index path='/' element={<Sesion/>}></Route>
      <Route path='/home-152628282828' element={<Home/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/from' element={<From/>}></Route>
      <Route path='/details/:id' element={<Details/>}></Route>
      <Route path='/main' element={<Main/>}></Route>
      <Route path='/view' element={<View/>}></Route>
    </Routes>

</BrowserRouter>
    </>

  );
}

export default App;
