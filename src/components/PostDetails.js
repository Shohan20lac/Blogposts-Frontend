import React from 'react';
import {motion} from 'framer-motion'
import './PostPreviewStyles.css'
import './PostDetailsStyles.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
};

const iconStyle = {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: 'black',
};

const countStyle = {
    fontSize: '1rem',
    color: 'black',
};

const commentStyle = {
    borderBottom: '1px solid #ddd',
    padding: '10px 0',
    display: 'flex',            // Align items horizontally and vertically
    justifyContent: 'center',
    alignItems: 'center',
};


function CommentCounter ({ count }) {
    
    return (
        <div style = {containerStyle}>
            <FontAwesomeIcon icon={faComment} style={iconStyle} />
            <span style={countStyle}>{count}</span>
        </div>
    );
}



function BackButton({ onClick }) {
    return <button onClick={onClick}>Back</button>
}

function Comments({ comments }) {
    return (
        <div>

            <div className="card comment">
                <ul>
                    {comments.map((comment) => (
                        
                        <div style={commentStyle}>
                            <div className="row">
                                <FontAwesomeIcon icon={faComment} style={iconStyle} />
                                <div className="column">
                                    <p className='comment-title'>{comment.name}</p>
                                    <p className='comment-body'>{comment.body}</p>
                                </div>
                            </div>
                        </div>
                        
                    ))}
                </ul>
            </div>
        </div>
    );
}

function PostDetails({ post, comments, onBackClick }) {
    return (
        <>
            <motion.div className={`content-card column`}>
                <BackButton onClick={onBackClick} />
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <CommentCounter count={comments.length}/>
                <Comments comments={comments} />
            </motion.div>

            <Comments comments={comments} />
            
        </>
    );
}

export default PostDetails;