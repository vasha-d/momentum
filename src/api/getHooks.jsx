import { useState } from "react"
import {  useEffect} from "react";
const authKey = "Bearer 9e721fd9-bc1d-427a-90a4-2f3dc54df7f2"


async function postTask(task) {
    console.log('running', task)
    let response = await fetch('https://momentum.redberryinternship.ge/api/tasks', 
        {
            method: 'POST',
            headers: {'Authorization': authKey, 'Content-Type': 'application/json',  Accept: 'application/json'},
            body: JSON.stringify(task)
            
        }

    )
    if(response.status >= 400){throw new Error('Error posting task to API!')}
    console.log(response.status)
}

function useGetDepartments () {
    const [departments, setDepartments] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let setData = async () => {
            let res = await fetch('https://momentum.redberryinternship.ge/api/departments',  {
                headers: {'Authorization': authKey,  "Accept": 'application/json'},        
            })
            if (res.status >= 400) {throw new Error('Error when fetching departments!')} 
            let data = await res.json()
       
            
            setDepartments(data)
            setLoading(false)   
        }

        setData().catch(error => console.log(error))

    }, [])
    return {departments, loading}

}
function useGetPriorities () {
    const [priorities, setPriorities] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let setData = async () => {
            let res = await fetch('https://momentum.redberryinternship.ge/api/departments',  {
                headers: {'Authorization': authKey,  "Accept": 'application/json'},        
            })
            if (res.status >= 400) {throw new Error('Error when fetching departments!')} 
            let data = await res.json()
       
            
            setPriorities(data)
            setLoading(false)   
        }

        setData().catch(error => console.log(error))

    }, [])
    return {priorities, loading}

}

function useGetStatuses () {
    const [statuses, setStatuses] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let setData = async () => {
            let res = await fetch('https://momentum.redberryinternship.ge/api/departments',  {
                headers: {'Authorization': authKey,  "Accept": 'application/json'},        
            })
            if (res.status >= 400) {throw new Error('Error when fetching departments!')} 
            let data = await res.json()
       
            
            setStatuses(data)
            setLoading(false)   
        }

        setData().catch(error => console.log(error))

    }, [])
    return {statuses, loading}

}



export {postTask, useGetPriorities, useGetStatuses, useGetDepartments}