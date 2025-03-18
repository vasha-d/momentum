import styles from "../../styles/DisplayAllTasksPage/SingleTaskCard.module.css"
import PrioritySigns from './PrioritySigns'
import { Link } from "react-router-dom"



export default function SingleTaskCard ({taskObj}) {

    const {
        name,
        description,
        due_date,
        status,
        employee,
        priority,
        id
        } = taskObj
    console.log(taskObj)
    
    const wrapperStyle = styles[`status${status.id}`]
    return (
        <Link className={wrapperStyle} to={`tasks/${id}`}>
            <div className={styles.top}>
                <PrioritySigns priority={priority}></PrioritySigns>
                <div className="department"></div>
                <div className="date">{due_date}</div>
            </div>
            <div className={styles.middle}>
    
                <div className={styles.name}>{name}</div>
                <div className={styles.description}>{description}</div>
            </div>

            <div className={styles.bottom}>
                <div className={styles.employee}>
                    <img src={employee.avatar && "../../../public/employee-icon.png"}/>
                </div>
                <div className="comments"></div>
            </div>
        </Link>
    )
}