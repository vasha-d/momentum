import './styles/App.css'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom'
import CreateWorkerPage from './components/CreateWorkerPage/CreateWorkerPage'
import { useState } from 'react'
function App() {

  const [creatingWorker, setCreatingWorker] = useState(false)

  return (
    <>
    <NavBar setCreatingWorker={setCreatingWorker}></NavBar>
    <Outlet></Outlet>
    <CreateWorkerPage 
    
      creatingWorker={creatingWorker}
      setCreatingWorker={setCreatingWorker}
    
    
    ></CreateWorkerPage>
    </>
  )
}

export default App
