import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import { motion } from 'framer-motion'
import './PostPreviewStyles.css'
import {useState} from 'react'

const AnimatedButton = ({ isFaved, label, handleButtonClick, backgroundColor, textColor}) => (
    <motion.div 
        className="show-more-button-container"
    >
        <button
            className = "mech-button"
            style={{
                background: backgroundColor,
                color: textColor
            }}
            onClick   = {handleButtonClick}
        >
            <span>
                {label}
            </span>
            <i></i>
        </button>

        {isFaved && <FontAwesomeIcon icon={faHeart}/>}

    </motion.div>
)


function PostPreview (props) {
    let title       = props.post.title
    let bodyPreview = `${props.post.body.slice(0, 150)}...`;
    let postId      = props.post.id

    const [isFaved, setIsFaved] = useState(props.alreadyFaved);

    return (
        <motion.div
            className    = {`content-card column`}
            whileHover   = {{ scale: 1.05 }}
        >
            <h3> {title}</h3>
            <p> {bodyPreview} </p>


            <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
            >
                <div className='row centered'>
                    <AnimatedButton
                        label={"Read All"}
                        handleButtonClick= {() => console.log("Opening post:", props.post.title)}
                    />
                    {

                        isFaved
                            ? 
                            <AnimatedButton
                                isFaved={isFaved}
                                label="Remove from favorites"
                                handleButtonClick={() => {
                                    console.log("Removing post from Favorites:", props.post.title);
                                    setIsFaved(false);
                                    props.deleteFavoriteId(props.post.id);
                                    
                                }}
                            />
                            : 
                            <AnimatedButton
                                label="Add to favorites"
                                handleButtonClick={() => {
                                    console.log("Adding post to Favorites:", props.post.title);
                                    setIsFaved(true);
                                    props.addFavoriteId (postId)
                                }}
                            />
                    }

                    
                </div>
                <AnimatedButton
                    label             = {"Comments"}
                    handleButtonClick = {() => console.log("Opening comments to post:", props.post.title)}
                />

            </motion.div>



        </motion.div>

    )
}

export default PostPreview