
import { Link } from "react-router-dom"
import useGetAllTasks from "../../api/useGetAllTasks"
import { useState } from "react"
import TaskBox from "./TaskBox"

function filterTasks(tasks, filters) {

    //...

    return tasks
}

export default function AllTasksPage () {

    const {tasks, loading} = useGetAllTasks() 
    const {filters, setFilters} = useState(null)
    console.log(tasks, loading)
    if (loading) {return <>Loading...</>}

    const filteredTasks = filterTasks(tasks, filters)
    return (
        <div>
            Task List...
            <Link to="/tasks/1">Go task 1</Link>
            <TaskBox tasks={filteredTasks}></TaskBox>
        </div>
    )
}