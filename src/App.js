import logo from './logo.svg';
import './App.css';

import {motion} from 'framer-motion'

import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

import PostPreview from './components/PostPreview'
import PostDetails from './components/PostDetails'
import {saveFavorites, loadFavorites } from './utilities/FavoriteStorage'

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

                let alreadyFaved;
                if (props.favoriteIds.has(post.id))
                    alreadyFaved = true
                else
                    alreadyFaved = false

                return (
                    <PostPreview
                        post={post}
                        layoutStyle       = {props.toggledStyle}
                        addFavoriteId     = {props.addFavoriteId}
                        deleteFavoriteId  = {props.deleteFavoriteId}
                        alreadyFaved      = {alreadyFaved}
                        setSelectedPostId = {props.setSelectedPostId}
                        key               = {index}
                    />
                )
            })
        );
    }
    else {
        console.log ("Showing Favorites")
        return (
            props.posts.map ((post, index) => {
                if (props.favoriteIds.has(post.id))
                    return (
                        <PostPreview
                            post={post}
                            addFavoriteId={props.addFavoriteId}
                            deleteFavoriteId={props.deleteFavoriteId}
                            alreadyFaved={true}
                            setSelectedPostId={props.setSelectedPostId}
                            key={index}
                            layoutStyle={props.toggledStyle}
                        />
                    )
                else 
                    return <></>

            })
        )
    }    
}

function App() {
    const [toggledButton, setToggledButton] = useState("Posts");
    const [toggledStyle, setToggledStyle] = useState("Cards");

    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    const [selectedPostId, setSelectedPostId] = useState(null);

    const [favoriteIds, setFavoriteIds] = useState(new Set())
    const [favoritesCount, setFavoritesCount] = useState(0);


    const addFavoriteId = (newFavoriteId) => {
        setFavoriteIds((prevFavoriteIds) => {
            const newFavoriteIds = new Set(prevFavoriteIds);
            newFavoriteIds.add(newFavoriteId);
            saveFavorites(newFavoriteIds);
            return newFavoriteIds;
        });
    };

    const deleteFavoriteId = (deletedId) => {
        setFavoriteIds((prevFavoriteIds) => {
            const newFavoriteIds = new Set(prevFavoriteIds);
            newFavoriteIds.delete(deletedId);
            saveFavorites(newFavoriteIds);
            return newFavoriteIds;
        });
    };

    useEffect (
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



            fetch('https://jsonplaceholder.typicode.com/comments')
                .then((response) => response.json())
                .then((data) => {
                    setComments(data);
                    console.log("Comments retrieved successfully");
                })
                .catch((error) => {
                    console.error('Error retrieving comments:', error);
                });

            setFavoriteIds(loadFavorites());

            setFavoritesCount(favoriteIds.size)
        },
        []
    )

    useEffect(
        () => {
            setFavoritesCount(favoriteIds.size)
        },
        [favoriteIds]
    )


    const handleButtonToggle = (segmentName) => { 
        setToggledButton(segmentName);
    };

    const handleStyleToggle = (styleName) => {
        setToggledStyle(styleName)
    }


    const HeaderLabel = () => {
        if (selectedPostId !== null)
            return <h1>Post Details</h1>
        else if (toggledButton === "Favorites")
            return <h1>Favorites({favoritesCount})</h1>
        else
            return <h1> {toggledButton} </h1>
    }
      
    return (
        <div className="App">
          <header className="App-header">
                <ToggleButtons
                    toggledButton      = {toggledButton}
                    handleButtonToggle = {handleButtonToggle}
                    labels             = {["Posts", "Favorites"]}
                />

                <div className="column">
                    <HeaderLabel/>
                    <ToggleButtons
                        toggledButton={toggledStyle}
                        handleButtonToggle={handleStyleToggle}
                        labels={["Cards", "Titles Only"]}
                    />
                </div>

                {
                    (selectedPostId === null &&
                        (toggledButton === "Posts" || toggledButton === "Favorites")
                    )
                    && 
                    <Posts
                        toggledButton     = {toggledButton}
                        toggledStyle      = {toggledStyle}
                        posts             = {posts}
                        favoriteIds       = {favoriteIds}
                        addFavoriteId     = {addFavoriteId}
                        deleteFavoriteId  = {deleteFavoriteId}
                        setSelectedPostId = {setSelectedPostId }
                    />
                }

                {selectedPostId !== null && 
                    <PostDetails
                        post              = {posts[selectedPostId]}
                        comments          = {comments}
                        setSelectedPostId = {setSelectedPostId}
                        onBackClick       = {() => setSelectedPostId(null)}
                    />
                }


          </header>
        </div>
      );
}

export default App;