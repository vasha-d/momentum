import { useState } from 'react'
import styles from '../../styles/SingleTaskPage/CommentsSection.module.css'
import { postNewComment } from '../../api/post'
import { useGetComments } from '../../api/getHooks'
import CommentList from './CommentList'
import NewComment from './NewComment'






export default function CommentsSection ({taskID}) {


    const [newComment, setNewComment] = useState(null)
    const [refresh, setRefresh] = useState(null)
    let {comments, loading} = useGetComments(taskID, refresh)



    function handleChange(e) {
        let newValue = e.target.value
        setNewComment(newValue)
    }

    function submitNewComment(newText, parent_id = null)  {
        let newCommentObj = {
            text: newText,
            parent_id: parent_id
        }   
        console.log(newCommentObj)
        postNewComment(newCommentObj, taskID).then(() => { 
            setRefresh(refresh => !refresh)
        })
        setRefresh(refresh => !refresh)
    }
    function numberOfComments() {
        let n = comments.length
        comments.forEach(comment => {
            n += comment.sub_comments.length
        });

        return n
    }

    if (loading) {return <>Loading...</>}
    return (
        <div className={styles.commentsSectionWrapper}>
            <div className={styles.commentsSection}>

                <NewComment newComment={newComment} handleChange={handleChange} submitNewComment={submitNewComment} ></NewComment>
                <div className={styles.commentsWrapper}>
                    <div className={styles.commentsHeader}>
                        კომენტარები
                        <span className={styles.commentsNumber}>{numberOfComments()}</span>
                    </div>
                    <CommentList submitNewComment = {submitNewComment} comments={comments}></CommentList>
                </div>
            </div>
        </div>
    )
}