import './styles/App.css'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom'
function App() {


  return (
    <>
    <NavBar></NavBar>
    <Outlet></Outlet>
    
    </>
  )
}

export default App
