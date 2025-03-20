import { useContext, useEffect, useState } from "react"
import {CreateTaskContext} from './CreateTaskPage'
import { useGetPriorities } from "../../api/getHooks"
import classes from "../../styles/CreateTaskPage/PrioritiesSelectField.module.css"
import dropDownIcon from '../../assets/drop-down-icon.svg'
import {generalInputField} from '../../styles/CreateTaskPage/CreateTaskPage.module.css'

let styles = {...classes, generalInputField}

function OptionList ({priorities, choosing, currentlyChosen, setNewTaskData}) {
    function handleSelect(e, prioID) {
        setNewTaskData((data) => {
            return {...data, priority: prioID}
        })
    }

    function SingleOption ({prio}) {
        function DropIcon () {
            if (prio.id != currentlyChosen) {return null}
            let styleAttr = choosing ? {'transform' : 'rotateZ(180deg)'} : null
            return <img className={styles.dropDownImg}style={styleAttr} src={dropDownIcon}></img>
         }
   
        return (
            <div onClick={(e) => (handleSelect(e, prio.id))} data-priofield={true} className={styles.prioOption}>
                    <img data-priofield={true} src={prio.icon} alt="" />
                    {prio.name}
                    <DropIcon></DropIcon>
            </div>
        )
    }

    const list = priorities.map((prio) => <SingleOption key={prio.id} prio={prio}></SingleOption>)
    

    let arrangedList =  [list.splice(currentlyChosen-1, 1), ...list]

    return  choosing ? arrangedList : arrangedList[0]
}

export default function PrioritiesSelectField() {

    const {newTaskData, setNewTaskData} =  useContext(CreateTaskContext)
    const {priorities, loading} = useGetPriorities()
    const [choosing, setChoosing] = useState(false)
    const currentlyChosen = newTaskData.priority || 2
    function toggleChoosing () {
        setChoosing(c => !c)
    }
    useEffect(() => {
        const handleClickOutsideField = (e) => {
            if (e.target.dataset['priofield'] == undefined && choosing) {
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
            <div htmlFor="priority_id">პრიორიტეტი*</div>
            <div data-priofield={true} className={styles.dropDown + ` ` + styles.generalInputField} onClick={toggleChoosing}>
                <OptionList 
                    priorities={priorities} choosing={choosing}
                    currentlyChosen={currentlyChosen} setNewTaskData={setNewTaskData}
                ></OptionList>
            </div>  
        </>
    )

}



