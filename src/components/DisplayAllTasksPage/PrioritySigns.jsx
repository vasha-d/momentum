import styles from '../../styles/DisplayAllTasksPage/DepartmentSigns.module.css';


export default function PrioritySigns ({priority}) {

    let {icon, id, name} = priority

    let prioStyle = styles[`prio${id}`]

    return (
        <div className={prioStyle}>
            <img className={styles.prioIcon} src={icon} alt="" />
            {name}
        </div>
    )


}
