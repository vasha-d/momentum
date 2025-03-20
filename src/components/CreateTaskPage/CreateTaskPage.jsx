import styles from "../../styles/CreateTaskPage/CreateTaskPage.module.css"
import { createContext, useContext, useState } from "react"
import { postTask } from "../../api/post"
import PrioritiesSelectField from "./PrioritiesSelectField"
import DepartmentsSelectField from "./DepartmentsSelectField"
import EmployeeSelectField from "./EmployeeSelectField"
import StatusSelectField from "./StatusSelectField"

  


function tomorrow () {
    const tmrw = new Date()
    tmrw.setDate(tmrw.getDate() + 1)
    const formattedDate = tmrw.toISOString().split('T')[0];
    return formattedDate
}


const startingTaskObj = {
    name: '',
    description: '',
    date: tomorrow(),
    status: 1,
    employee: 1,
    priority: 2,
    department: 1,
  }


const CreateTaskContext = createContext()

export default function CreateTaskPage () {


    
    const [newTaskData, setNewTaskData] = useState(startingTaskObj)

    function onFormChange(e) {
        let newVal = e.target.value
        let addition = {[e.target.id]: newVal}
        setNewTaskData((old) => {
            return {...old, ...addition}
        })
    }   
    function handleCreate () {
    
        console.log(newTaskData)
        let formattedObj = {
            name: newTaskData.name,
            description: newTaskData.description,
            due_date: newTaskData.date,
            status_id: newTaskData.status,
            employee_id: newTaskData.employee,
            priority_id: newTaskData.priority
        }
        console.log(formattedObj)
        postTask(formattedObj)
    }
    console.log(newTaskData)
    return (
        <CreateTaskContext.Provider value={{newTaskData, onFormChange, setNewTaskData}}>
            <h2>შექმენი ახალი დავალება</h2>
            <div className={styles.taskFormWrapper}>

                    <fieldset className={styles.taskFieldset}>
                        <div>
                            <label htmlFor="name">სათაური</label>
                            <input type="text" name="name" value={newTaskData.name }id="name" onChange={onFormChange}/>
                        </div>
                        <div className={styles.departmentsContainer}>
                            <DepartmentsSelectField></DepartmentsSelectField>
                        </div>
                     
                        <div className={styles.descriptionContainer}>
                            <label htmlFor="description">აღწერა</label>
                            <textarea name="description" value={newTaskData.description}id="description" onChange={onFormChange}></textarea>
                        </div>
                        <div className={styles.selectsContainer}>
                            <div className={styles.prioritiesContainer}>
                                <PrioritiesSelectField></PrioritiesSelectField>
                            </div>
                            <div className={styles.statusContainer}>
                                <StatusSelectField></StatusSelectField>
                            </div>
                        </div>
                        
                        
                        <div className={styles.employeeContainer}>
                            <EmployeeSelectField></EmployeeSelectField>
                        </div>
                        <div className={styles.dateContainer}>
                            <label htmlFor="date">დედლაინი</label>
                            <input type="date" name="date" id="date" value={newTaskData.date} onChange={onFormChange} />
                            <button className={styles.submitButton}onClick={handleCreate}>Post a task</button>
                        </div>
                    </fieldset>
            </div>
        </CreateTaskContext.Provider>
    )
}

export {CreateTaskContext}