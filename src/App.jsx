import './styles/App.css'
import NavBar from './components/NavBar'
import BodyOutlet from './components/BodyOutlet'
import { Outlet } from 'react-router-dom'
import useGetAllTasks from './api/useGetAllTasks'
import { useEffect } from 'react'
function App() {

  const allTasks = useGetAllTasks()

  return (
    <div>
      <NavBar></NavBar>
      <BodyOutlet></BodyOutlet>
    </div>
  )
}

export default App
