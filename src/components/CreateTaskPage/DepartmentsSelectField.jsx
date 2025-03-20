import { useGetDepartments } from "../../api/getHooks"
import { useContext } from "react"
import {CreateTaskContext} from './CreateTaskPage'

function SingleOption ({department}) {


    return <option value={department.id}>{department.name}</option>
}
function DepartmentsList ({departments, loading}) {

    
    if(loading) return null;

    let list = departments.map(dep => {
        return <SingleOption department={dep} key={dep.id}></SingleOption>
    })

    return list
}   
export default function DepartmentsSelectField () {


    const {departments, loading} = useGetDepartments()
    const {newTaskData, onFormChange} = useContext(CreateTaskContext)
    const currentDepartment = newTaskData.department
    return (
        <>
            <label htmlFor="department">დეპარტამენტი*</label>
            <select name="department" value={currentDepartment} id="department" onChange={onFormChange} >
                <DepartmentsList departments={departments}
                                 loading={loading}
                ></DepartmentsList>
            </select>
        </>
    )
}