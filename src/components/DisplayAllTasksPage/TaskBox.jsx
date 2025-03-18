import SingleTaskCard from "./SingleTaskCard";
import styles from "../../styles/DisplayAllTasksPage/TaskBox.module.css"

function TaskColumn ({tasks, status}) {
    // console.log(status,tasks)
    let forThisColumn = tasks.filter((t) => {   
        return t.status.id == status
    })
    console.log(forThisColumn)
    let columnList = forThisColumn.map((taskObj) => {

        return <SingleTaskCard key={taskObj.id} taskObj={taskObj}></SingleTaskCard>
    })
    
    return columnList
}   

function TaskBox ({tasks}) {
    return (
        <div className={styles.taskBoxWrapper}>
            <div className={styles.taskBox}>
                <div className={styles.taskColumn} data-status="1">
                    <h3 className={styles.status1}>დასაწყები</h3>
                    <TaskColumn tasks={tasks} status={1}></TaskColumn>
                </div>
                <div className={styles.taskColumn} data-status="2">
                    <h3 className={styles.status2}>პროგრესში</h3>
                    <TaskColumn tasks={tasks} status={2}></TaskColumn>
                </div>
                <div className={styles.taskColumn} data-status="3">
                    <h3 className={styles.status3}>მზად ტესტირებისთვის</h3>
                    <TaskColumn tasks={tasks} status={3}></TaskColumn>
                </div>
                <div className={styles.taskColumn} data-status="4">
                    <h3 className={styles.status4}>დასრულებული</h3>
                    <TaskColumn tasks={tasks} status={4}></TaskColumn>
                </div>
            </div>
        </div>
    )
}


export default TaskBox