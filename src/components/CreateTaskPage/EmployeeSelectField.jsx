import { useContext, useEffect, useState } from "react"
import {CreateTaskContext} from './CreateTaskPage'
import { useGetEmployees } from "../../api/getHooks"
import styles from "../../styles/CreateTaskPage/EmployeeSelectField.module.css"
import dropDownIcon from '../../assets/drop-down-icon.svg'
import { CreateWorkerContext } from "../../App"

function CreateEmployeeButton () {
    const {creatingWorker, setCreatingWorker} = useContext(CreateWorkerContext)

    function toggleCreatingWorker () {
        setCreatingWorker(c => !c)
    }

    return (
        <div className={styles.createWorkerButton}onClick={toggleCreatingWorker} data-empfield={true}>დაამატე ახალი</div>
    )
}

function SelectField ({employees, currentlySelected, choosing}) {
    const {setNewTaskData} = useContext(CreateTaskContext)
    function handleSelect (employeeID) {
        let addition = {employee: employeeID}
        setNewTaskData(old => {
            return {...old, ...addition}
        })
    }
    function SingleOption ({employee}) {
        function DropIcon () {
            let employeeIndex = employees.indexOf(employee)
            if (employeeIndex != currentlySelected) {return null}
            let styleAttr = choosing ? {'transform' : 'rotateZ(180deg)'} : null
            return <img className={styles.dropDownImg}style={styleAttr} src={dropDownIcon}></img>
        }
        return (
            <div key={employee.id} data-empfield={true} className={styles.singleOption} onClick={() => {handleSelect(employee.id)}}>
                {employee.name + ` ` + employee.surname}
                <DropIcon></DropIcon>
            </div>
        )
    }   

    let options = []

    if (employees) {
        options = employees.map(emp => {
            return <SingleOption employee={emp}
                                 key={emp.id}
            ></SingleOption>
        })
    } 

    const currentEmp = options[currentlySelected]
    const chooseDiv = 
    <span data-empfield={true} className={styles.chooseEmp} key={'choose'}>
        აირჩიეთ...
        <img src={dropDownIcon} alt="" />
    </span>
    if (!choosing) {
        if (currentEmp) {return currentEmp} else {
            return chooseDiv
        }
    }

    if (choosing) {
        let theRest = options.filter(emp => emp != currentEmp)
        let arrangedList = [currentEmp, <CreateEmployeeButton key={'create'}></CreateEmployeeButton>, theRest]
        if (currentEmp) {
            return arrangedList
        } else {
            return [chooseDiv,  <CreateEmployeeButton key={'create'}></CreateEmployeeButton>, ...options]
        }
    }


    if (!choosing) return options[currentlySelected] || 'none'

    return arrangedList

}


export default function EmployeeSelectField() {
    const {newTaskData, onFormChange} = useContext(CreateTaskContext)
    const {employees, loading} = useGetEmployees()
    const [choosing, setChoosing] = useState(false)
    
    function toggleChoosing() {setChoosing(c => !c)}
    
    useEffect(() => {
        
        function handleClickOutsideField(e) {
            if (e.target.dataset.empfield == undefined && choosing) {
                toggleChoosing()
            }
        }
        
        document.addEventListener('click', handleClickOutsideField)

        return () => {
            document.removeEventListener('click', handleClickOutsideField)
        }
    }, [choosing])
    
    if (loading) return null;

    const filteredEmployees = employees.filter((e) => {
        return e.department.id == newTaskData.department
    })  
    const currentlySelected = filteredEmployees.findIndex((emp) => {
        return emp.id == newTaskData.employee}
    ) || 0


    return (
        <>
            <div className={styles.fieldHeader}>
                პასუხისმგებელი თანამშრომელი*:
            </div>
            <div data-empfield={true} onClick={toggleChoosing} className={styles.dropDownContainer}>
                <SelectField employees={filteredEmployees}
                             currentlySelected={currentlySelected}
                             choosing={choosing}
                ></SelectField>
            </div>
        </>
    )
}