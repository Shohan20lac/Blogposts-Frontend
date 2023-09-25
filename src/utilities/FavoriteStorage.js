export const saveFavorites = (favoriteIds) => {
  try {
    localStorage.setItem('favoriteIds', JSON.stringify(Array.from(favoriteIds)));
    console.log('Favorites saved to local storage.');
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

// Load favorites from local storage
export const loadFavorites = () => {
  try {
    const storedFavoriteIds = localStorage.getItem('favoriteIds');
    if (storedFavoriteIds) {
      const favoriteIds = new Set(JSON.parse(storedFavoriteIds));
      console.log('Favorites loaded from local storage.');
      return favoriteIds;
    }
  } catch (error) {
    console.error('Error loading favorites:', error);
  }

  // If no favorites found or an error occurred, return an empty Set
  return new Set();
};