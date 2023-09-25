import logo from './logo.svg';
import './App.css';

import {motion} from 'framer-motion'

import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

import PostPreview from './components/PostPreview'


function ToggleButtons ({  
    toggledButton,
    handleButtonToggle,
    labels
    }) {
    return (
        <div className="sort-by-container">
            <div className="tri-state-toggle">

                {
                    labels.map ((label, index) => (
                        <button
                            className={`tri-state-toggle-button ${toggledButton === label ? 'active' : ''}`}
                            onClick={() => handleButtonToggle(label)}
                            key={index}
                        >
                            {label}
                        </button>
                    ))
                }

            </div>

        </div>

    )
}

const Posts = (props) => {

    if (props.toggledButton === "Posts") {
        console.log("Showing Posts")
        return (
            props.posts.map((post, index) => {
                return (
                    <PostPreview
                        post={post}
                        addFavoriteId={props.addFavoriteId}
                        removeFavoriteId={props.removeFavoriteId}
                        alreadyFaved={props.favoriteIds.has(post)}
                        key={index}
                    />
                )
            })
        );
    }
    else {
        console.log("Showing Favorites")
        return (
            props.posts.map((post, index) => {
                if (props.favoriteIds.has(post))
                    return (
                        <PostPreview
                            post             = {post}
                            addFavoriteId    = {props.addFavoriteId}
                            removeFavoriteId = {props.removeFavoriteId}
                            alreadyFaved     = {true}
                            key              = {index}
                        />
                    )
                else 
                    return <></>

            })
        )
    }

    
        
}

const Favorites = ({ favoriteIds, addFavoriteId }) => {
    const text = `You have ${favoriteIds.length} Favorite Posts.`;

    return (
        <h3>
            {text}
        </h3>
    )
}

const PostDetails = (props) => {
    return (
        <></>
    );
}

function App() {
    const [toggledButton, setToggledButton] = useState("Posts");
    const [posts, setPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);

    const [favoriteIds, setFavoriteIds] = useState(new Set())

    const addFavoriteId = (newFavoriteId) => {
        setFavoriteIds((prevFavoriteIds) => {
            return prevFavoriteIds.add(newFavoriteId);
        });
    };

    const deleteFavoriteId = (deletedId) => {
        setFavoriteIds((prevFavoriteIds) => {
            return prevFavoriteIds.delete(deletedId);
        });
    };



    useEffect(
        () => {
            fetch('https://jsonplaceholder.typicode.com/posts')
              .then(response => response.json())
              .then(data => {
                setPosts (data)

                console.log("Posts retrieved successfully")
              })
              .catch(error => {
                console.error('Error retrieving posts:', error);
              }); 
        },
        []
    )


    const handleButtonToggle = (segmentName) => {
        setToggledButton(segmentName);
    };
      
    return (
        <div className="App">
          <header className="App-header">
                <ToggleButtons
                    toggledButton      = {toggledButton}
                    handleButtonToggle = {handleButtonToggle}
                    labels             = {["Posts", "Favorites"]}
            />
            
                <h1> {toggledButton} </h1>

                {(toggledButton === "Posts" || toggledButton === "Favorites") && 
                    <Posts
                    toggledButton={toggledButton}
                    posts={posts}
                    favoriteIds={favoriteIds}
                    addFavoriteId={addFavoriteId }
                    />            
                }

                {selectedPostId !== null && 
                    <PostDetails
                    selectedPostId = { selectedPostId}
                    />
                }


          </header>
        </div>
      );
}

export default App;