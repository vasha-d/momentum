import { useContext } from "react";
import { useGetStatuses } from "../../api/getHooks";
import { CreateTaskContext } from "./CreateTaskPage";
import styles from "../../styles/CreateTaskPage/CreateTaskPage.module.css"

export default function StatusSelectField () {



    const {statuses, loading} = useGetStatuses()
    const {onFormChange, newTaskData} = useContext(CreateTaskContext) 
    const currentValue = newTaskData.status
    if (loading) {return 'loading...';}
    function OptionList () {
        let list = statuses.map((stat) => {
            return (
                <option key={stat.id} value={stat.id}>{stat.name}</option>
            )
        })
        return list
    }
    return (
        <>
            <label htmlFor="status">სტატუსი*</label>
            <select name="status" id="status" value={currentValue} onChange={onFormChange}>
    
                <OptionList></OptionList>
            </select>
        </>
    )
}   

