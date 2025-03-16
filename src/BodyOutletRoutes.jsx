import SingleTaskPage from './components/SingleTaskPage/SingleTaskPage.jsx'
import AllTasksPage from './components/DisplayAllTasksPage/AllTasksPage.jsx'
import CreateTaskPage from "./components/CreateTaskPage/CreateTaskPage.jsx";
import CreateWorkerPage from "./components/CreateWorkerPage/CreateWorkerPage.jsx";

const BodyOutletRoutes = [
    {
      index: true,
       element: <AllTasksPage></AllTasksPage>
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