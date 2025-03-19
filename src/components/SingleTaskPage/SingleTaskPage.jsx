import { useParams } from "react-router-dom"
import { useGetTaskByID } from "../../api/getHooks"
import PrioritySigns from "../DisplayAllTasksPage/PrioritySigns"
import styles from '../../styles/SingleTaskPage/SingleTaskPage.module.css'
import { useState } from "react"
import { putTaskStatus } from "../../api/post"
import userIcon from '../../assets/user-icon.svg'
import calendarIcon from '../../assets/calendar-icon.svg'
import statusIcon from '../../assets/status-icon.svg'
import Comments from "./CommentsSection"
import CommentsSection from "./CommentsSection"
import DepartmentSigns from '../DisplayAllTasksPage/DepartmentSigns'
function handleChange(e, setTaskStatus, taskID) {
    console.log(e.target.value)
    let newValue = e.target.value
    setTaskStatus(newValue)
    putTaskStatus(newValue, taskID)
}
function formatDate(date) {
    const newDate = new Date(date);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(newDate);
    return formattedDate
}

export default function SingleTaskPage () {

    const taskID = useParams().taskID
    const {task, loading} = useGetTaskByID(taskID)
    const [taskStatus, setTaskStatus] = useState(undefined)
    if (loading) {return <>Loading...</>}

    let {priority, name, description, due_date, employee, status, department} = task
    return (
        <div className={styles.bodyWrapper}>
            <div className={styles.taskWrapper}>
                <div className={styles.signsWrapper}>
                    <PrioritySigns priority={priority}></PrioritySigns>
                    <DepartmentSigns id={department.id}></DepartmentSigns>
                </div>
                <h3 className={styles.name}>{name}</h3>
                <div className={styles.description}>{description}</div>
                <div className={styles.detailsWrapper}>
                    <div className={styles.status}>
                    <img src={statusIcon} alt="" />
                        <select name="status" id="status" value={taskStatus || status.id} onChange={(e) => {handleChange(e, setTaskStatus, taskID)}}>
                            <option value="1" >დასაწყები</option>
                            <option value="2">პროგრესში</option>
                            <option value="3">მზად ტესტირებისთვის</option>
                            <option value="4">დასრულებული</option>
                        </select>

                    </div>
                    <div className={styles.employee}>
                        <img src={userIcon} alt="" />
                        {employee.name + ` ` + employee.surname}
                    </div>
                    <div className={styles.deadline}>
                        <img src={calendarIcon} alt="" />
                        {formatDate(due_date)}
                    </div>
                </div>
            </div>
            <CommentsSection taskID = {taskID}></CommentsSection>
        </div>

    )

}

