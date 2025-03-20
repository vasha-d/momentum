import './styles/App.css'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom'
import CreateWorkerPage from './components/CreateWorkerPage/CreateWorkerPage'
import { createContext, useState } from 'react'
const CreateWorkerContext = createContext()

function App() {

  const [creatingWorker, setCreatingWorker] = useState(false)
  return (
    <CreateWorkerContext.Provider value={{creatingWorker, setCreatingWorker}}>
    <NavBar setCreatingWorker={setCreatingWorker}></NavBar>
    <Outlet></Outlet>
    <CreateWorkerPage 
    
      creatingWorker={creatingWorker}
      setCreatingWorker={setCreatingWorker}
    
    
    ></CreateWorkerPage>
    </CreateWorkerContext.Provider>
  )
}

export default App
export {CreateWorkerContext}