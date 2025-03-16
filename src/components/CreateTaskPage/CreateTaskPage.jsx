
import { postTask } from "../../api/methods"

let firstTask = 
{   
    id: 876,
    name: 'შექმენით readme ფაილი',
    description: 'აღწერეთ შესრულებული დავალება რიდმი ფაილით',
    due_date: '2025-12-31',
    status_id: 1,
    employee_id: 1,
    priority_id: 1
  }
  
function test () {
    
    postTask(firstTask)
}


export default function CreateTaskPage () {


    return (
        <div>
            <h1>Create Task</h1>
            <button onClick={test}>Post a task</button>
        </div>
    )
}