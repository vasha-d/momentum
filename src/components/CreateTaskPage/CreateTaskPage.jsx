
import { useState } from "react"
import { postTask } from "../../api/getHooks"

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

const startingTaskObj = {
    name: null,
    description: null,
    due_date: null,
    status_id: null,
    employee_id: null,
    priority_id: null
  }

export default function CreateTaskPage () {


    
    const [newTaskData, setNewTaskData] = useState(startingTaskObj)

    return (
        <div>
            <h1>Create Task</h1>
            <button onClick={test}>Post a task</button>


            <form action="">
                <fieldset>
                    <label htmlFor="taskName">სათაური</label>
                    <input type="text" name="Title" id="taskName" />

                 

                    <label htmlFor="prio">პრიორიტეტი*</label>
                    <br />

                    <label htmlFor="description">აღწერა</label>
                    <textarea name="description" id="description"></textarea>

                    <select name="prio" id="prio" value={2}>
                        <option value="1">დაბალი</option>
                        <option value="2" selected>საშუალო</option>
                        <option value="3">მაღალი</option>
                    </select>

                    <br />
                    
                    <label htmlFor="status">სტატუსი*</label>
                    <select name="status" id="status">
                        <option value="1" selected>დასაწყები</option>
                        <option value="2">პროგრესში</option>
                        <option value="3">მზად ტესტირებისთვის</option>
                        <option value="3">დასრულებული</option>
                    </select>

                    <label htmlFor="department">დეპარტამენტი*</label>
                    <select name="department" id="department" >
                        <option value="1" selected>დიზაინის დეპარტამენტი</option>
                        <option value="2">ლოტისტიკის დეპარტამენტი</option>
                        <option value="3">მარკეტინგის დეპარტამენტი</option>
                        <option value="4">IT დეპარტამენტი</option>
                        <option value="5">გაყიდვების დეპარტამენტი</option>
                    </select>

                    <label htmlFor="employee">პასუხისმგებელი თანამშრომელი*</label>
                    <select name="employee" id="employee" >
                        ...
                    </select>
                    
                    <label htmlFor="deadline">დედლაინი</label>
                    <input type="date" name="deadline" id="deadline" />

                </fieldset>
            </form>
        </div>
    )
}