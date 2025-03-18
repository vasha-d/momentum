import { useParams } from "react-router-dom"
import { useGetTaskByID } from "../../api/getHooks"
import PrioritySigns from "../DisplayAllTasksPage/PrioritySigns"
import styles from '../../styles/SingleTaskPage/SingleTaskPage.module.css'
import { useState } from "react"
import { putTaskStatus } from "../../api/post"
function handleChange(e, setTaskStatus, taskID) {
    console.log(e.target.value)
    let newValue = e.target.value
    setTaskStatus(newValue)
    putTaskStatus(newValue, taskID)
}

export default function SingleTaskPage () {

    const taskID = useParams().taskID
    const {task, loading} = useGetTaskByID(taskID)
    const [taskStatus, setTaskStatus] = useState(undefined)
    if (loading) {return <>Loading...</>}

    let {priority, name, description, due_date, employee, status} = task

    return (
        <div className={styles.taskWrapper}>
            <PrioritySigns priority={priority}></PrioritySigns>
            <h3 className={styles.name}>{name}</h3>
            <div className={styles.description}>{description}</div>



            <div className={styles.detailsWrapper}>
                <div className={styles.status}>
                     <select name="status" id="status" value={taskStatus || status.id} onChange={(e) => {handleChange(e, setTaskStatus, taskID)}}>
                        <option value="1" >დასაწყები</option>
                        <option value="2">პროგრესში</option>
                        <option value="3">მზად ტესტირებისთვის</option>
                        <option value="4">დასრულებული</option>
                    </select>

                </div>
                <div className={styles.employee}>{employee.name + ` ` + employee.surname}</div>
                <div className={styles.deadline}>{due_date}</div>
            </div>
        </div>
    )

}

