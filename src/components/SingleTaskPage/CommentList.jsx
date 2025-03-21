import { useState } from 'react'
import styles from '../../styles/SingleTaskPage/CommentsSection.module.css'
import replyIcon from '../../assets/reply-icon.svg'
import NewComment from './NewComment'

function ReplyList ({replies}) {
    if (!replies || replies.length == 0) return null
    let sorted = [...replies].reverse()
    let list = sorted.map(reply => {
        return <SingleComment 
        key = {reply.id} comment={reply}>
                </SingleComment>
    })

    return (
        <div className={styles.replyList}>
            {list}
        </div>
    )
}



function SingleComment ({comment, submitNewComment}) {

    let {text, author_nickname, author_avatar, parent_id} = comment
    let [replying, setReplying] = useState(false)
    let [newReply, setNewReply] = useState('')
    function handleChange(e) {
        let newValue = e.target.value
        console.log(newValue)
        setNewReply(newValue)
    }
    let newReplySection = () => {
        if (parent_id) {return null}

        const replyTextArea = () => {
            return (
                <div className={styles.textAreaWrapper}>
                    <textarea
                    placeholder='დაწერე კომენტარი' value={newReply || ''}
                    className={styles.newReply} name="newComment" id={`replyComment${comment.id}`}
                    onChange={handleChange}
                    ></textarea>
                    <button onClick={
                        () => {
                            submitNewComment(newReply, comment.id)
                            setNewReply('')
                            setReplying(false)
                            }}  
                        className={styles.submitComment}>
                            დააკომენტარე
                    </button>
                  
                </div>
            )
        }

        const replyButton = () => {
            return (
                <div className={styles.reply} onClick={() => {setReplying(true)}}>
                    <img src={replyIcon} alt="" />
                    უპასუხე
                </div>
            )
        }
        return replying ? replyTextArea() : replyButton()
    }
    return (
        <div className={styles.singleComment}>
            <div className={styles.authorAvatar}>
                <img src={author_avatar} alt="" />
            </div>
            <div className={styles.commentBody}>
                <div className={styles.authorName}>{author_nickname}</div>
                <div className={styles.commentText}>{text}</div>
                {newReplySection()}
                <ReplyList replies={comment.sub_comments}></ReplyList>
            </div>
        </div>
    )
}



export default function CommentList ({comments, submitNewComment}) {
    let list = comments.map(commentObj => {
        return <SingleComment 
                    submitNewComment={submitNewComment} 
                    key = {commentObj.id} comment={commentObj}>

                </SingleComment>
        
    });

    return (
        <div className={styles.commentList}>
            {list}
        </div>
    )
}