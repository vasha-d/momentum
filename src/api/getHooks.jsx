import { useState } from "react"
import {  useEffect} from "react";
const authKey = "Bearer 9e721fd9-bc1d-427a-90a4-2f3dc54df7f2"




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
            let res = await fetch('https://momentum.redberryinternship.ge/api/priorities',  {
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
            let res = await fetch('https://momentum.redberryinternship.ge/api/statuses',  {
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

function useGetTaskByID (id) {
    const [task, setTask] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let setData = async () => {
            let res = await fetch(`https://momentum.redberryinternship.ge/api/tasks/${id}`,  {
                headers: {'Authorization': authKey,  "Accept": 'application/json'},        
            })
            if (res.status >= 400) {throw new Error('Error when fetching departments!')} 
            let data = await res.json()
            
            setTask(data)
            setLoading(false)   
        }

        setData().catch(error => console.log(error))

    }, [])
    return {task, loading}
    
}

function useGetComments (taskID, refresh) {
    
    let [comments, setComments] = useState(null)
    let [loading, setLoading] = useState(true)
    useEffect(() => {
        let setData = async () => {
            let res = await fetch(`https://momentum.redberryinternship.ge/api/tasks/${taskID}/comments`,  {
                headers: {'Authorization': authKey,  "Accept": 'application/json'},        
            })
            if (res.status >= 400) {throw new Error('Error when fetching departments!')} 
            let data = await res.json()
            setComments(data)
            setLoading(false)   
        }

        setData().catch(error => console.log(error))

    }, [refresh])
    return {comments, loading}
}



function useGetEmployees () {
    const [employees, setEmployees] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let setData = async () => {
            let res = await fetch('https://momentum.redberryinternship.ge/api/employees',  {
                headers: {'Authorization': authKey,  "Accept": 'application/json'},        
            })
            if (res.status >= 400) {throw new Error('Error when fetching departments!')} 
            let data = await res.json()
       
            
            setEmployees(data)
            setLoading(false)   
        }

        setData().catch(error => console.log(error))

    }, [])
    return {employees, loading}

}



export {useGetPriorities, useGetStatuses, useGetDepartments, useGetTaskByID, useGetComments, useGetEmployees}