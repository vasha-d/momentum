import { useState } from 'react'
import {useGetDepartments} from '../../api/getHooks'
import { postWorker } from '../../api/post'
import styles from '../../styles/CreateWorkerPage.module.css'
import trashIcon from '../../assets/trash-icon.svg'
import employeeIcon from '../../assets/employee-icon.png'


function handleChange (e, setWorkerData) {

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
        console.log(newObj)
        return newObj
    })

}

function DepartmentSelectField ({departments, loading, setWorkerData, value}) {

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
                onChange={(e) => {handleChange(e, setWorkerData)}}   
            >
                {optionList}
            </select>
        </div>
    )
}

function handleSubmit(e, workerData) {
    e.preventDefault()
    const toSend = new FormData();
    toSend.append("name", workerData.name);
    toSend.append("surname", workerData.lastName);
    toSend.append("avatar", workerData.avatarFile);
    toSend.append("department_id", workerData.department);
    console.log(toSend.get('name'))
    console.log(toSend.get('avatar'))
    console.log(toSend.get('department_id'))
    console.log(toSend.get('avatar'))



    postWorker(toSend)
}

export default function CreateWorkerPage ({creatingWorker, setCreatingWorker}) {


    
    let {departments, loading} = useGetDepartments()
    let [workerData, setWorkerData] = useState({
        name: '',
        lastName: '',
        avatar: '',
        department: '',
        avatarBlob: null,
    })
    
    if (!creatingWorker) return null
    let {name, lastName, avatar, department} = workerData
    function toggleCreatingWorker () {
        //!!!!Also removes current data
        if(creatingWorker) {
            setWorkerData({
                name: '',
                lastName: '',
                avatar: '',
                department: '',
                avatarBlob: null
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
    console.log(departments)
    return (
        <div className={styles.blurOverlay} onClick={toggleCreatingWorker}>
            <div className={styles.moduleWrapper} onClick={(e) => {e.stopPropagation()}}>
                <h1>თანამშრომლის დამატება</h1>
                <form onSubmit={(e) => {handleSubmit(e, workerData)}}>
                    <fieldset>

                        <div className={styles.namesContainer}>
                            <div>
                                <label htmlFor="name" >სახელი*</label>
                                <input type="text" name="name" id="name" value={name}
                                 onChange={(e) => {handleChange(e, setWorkerData)}}/>
                            </div>

                            <div>
                                <label htmlFor="lastName">გვარი*</label>
                                <input type="text" name="lastName" id="lastName" value={lastName}
                                 onChange={(e) => {handleChange(e, setWorkerData)}}/>
                            </div>
                        </div>
                        <div className={styles.avatarSectionWrapper}>
                            <div>ავატარი*</div>
                            <div className={styles.avatarWrapper}>
                                <label className={styles.avatarLabel} htmlFor="avatar">
                                        <img className={styles.avatarImg}src={workerData.avatarBlob || employeeIcon} alt="" />
                                </label>
                                <img onClick={(e) => {deleteAvatar(e)}}className={styles.deleteAvatar}src={trashIcon} alt="" />
                                <input className={styles.fileInput}type="file" name="avatar" id="avatar" value={avatar}
                                onChange={(e) => {handleChange(e, setWorkerData)}}/>
                            </div>
                        </div>
            
                        <DepartmentSelectField
                            departments={departments} loading={loading}
                            value={department} setWorkerData={setWorkerData}>
                        </DepartmentSelectField>
                    </fieldset>
                    <div className={styles.formButtons}>
                        <div className={styles.cancelCreateWorker} onClick={toggleCreatingWorker}  >გაუქმება</div>
                        <div className={styles.createWorkerButton} type='submit' >დაამატე თანამშრომელი</div>
                    </div>
                </form>
            </div>
        </div>
    )
}
