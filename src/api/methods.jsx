
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

function getTaskByID(taskID) {

}

function changeTaskStatus(taskID) {
    
}


export {postTask, getTaskByID, changeTaskStatus}