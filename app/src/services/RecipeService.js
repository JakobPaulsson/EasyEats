import axios from 'axios'

export const fetchRecipes = async (ingredients, page) => {
  const ingredientsQuery = ingredients.map(ing => `ingredients=${ing}`).join('&');
  try {
    const response = await axios.get(`http://localhost:8080/recipes?page=${page}&${ingredientsQuery}`);
    
    if (response.data.length === 0) {
      return 1
    }

    else {
      return response
    }

    }
    catch (error) {
}
}
