import {motion} from 'framer-motion'
import './PostPreviewStyles.css'


const AnimatedButton = ({ label, handleButtonClick, backgroundColor, textColor}) => (
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

    </motion.div>
)


function PostPreview (props) {
    let title       = props.post.title
    let bodyPreview = `${props.post.body.slice(0, 150)}...`;
    let postId      = props.post.postId


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
                    <AnimatedButton
                        label={"Add to Favorites"}
                        handleButtonClick={() => {
                            console.log("Adding post to Favorites:", props.post.title);
                            props.addFavoriteId (postId);
                        }}
                    />
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