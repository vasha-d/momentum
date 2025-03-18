import SingleTaskCard from "./SingleTaskCard";

function TaskColumn ({tasks, status}) {

    let forThisColumn = tasks.filter((element) => element.status.id)
    console.log(forThisColumn, tasks)
    let columnList = forThisColumn.map((taskObj) => {

        return <SingleTaskCard key={taskObj.id} task={taskObj}></SingleTaskCard>
    })
    
    return columnList
}

function TaskBox ({tasks}) {
    console.log(tasks)
    return (
        <div id="taskBox">
            <div className="task-column" data-status="1">
                დასაწყები
                <TaskColumn tasks={tasks} status={1}></TaskColumn>
            </div>
            <div className="task-column" data-status="2">
                პროგრესში
                <TaskColumn tasks={tasks} status={2}></TaskColumn>
            </div>
            <div className="task-column" data-status="3">
                მზად ტესტირებისთვის
                <TaskColumn tasks={tasks} status={3}></TaskColumn>
            </div>
            <div className="task-column" data-status="4">
                დასრულებული
                <TaskColumn tasks={tasks} status={4}></TaskColumn>
            </div>
        </div>
    )
}


export default TaskBox