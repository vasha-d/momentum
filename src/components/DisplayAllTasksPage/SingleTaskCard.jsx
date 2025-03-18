import styles from "../../styles/DisplayAllTasksPage/SingleTaskCard.module.css"
import PrioritySigns from './PrioritySigns'



function Employee({employee}) {

    let {avatar} = employee
    
    return 
}

export default function SingleTaskCard ({taskObj}) {

    const {
        name,
        description,
        due_date,
        status,
        employee,
        priority,
        } = taskObj
    console.log(taskObj)
    
    const wrapperStyle = styles[`status${status.id}`]
    return (
        <div className={wrapperStyle}>
            
            <div className={styles.top}>
                <PrioritySigns priority={priority}></PrioritySigns>
                <div className="department"></div>
                <div className="date">{due_date}</div>
            </div>
            <div className={styles.middle}>
    
                <div className={styles.name}>{name}</div>

            <div className={styles.bottom}>
                <div className={styles.employee}>
                    <img src={taskObj.employee.avatar && "../../../public/employee-icon.png"}/>
                </div>
                <div className="comments"></div>
            </div>
        </div>
    )
}