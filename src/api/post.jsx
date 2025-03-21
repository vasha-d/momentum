const authKey = "Bearer 9e7c8ad9-3b91-45f3-96a7-e8072ab3a572"


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

async function postWorker(worker) {
    console.log('running', worker)
    console.log(worker)
    let response = await fetch('https://momentum.redberryinternship.ge/api/employees', 
        {
            method: 'POST',
            headers: {'Authorization': authKey, Accept: 'application/json'},
            body: worker
            
        }

    )
    if(response.status >= 400){throw new Error('Error posting worker to API!')}
    console.log(response.status)
    response.then((r) => {if(r.status < 400) {
      navi
    }})
}

async function postNewComment(newCommentObj, taskID) {
  let data = JSON.stringify(newCommentObj)
  console.log(data)
  let response = await fetch(`https://momentum.redberryinternship.ge/api/tasks/${taskID}/comments`, 
      {
          method: 'POST',
          headers: {'Authorization': authKey, 'Content-Type': 'application/json', Accept: 'application/json'},
          body: data
          
      }

  )
  if(response.status >= 400){throw new Error('Error posting worker to API!')}
  console.log(response.status)
  return response
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





export {postWorker, postNewComment, putTaskStatus, postTask}



