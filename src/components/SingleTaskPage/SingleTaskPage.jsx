import { useParams } from "react-router-dom"



function SingleTaskPage () {

    const taskID = useParams().taskID
    console.log(useParams())
    return <>Task number ... {taskID}</>

}


export default SingleTaskPage