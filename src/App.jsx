import './styles/App.css'
import NavBar from './components/NavBar'
import BodyOutlet from './components/BodyOutlet'
import { Outlet } from 'react-router-dom'
function App() {


  return (
    <div>
      <NavBar></NavBar>
      <BodyOutlet></BodyOutlet>
    </div>
  )
}

export default App
