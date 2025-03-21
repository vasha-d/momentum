import { useState } from 'react'
import {useGetDepartments} from '../../api/getHooks'
import { postWorker } from '../../api/post'
import styles from '../../styles/CreateWorkerPage.module.css'
import trashIcon from '../../assets/trash-icon.svg'
import employeeIcon from '../../assets/employee-icon.png'
import { CreateWorkerContext } from '../../App'
import { useContext } from 'react'


function validate(data, setHintStyles) {
    console.log(data)
    let {name, lastName, department, avatar} = data
    let {green, red} = styles
    let newStyles = {
        name: [],
        lastName: []
    }
    name = name.replace(/\s+/g, '');
    lastName = lastName.replace(/\s+/g, '');

    let nameTyped = name.length > 0
    let lastNameTyped = lastName.length > 0

    if (nameTyped) {
        let nameCond = [false, false]
        nameCond[0] = name.length > 2
        nameCond[1] = name.length < 256
        newStyles.name = [
            nameCond[0] ? green : red,
            nameCond[1] ? green : red
        ]
    } 
    if (lastNameTyped) {
        let lastNameCond = [false, false]
        lastNameCond[0] = lastName.length > 2
        lastNameCond[1] = lastName.length < 256
        newStyles.lastName = [
            lastNameCond[0] ? green : red,
            lastNameCond[1] ? green : red
        ]
    }
    
    
    setHintStyles(newStyles)

}


function handleChange (e, setWorkerData, setHintStyles) {
    let target = e.target
    let newObj = {}
    let addition = {}
    //If change is on avatar file input:
    if (e.target.id == 'avatar') {
        let fileVal = e.target.files[0]
        let objURL = URL.createObjectURL(fileVal)
        addition = {avatarFile: fileVal, avatarBlob: objURL, }
    } else {
        addition = {[`${target.id}`]: target.value}
    }
    setWorkerData((data) => {
        let copy = data
        Object.assign(newObj, copy, addition)
        validate(newObj, setHintStyles)
        return newObj
    })


}

function DepartmentSelectField ({departments, loading, setWorkerData, value, setHintStyles}) {

    let optionList = 'loading...'

    if (!loading) {
        optionList = departments.map((dep) => {
            let {id, name} = dep
            return (
                
                <option value={id} key={id}> {name} </option>
                
            )
        })
    }
    return (
        <div className={styles.departmentSectionWrapper}>
            <label htmlFor="department">დეპარტამენტი*</label>
            <select name="department" id="department" value={value && undefined}
                onChange={(e) => {handleChange(e, setWorkerData, setHintStyles)}}   
            >
                {optionList}
            </select>
        </div>
    )
}

function handleSubmit(e, workerData, toggleCreatingWorker) {
    e.preventDefault()
    const toSend = new FormData();
    toSend.append("name", workerData.name);
    toSend.append("surname", workerData.lastName);
    toSend.append("avatar", workerData.avatarFile);
    toSend.append("department_id", workerData.department);
    toggleCreatingWorker()
    postWorker(toSend)
}

export default function CreateWorkerPage () {

    const {creatingWorker, setCreatingWorker} = useContext(CreateWorkerContext)
    
    let {departments, loading} = useGetDepartments()
    let [workerData, setWorkerData] = useState({
        name: '',
        lastName: '',
        avatar: '',
        department: '',
        avatarBlob: null,
    })
    let [hintStyles, setHintStyles] = useState({
        name: [],
        lastName: []
    })
    if (!creatingWorker) return null
    let {name, lastName, avatar, department} = workerData
    
    function toggleCreatingWorker () {
        //!!!!Also removes current data if creating...
        if(creatingWorker) {
            setWorkerData({
                name: '',
                lastName: '',
                avatar: '',
                department: '',
                avatarBlob: null
            })
            setHintStyles({
                     name: [],
                    lastName: []
            })
        }
        setCreatingWorker(creating => !creating)
    }
    function deleteAvatar (event) {
        event.stopPropagation()
        setWorkerData(data => {
            return Object.assign({}, data, {avatarBlob: undefined})
        })
    }
    return (
        <div className={styles.blurOverlay} onClick={toggleCreatingWorker}>
            <div className={styles.moduleWrapper} onClick={(e) => {e.stopPropagation()}}>
                <h1>თანამშრომლის დამატება</h1>
                <form>
                    <fieldset>
                        <div className={styles.namesContainer}>
                            <div>
                                <label htmlFor="name" >სახელი*</label>
                                <input type="text" name="name" id="name" value={name}
                                 onChange={(e) => {handleChange(e, setWorkerData, setHintStyles)}}/>
                                <div className={styles.hints}>
                                    <div className={hintStyles.name[0]}>
                                        მინიმუმ 3 სიმბოლო
                                    </div>
                                    <div className={hintStyles.name[1]}>
                                        მაქსიმუმ 255 სიმბოლო
                                    </div>
                                </div>                                
                            </div>

                            <div>
                                <label htmlFor="lastName">გვარი*</label>
                                <input type="text" name="lastName" id="lastName" value={lastName}
                                 onChange={(e) => {handleChange(e, setWorkerData, setHintStyles)}}/>
                                <div className={styles.hints}>
                                    <div className={hintStyles.lastName[0]}>
                                        მინიმუმ 3 სიმბოლო
                                    </div>
                                    <div className={hintStyles.lastName[1]}>
                                        მაქსიმუმ 255 სიმბოლო
                                    </div>
                                </div>     
                            </div>
                        </div>
                        <div className={styles.avatarSectionWrapper}>
                            <div>ავატარი*</div>
                            <div className={styles.avatarWrapper}>
                                <label className={styles.avatarLabel} htmlFor="avatar">
                                        <img className={styles.avatarImg}src={workerData.avatarBlob || employeeIcon} alt="" />
                                </label>
                                <img onClick={(e) => {deleteAvatar(e)}}className={styles.deleteAvatar}src={trashIcon} alt="" />
                                <input accept="image/png, image/jpeg" className={styles.fileInput}type="file" name="avatar" id="avatar" value={avatar}
                                onChange={(e) => {handleChange(e, setWorkerData, setHintStyles)}}/>
                            </div>
                        </div>
            
                        <DepartmentSelectField
                            departments={departments} loading={loading}
                            value={department} setWorkerData={setWorkerData}
                            setHintStyles={setHintStyles}
                            >
                        </DepartmentSelectField>
                    </fieldset>
                    <div className={styles.formButtons}>
                        <div className={styles.cancelCreateWorker} onClick={toggleCreatingWorker}  >გაუქმება</div>
                        <div className={styles.createWorkerButton} onClick={(e) => {handleSubmit(e, workerData, toggleCreatingWorker)}} type='submit' >დაამატე თანამშრომელი</div>
                    </div>
                </form>
            </div>
        </div>
    )
}
