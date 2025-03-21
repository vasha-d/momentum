import styles from "../../styles/CreateTaskPage/CreateTaskPage.module.css"
import { createContext, useContext, useEffect, useState } from "react"
import { postTask } from "../../api/post"
import PrioritiesSelectField from "./PrioritiesSelectField"
import DepartmentsSelectField from "./DepartmentsSelectField"
import EmployeeSelectField from "./EmployeeSelectField"
import StatusSelectField from "./StatusSelectField"
import { useNavigate } from "react-router-dom"
  


function tomorrow () {
    const tmrw = new Date()
    tmrw.setDate(tmrw.getDate() + 1)
    const formattedDate = tmrw.toISOString().split('T')[0];
    return formattedDate
}



function today () {
    const today = new Date()
    // tmrw.setDate(tmrw.getDate() + 1)
    const formattedDate = today.toISOString().split('T')[0];
    return formattedDate
}

function storeData (data) {
    console.log('setting data')
    let stringified = JSON.stringify(data)
    localStorage.setItem('taskData', stringified)
    localStorage.setItem('taskData', stringified)
    localStorage.getItem('taskData')    
}



function getLocalData () {
    let startingTaskObj = {}
    if (localStorage.getItem('taskData') != null) {
        console.log(localStorage.getItem('taskData').name )
        startingTaskObj = JSON.parse(localStorage.getItem('taskData'))
    } else {
        startingTaskObj = {
            name: '',
            description: '',
            date: tomorrow(),
            status: 1,
            employee: 1,
            priority: 2,
            department: 0,
          }
    }
    return startingTaskObj
}


getLocalData()

const CreateTaskContext = createContext()

export default function CreateTaskPage () {
    const [newTaskData, setNewTaskData] = useState(getLocalData())
    const [hintStyles, setHintStyles] = useState({})
    const navigate = useNavigate()
    function validate (data) {
        let {name, description, department, employee, date} = data
        let {green, red} = styles
        let nameTyped = name.length > 0
        let descriptionTyped = description.length > 0
        let departmentSelected = department > 0
        let employeeSelected = employee > 1
        let deadlineSelected = (!!date)

        let nameCond1 = name.replace(/\s+/g, "").length > 2
        let nameCond2 = name.length < 256
        let descCond1 = description.trim().split(' ').length > 3
        let descCond2 = description.length < 256

        if (nameTyped) {
            let title1 = nameCond1 ? green : red
            let title2 = nameCond2 ? green : red
            setHintStyles((old) => {return {...old, title1, title2}})
        } else {
            setHintStyles((old) => {return {...old, title1: '', title2: ''}})
        }
        if (descriptionTyped) {
            let desc1 = descCond1 ? green : red
            let desc2 = descCond2 ? green : red
            setHintStyles((old) => {return {...old, desc1, desc2}})
        } else {
            setHintStyles((old) => {return {...old, desc1: '', desc2: ''}})
        }

        let descValidated = descriptionTyped ? descCond1 * descCond2 : true
        let nameValidated = nameCond1 * nameCond2
        let allValidated = (nameValidated * descValidated
            * departmentSelected * employeeSelected * deadlineSelected
        )
    
        return allValidated

    }
    useEffect(() => {
        validate(newTaskData)
        storeData(newTaskData)
        
    }, [newTaskData])

    console.log(localStorage.getItem('taskData'))

    function onFormChange(e) {
        let newVal = e.target.value
        let addition = {[e.target.id]: newVal}
        if(e.target.id == 'department') {
            addition = {...addition, employee: 1}
        }
        setNewTaskData((old) => {
            let newData = {...old, ...addition} 
            return newData
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
        if(validate(newTaskData)) {

            console.log(formattedObj)
            postTask(formattedObj)
            localStorage.removeItem('taskData')
            setNewTaskData(getLocalData())
            navigate("/")
        } else {
            console.log('form not validated')
        }

        return
    }
    return (
        <CreateTaskContext.Provider value={{newTaskData, onFormChange, setNewTaskData}}>
            <h2>შექმენი ახალი დავალება</h2>
            <div className={styles.taskFormWrapper}>

                    <fieldset className={styles.taskFieldset}>
                        <div>
                            <label htmlFor="name">სათაური*</label>
                            <input type="text" name="name" value={newTaskData.name }id="name" onChange={onFormChange}/>
                            <div className={styles.titleHints}>
                                <div className={hintStyles.title1}>
                                    მინიმუმ 3 სიმბოლო
                                </div>
                                <div className={hintStyles.title2}>
                                    მაქსიმუმ 255 სიმბოლო
                                </div>
                            </div>
                        </div>
                        <div className={styles.departmentsContainer}>
                            <DepartmentsSelectField></DepartmentsSelectField>
                        </div>
                     
                        <div className={styles.descriptionContainer}>
                            <label htmlFor="description">აღწერა</label>
                            <textarea name="description" value={newTaskData.description}id="description" onChange={onFormChange}></textarea>
                            <div className={styles.descriptionHints}>
                                <div className={hintStyles.desc1}>
                                    მინიმუმ 4 სიტყვა
                                </div>
                                <div className={hintStyles.desc2}>
                                    მაქსიმუმ 255 სიმბოლო
                                </div>
                            </div>
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
                            <input type="date" min={today()} name="date" id="date" value={newTaskData.date} onChange={onFormChange} />
                            <button className={styles.submitButton}onClick={handleCreate}>Post a task</button>
                        </div>
                    </fieldset>
            </div>
        </CreateTaskContext.Provider>
    )
}

export {CreateTaskContext}