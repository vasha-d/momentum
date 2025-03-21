import styles from "../../styles/DisplayAllTasksPage/SingleTaskCard.module.css"
import DepartmentSigns from "./DepartmentSigns"
import PrioritySigns from './PrioritySigns'
import { Link } from "react-router-dom"
import employeeIcon from '../../assets/employee-icon.png'
import commentsIcon from '../../assets/comments-icon.svg'

function truncateDescription (desc) {
    let noSpaces = desc.replace(/\s+/g, ""); 
    if (noSpaces.length > 99) {
        let ellipsisTruncate = desc.slice(0, 100) + '...'
        return ellipsisTruncate
    } else {
        return desc
    }
}

function formatDate(date) {
    const newDate = new Date(date);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(newDate);
    return formattedDate
}

export default function SingleTaskCard ({taskObj}) {

    const {
        name,
        description,
        due_date,
        status,
        employee,
        priority,
        id,
        department,
        total_comments
        } = taskObj

    const wrapperStyle = styles[`status${status.id}`]
    return (
        <Link className={wrapperStyle} to={`tasks/${id}`}>
            <div className={styles.top}>
                <PrioritySigns priority={priority}></PrioritySigns>
                <DepartmentSigns id={department.id}></DepartmentSigns>
                <div className={styles.date}>{formatDate(due_date)}</div>
            </div>
            <div className={styles.middle}>
    
                <div className={styles.name}>{name}</div>
                <div className={styles.description}>
                    {truncateDescription(description)}
                </div>
            </div>

            <div className={styles.bottom}>
                <div className={styles.employee}>
                    <img src={employee.avatar}/>
                </div>
                <div className={styles.comments}>
                    <img src={commentsIcon} alt="" />
                    <div className={styles.commentsNumber}>
                        {total_comments}
                    </div>
                </div>
            </div>
        </Link>
    )
}