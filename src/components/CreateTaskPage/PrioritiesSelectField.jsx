import { useContext, useEffect, useState } from "react"
import {createTaskContext} from './CreateTaskPage'
import { useGetPriorities } from "../../api/getHooks"
import styles from "../../styles/CreateTaskPage/PrioritiesSelectField.module.css"
import dropDownIcon from '../../assets/drop-down-icon.svg'

function OptionList ({priorities, choosing, currentlyChosen, setNewTaskData}) {
    function handleSelect(e, prioID) {
        setNewTaskData((data) => {
            return {...data, priority_id: prioID}
        })
    }

    function SingleOption ({prio}) {
        function DropIcon () {
            console.log(prio.id)
            let styleAttr = choosing ? {'transform' : 'rotateZ(180deg)'} : null
            return <img className={styles.dropDownImg}style={styleAttr} src={dropDownIcon}></img>
         }
   
        return (
            <div onClick={(e) => (handleSelect(e, prio.id))} data-withinfield={true} className={styles.prioOption}>
                    <img data-withinfield={true} src={prio.icon} alt="" />
                    {prio.name}
                    <DropIcon></DropIcon>
            </div>
        )
    }

    const list = priorities.map((prio) => <SingleOption key={prio.id} prio={prio}></SingleOption>)
    
    if (!choosing) return list[currentlyChosen-1]   

    let arrangedList =  [list[1], list[0], list[2]]

    return  choosing ? arrangedList : list[currentlyChosen]
}

export default function PrioritiesSelectField() {

    const {newTaskData, setNewTaskData} =  useContext(createTaskContext)
    const {priorities, loading} = useGetPriorities()
    const [choosing, setChoosing] = useState(false)
    const currentlyChosen = newTaskData.priority_id || 2
    function toggleChoosing () {
        setChoosing(c => !c)
    }
    useEffect(() => {
        const handleClickOutsideField = (e) => {
            if (e.target.dataset['withinfield'] == undefined && choosing) {
                toggleChoosing()
            }
        }
        document.addEventListener('click', handleClickOutsideField)
        return () => {
            document.removeEventListener('click', handleClickOutsideField)
        }
    }, [choosing])


    if (loading) return <>Loading...</>;

    return (
        <>        
            <label data-withinfield={true} htmlFor="priority_id">პრიორიტეტი*</label>
            <div data-withinfield={true} className={styles.dropDown} onClick={toggleChoosing}>
                <OptionList 
                    priorities={priorities} choosing={choosing}
                    currentlyChosen={currentlyChosen} setNewTaskData={setNewTaskData}
                ></OptionList>
            </div>  
        </>
    )

}



