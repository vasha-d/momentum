import { useState } from 'react'
import styles from '../../styles/SingleTaskPage/CommentsSection.module.css'
import { postNewComment } from '../../api/post'
import { useGetComments } from '../../api/getHooks'




function Comment ({comment}) {

    
}




export default function CommentsSection ({taskID}) {


    const [newComment, setNewComment] = useState(null)
    let {comments, loading} = useGetComments(taskID)


    console.log(comments)
    function handleChange(e) {
        let newValue = e.target.value
        setNewComment(newValue)
    }

    function submitNewComment() {
        let newCommentObj = {
            text: newComment,
            parend_id: null
        }
        postNewComment(newCommentObj, taskID)
    }

    return (
        <div className={styles.commentsSection}>
            <textarea 
                placeholder='დაწერე კომენტარი' value={newComment || ''}
                className={styles.newComment} name="newComment" id="newComment"
                onChange={handleChange}
                >


            </textarea>

            <button onClick={submitNewComment} className={styles.submitComment}>დააკომენტარე</button>

            <div className={styles.comments}>

            </div>
        </div>
    )
}