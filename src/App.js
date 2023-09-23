import logo from './logo.svg';
import './App.css';

import {motion} from 'framer-motion'

import React from 'react'
import {useState, useEffect} from 'react'

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
                        >
                            {label}
                        </button>
                    ))
                }

            </div>

        </div>

    )
}

const Posts = ({posts, addFavoriteId}) => (
    posts.map((post, index) => (
        <PostPreview
            post={post}
            addFavoriteId={addFavoriteId}
        />
    ))
        
);

const Favorites = ({ favoriteIds, addFavoriteId }) => {
    const text = `You have ${favoriteIds.length} Favorite Posts.`;

    return (
        <h3>
            {text}
        </h3>
    )
}


function App() {
    const [posts, setPosts] = useState([]);

    const [favoriteIds, setFavoriteId] = useState([]);

    const addFavoriteId = (newFavorite) => {
        setFavoriteId((prevFavorites) => [...prevFavorites, newFavorite]);
    };

    useEffect(
        () => {
            fetch('https://jsonplaceholder.typicode.com/posts')
              .then(response => response.json())
              .then(data => {
                setPosts (data)

                data.forEach (post => {
                  console.log(post.title);
                });
              })
              .catch(error => {
                console.error('Error:', error);
              }); 
        },
        []
    )

    const [toggledButton, setToggledButton] = useState("Posts");

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

                {toggledButton === "Posts" && <Posts posts={posts} addFavoriteId={addFavoriteId} />}
                {toggledButton === "Favorites" && <Favorites favoriteIds={favoriteIds}  />}

          </header>
        </div>
      );
}

export default App;