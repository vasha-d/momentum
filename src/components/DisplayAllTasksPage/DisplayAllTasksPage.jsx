
import { Link } from "react-router-dom"
import useGetAllTasks from "../../api/useGetAllTasks"
import { useState } from "react"
import TaskBox from "./TaskBox"
import styles from "../../styles/DisplayAllTasksPage/DisplayAllTasksPage.module.css"
import Filters from "./Filters/Filters"


function filterTasks (tasks, filters) {

    let filtered = tasks
    let deparmentFilters = ['', ...Object.values(filters.dep)]
    let priorityFilters = ['', ...Object.values(filters.prio)]
    let employeeFilter = filters.employee

    let isDepActive = !!deparmentFilters.find((f) => !!f == true)
    let isPrioActive = !!priorityFilters.find((f) => !!f == true)
    let isEmpActive = employeeFilter > 0


    if (isDepActive) {
        filtered = filtered.filter((task) => {
            let depId = task.department.id 
            let isIDinFilters = deparmentFilters[depId]
            return isIDinFilters
        })
    }   
    if (isPrioActive) {
        filtered = filtered.filter((task) => {
            let prioId = task.priority.id 
            let isIDinFilters = priorityFilters[prioId]
            return isIDinFilters
        })
    }   
    if (isEmpActive) {
        filtered = filtered.filter((task) => {
            let empId = task.employee.id
            let isIdEqual = empId == employeeFilter
            return isIdEqual
        })
    }
    

    return filtered
}


export default function AllTasksPage () {

    const {tasks, loading} = useGetAllTasks() 
    const [filters, setFilters] = useState({
        dep: {dep1: false, dep2: false, dep3: false, dep4: false, dep5: false, dep6: false, dep7: false},
        prio: {prio1: false, prio2: false, prio3: false},
        employee: 0
    })
    if (loading) {return <>Loading...</>}

    const filteredTasks = filterTasks(tasks, filters)

    return  (
        <>
            <Filters filters={filters} setFilters={setFilters}></Filters>
            <TaskBox tasks={filteredTasks}></TaskBox>
        </>
    )

}