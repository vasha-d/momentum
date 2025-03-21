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
    const options = { day: "numeric", month: "numeric", year: "numeric" , weekday: 'short' };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(newDate);
    return formattedDate
}

export default function SingleTaskPage () {

    const taskID = useParams().taskID
    const {task, loading} = useGetTaskByID(taskID)
    const [taskStatus, setTaskStatus] = useState(undefined)
    if (loading) {return <>Loading...</>}

    let {priority, name, description, due_date, employee, status, department} = task
    console.log(employee)
    return (
        <div className={styles.bodyWrapper}>
            <div className={styles.taskWrapper}>
                <div className={styles.signsWrapper}>
                    <PrioritySigns theme={styles} priority={priority}></PrioritySigns>
                    <DepartmentSigns theme={styles} id={department.id}></DepartmentSigns>
                </div>
                <h3 className={styles.name}>{name}</h3>
                <div className={styles.description}>{description}</div>
                <div className={styles.detailsWrapper}>
                    <h2>დავალების დეტალები</h2>
                    <div className={styles.status}>
                        <span className={styles.detailName}>
                            <img src={statusIcon} alt="" />
                            <span>სტატუსი</span>
                        </span>
                        <select className={styles.detail} name="status" id="status" value={taskStatus || status.id} onChange={(e) => {handleChange(e, setTaskStatus, taskID)}}>
                            <option value="1" >დასაწყები</option>
                            <option value="2">პროგრესში</option>
                            <option value="3">მზად ტესტირებისთვის</option>
                            <option value="4">დასრულებული</option>
                        </select>

                    </div>
                    <div className={styles.employee}>
                        <span className={styles.detailName}>
                            <img src={userIcon} alt="" />
                            <span>თანამშრომელი </span>
                        </span>
                        <span className={styles.detail}>
                            <img src={employee.avatar} alt="" />
                            <span className={styles.employeeInfo}>
                                <div className={styles.employeeDep}>
                                    {employee.department.name}
                                </div>
                                {employee.name + ` ` + employee.surname}
                            </span>
                        </span>
                    </div>
                    <div className={styles.deadline}>
                        <span className={styles.detailName}>
                            <img src={calendarIcon} alt="" />
                            <span>დავალების ვადა </span>
                        </span>
                        <span className={styles.detail}>{formatDate(due_date)}</span>
                    </div>
                </div>
            </div>
            <CommentsSection taskID = {taskID}></CommentsSection>
        </div>

    )

}

