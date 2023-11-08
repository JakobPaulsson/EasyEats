import axios from 'axios';
import './App.css'
import { useState, useEffect } from 'react';


function App() {
  const [page, setPage] = useState(0);
  const [recipes, setRecipes] = useState(null)

  useEffect(() => {
    getRecipes(1);
  }, []);

  async function getRecipes(amount) {
    let ingredients = ['flour', 'egg', 'sugar'] // TODO: This should be based on ingredients specified by the user
    let ingredientsQuery = ''
    for (var ingredient of ingredients) {
      ingredientsQuery += `ingredients=${ingredient}&`
    }
    ingredientsQuery = ingredientsQuery.slice(0, -1)
    const hasItems = await axios.get(`http://localhost:8080/recipes?page=${page + amount}&${ingredientsQuery}`).then((response) => {
      let children = []
      if (response.data.length == 0) {
        return false
      }
      for (var recipe of response.data) {
        children.push(
          <div key={recipe.Title} className="card">
            <div className="title">{recipe['Title']}</div>
            <div className="cardContainer">
              <img className="image" src={recipe['ImageSrc']} alt='' />
              <div className="completenessContainer">
                <div className="completeness">Ingredients</div>
              </div>
            </div>
          </div>)
      }
      setRecipes(children);
      return true
    })
    if (hasItems && (page != 1 || amount != -1)) {
      setPage(page + amount);
    }
    
  }

  return (
    <div className="container">
      <div className="buttonNavigationContainer">
        <button className="button" onClick={() => {
          getRecipes(-1)
        }}>{`Previous Page`}
        </button>
        <div>{`Page ${page}`}</div>
        <button className="button" onClick={() => {
          getRecipes(1)
        }}>{`Next Page`}
        </button>
      </div>
      <div className="cardsContainer">
        {recipes ?
          recipes :
          null}
      </div>
    </div>
  );
}

export default App;
