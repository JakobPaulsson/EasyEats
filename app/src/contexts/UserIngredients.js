import { createContext, useState, useMemo, useContext, useEffect } from "react";

const defaultContext = {
  userIngredients: [],
  addIngredient: () => {},
  removeIngredient: (title) => {},
};

const RecipeContext = createContext(defaultContext);

const UserIngredients = ({ children }) => {
  const [userIngredients, setUserRecipes] = useState([]);

  const contextValue = useMemo(() => {
    const addIngredient = () => {
      setUserRecipes([...userIngredients, defaultContext.userIngredients]);
    };

    const removeIngredient = (title) => {
      if (userIngredients)
        setUserRecipes(userIngredients.filter((i) => i !== title));
    };

    return {
      userIngredients,
      addIngredient,
      removeIngredient,
    };
  }, [userIngredients]);

  return (
    <RecipeContext.Provider value={{ contextValue }}>
      {children}
    </RecipeContext.Provider>
  );
};

export default UserIngredients;
