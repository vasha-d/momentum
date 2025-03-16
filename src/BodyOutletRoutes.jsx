import SingleTaskPage from './components/SingleTaskPage/SingleTaskPage.jsx'
import DisplayAllTasksPage from './components/DisplayAllTasksPage/DisplayAllTasksPage.jsx'
import CreateTaskPage from "./components/CreateTaskPage/CreateTaskPage.jsx";
import CreateWorkerPage from "./components/CreateWorkerPage/CreateWorkerPage.jsx";

const BodyOutletRoutes = [
    {
      index: true,
      element: <DisplayAllTasksPage></DisplayAllTasksPage>,
    },
    {
      path: '/tasks/:taskID',
      element: <SingleTaskPage></SingleTaskPage>
    },
    {
      path: '/create-task',
      element: <CreateTaskPage></CreateTaskPage>
    },
    {
        path: '/create-worker',
        element: <CreateWorkerPage></CreateWorkerPage>
    }
  ]



export default BodyOutletRoutes