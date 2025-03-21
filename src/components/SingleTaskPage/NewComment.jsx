
import styles from '../../styles/SingleTaskPage/CommentsSection.module.css'




export default function NewComment ({newComment, submitNewComment, handleChange}) {

    return (
        <div className={styles.textAreaWrapper + ' ' + styles.newCommentContainer}>
            <textarea
                placeholder='დაწერე კომენტარი' value={newComment || ''}
                className={styles.newComment} name="newComment" id="newComment"
                onChange={handleChange}
                >
            </textarea>
            <button onClick={() => {submitNewComment(newComment)}} className={styles.submitComment}>დააკომენტარე</button>        
        </div>
    )
}