import axios from 'axios';
import './Recipes.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Recipe from '../components/Recipe.js';
function Recipes() {
  const {pageNumber} = useParams();
  const [page, setPage] = useState(pageNumber); 
  const ingredients = ['milk', 'egg']; // This should be dynamic based on user input
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
  const loadRecipes = async () => {
    try {
      const ingredientsQuery = ingredients.map(ing => `ingredients=${ing}`).join('&');
      const response = await axios.get(`http://localhost:8080/recipes?page=${page}&${ingredientsQuery}`);
      if (response && response.data) {
        setRecipes(response.data);
      } else {
        setRecipes([]); 
      }
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
      setRecipes([]); 
    }
  };
  loadRecipes();
}, [page]); // Add ingredients to the dependency array

  useEffect(() => {
      setPage(pageNumber)
  },[pageNumber])

  const navigateToRecipe = (recipe) => {
    navigate(`/recipes/${encodeURIComponent(recipe.Title)}`, {state: {recipe}});
  }

  const recipeElements =  recipes.map(recipe => (
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

  const handlePageChange = (newPage) => {
    if (newPage > 0) { 
      console.log(newPage)
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
            {recipeElements.length > 0 ? recipeElements : <p>No recipes found.</p>}
          </div>
          <div className="buttonNavigationContainer">
            <button className="button" onClick={() => handlePageChange(+page - 1)}>
              Previous Page
            </button>
            <div>{`Page ${page}`}</div>
            <button className="button" onClick={() => handlePageChange(+page + 1)}>
              Next Page
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Recipes;

