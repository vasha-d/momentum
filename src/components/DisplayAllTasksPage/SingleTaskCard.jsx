import styles from "../../styles/DisplayAllTasksPage/SingleTaskCard.module.css"


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
            <div className="priority"></div>
            <div className="department"></div>
            <div className="date"></div>

            <div className="name">{name}</div>
            <div className="description">{description}</div>

            <div className="employee"></div>
            <div className="comments"></div>
        </div>
    )
}