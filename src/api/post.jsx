const authKey = "Bearer 9e721fd9-bc1d-427a-90a4-2f3dc54df7f2"


async function postWorker(worker) {
    console.log('running', worker)
//// Turn the avatar file into a blob here and try that way
    console.log(worker)
    let response = await fetch('https://momentum.redberryinternship.ge/api/employees', 
        {
            method: 'POST',
            headers: {'Authorization': authKey, 'Content-Type': 'multipart/form-data', Accept: 'application/json'},
            body: worker
            
        }

    )
    if(response.status >= 400){throw new Error('Error posting worker to API!')}
    console.log(response.status)
}

async function putTaskStatus(newStatus, taskID) {

    let data = JSON.stringify({
        status_id: newStatus
      })
    console.log(data)

    let response = await fetch(`https://momentum.redberryinternship.ge/api/tasks/${taskID}`, {
        method: 'PUT',
        headers: {
          'Authorization': authKey,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status_id: newStatus
        })
      })

    if(response.status >= 400){throw new Error('Error posting new task status to API!')}
    console.log(response.status)

}





export {postWorker, putTaskStatus}