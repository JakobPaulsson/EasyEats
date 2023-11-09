import axios from 'axios';
import './Recipes.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Recipe from '../components/Recipe.js';

function Recipes() {
  const {pageNumber} = useParams();
  const [page, setPage] = useState(pageNumber);
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, [page]); 

  const navigateToRecipe = (recipe) => {
    console.log(recipe)
    navigate(`/recipes/${encodeURIComponent(recipe.Title)}`, {state: {recipe}});
  }

  const fetchRecipes = async () => {
    const ingredients = ['milk', 'egg']; // This should be dynamic based on user input
    const ingredientsQuery = ingredients.map(ing => `ingredients=${ing}`).join('&');
    
    try {
      const response = await axios.get(`http://localhost:8080/recipes?page=${page}&${ingredientsQuery}`);
      
      if (response.data.length === 0) {
        // Handle no recipes found, possibly reset to first page or show a message
      } else {
        const recipeElements = response.data.map(recipe => (
          <div key={recipe.Title} className="card">
            <div className="title">{recipe['Title']}</div>
            <div className="cardContainer">
              <img onClick={() => navigateToRecipe(recipe)} className="image" src={recipe['ImageSrc']} alt='' />
              <div className="completenessContainer">
                <div className="completeness">Ingredients</div>
              </div>
            </div>
          </div>
        ));
        setRecipes(recipeElements);
      }
    } catch (error) {
      // Handle error, possibly show a message to the user
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0) { 
      setPage(newPage)
      navigate(`/recipes/page/${newPage}`) ;
    }
  };

  return (
    <div className="container">
      {currentRecipe ? (
        <Recipe recipe={currentRecipe}/>
      ) : (
        <>
          <div className="cardsContainer">
            {recipes.length > 0 ? recipes : <p>No recipes found.</p>}
          </div>
          <div className="buttonNavigationContainer">
            <button className="button" onClick={() => handlePageChange(page - 1)}>
              Previous Page
            </button>
            <div>{`Page ${page}`}</div>
            <button className="button" onClick={() => handlePageChange(page + 1)}>
              Next Page
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Recipes;

