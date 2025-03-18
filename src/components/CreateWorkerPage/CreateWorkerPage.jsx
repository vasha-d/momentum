import { useState } from 'react'
import {useGetDepartments} from '../../api/getHooks'
import { postWorker } from '../../api/post'


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
        <>
            <label htmlFor="department"></label>
            <select name="department" id="department" value={value && undefined}
                onChange={(e) => {handleChange(e, setWorkerData)}}   
            >
                {optionList}
            </select>
        </>
    )
}

function handleSubmit(e, workerData) {
    e.preventDefault()
    const toSend = new FormData();
    toSend.append("name", workerData.name);
    toSend.append("surname", workerData.lastName);
    toSend.append("avatar", workerData.avatarFile);
    toSend.append("department_id", workerData.department);

    // postWorker(toSend)
}

export default function CreateWorkerPage () {

    
    let {departments, loading} = useGetDepartments()
    let [workerData, setWorkerData] = useState({
        name: '',
        lastName: '',
        avatar: '',
        department: '',
        avatarBlob: null,
    })

    let {name, lastName, avatar, department} = workerData
    
    return (
        <div>
            <h1>თანამშრომლის დამატება</h1>
            <form onSubmit={(e) => {handleSubmit(e, workerData)}}>
                <fieldset>
                    <label htmlFor="name" >სახელი*</label>
                    <input type="text" name="name" id="name" value={name}
                     onChange={(e) => {handleChange(e, setWorkerData)}}/>

                    <label htmlFor="lastName">გვარი*</label>
                    <input type="text" name="lastName" id="lastName" value={lastName}
                     onChange={(e) => {handleChange(e, setWorkerData)}}/>

                    <div className="avatarWrapper">
                        <label htmlFor="avatar">ავატარი*</label>
                        <input type="file" name="avatar" id="avatar" value={avatar} 
                        onChange={(e) => {handleChange(e, setWorkerData)}}/>
                        <img style= {{height: '150px'}}src={workerData.avatarBlob} alt="" />
                    </div>
                    
                    <DepartmentSelectField 
                        departments={departments} loading={loading} 
                        value={department} setWorkerData={setWorkerData}>
                    </DepartmentSelectField>
                </fieldset>

                <button type='submit' >დაამატე თანამშრომელი</button>
            </form>
        </div>
    )
}
