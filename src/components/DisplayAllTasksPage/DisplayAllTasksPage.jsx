
import { Link } from "react-router-dom"
import useGetAllTasks from "../../api/useGetAllTasks"
import { useState } from "react"
import TaskBox from "./TaskBox"
import styles from "../../styles/DisplayAllTasksPage/DisplayAllTasksPage.module.css"
function filterTasks(tasks, filters) {

    //...

    return tasks
}

export default function AllTasksPage () {

    const {tasks, loading} = useGetAllTasks() 
    const {filters, setFilters} = useState(null)
    if (loading) {return <>Loading...</>}
    console.log(styles)
    const filteredTasks = filterTasks(tasks, filters)
    return (
        <div>
            Task List...
            <Link to="/tasks/1">Go task 1</Link>
            <TaskBox tasks={filteredTasks}></TaskBox>
        </div>
    )
}