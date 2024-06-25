import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Show from './pages/Show'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/fetch/:name' element={<Show/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
