import { useEffect, useState } from "react"

const authKey = "Bearer 9e7c8ad9-3b91-45f3-96a7-e8072ab3a572"


function useGetAllTasks () {
    const [tasks, setTasks] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let setData = async () => {
            let response = await fetch('https://momentum.redberryinternship.ge/api/tasks',
                { headers: {'Accept': 'application/json', "Authorization": authKey}})
            if (response.status >= 400) {throw new Error('Error when fetching tasks!')} 
            let data = await response.json()
       
            
            setTasks(data)
            setLoading(false)   
        }

        setData().catch(error => console.log(error))

    }, [])
    return {tasks, loading}

}




export default useGetAllTasks