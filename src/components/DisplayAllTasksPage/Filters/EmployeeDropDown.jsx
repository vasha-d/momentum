import { useGetEmployees } from "../../../api/getHooks";
import styles from "../../../styles/DisplayAllTasksPage/Filters.module.css"


export default function EmployeeDropDown ({setFilters, choosing, setChoosing, currentEmployee, setCurrentEmployee}) {

    const {employees, loading} = useGetEmployees()

    if (loading) return '..loading';
    function checkBoxChange (e) {
        let isChecked = e.target.id == currentEmployee
        let targetEmpId = e.target.id
        if (isChecked) {
            setCurrentEmployee(0)
        } else {
            setCurrentEmployee(targetEmpId)
        }

    }
    function DropDownList () {
        let list = employees.map(emp => {
            let employeeId = emp.id
            let checked = currentEmployee == employeeId
            return (
                <div key={employeeId} className={styles.empOption + ` ` + styles.checkBoxWrapper}>
                    <input onChange ={checkBoxChange} checked={checked}type="checkbox" name={employeeId} id={employeeId} />
                    <label forhtml={employeeId}> 
                        <img src={emp.avatar} alt="" />
                        {emp.name + ` ` + emp.surname} 
                    </label>
                </div>
            )
        })
        return list
    }

    function ConfirmButton () {


        
        setFilters(old => {
            let addition = {employee: currentEmployee}
            return {...old, ...addition}
        })

        setChoosing(false)
    }
    if (!choosing) {return null}

    return (    
        <div className={styles.employeeDropDown}>  
            <DropDownList></DropDownList>
            <button onClick={ConfirmButton}className={styles.confirmEmp}>
                არჩევა
            </button>
        </div>
    )
}