import React, { useContext } from 'react'
import {recipecontext } from "../context/RecipeContext"

const Recipies = () => {

  const {data} = useContext(recipecontext);

  const renderRecipe = data.map(recipe => (
    <div key={recipe.id}>
      <h1>{recipe.title}</h1>
    </div>
    ));

  return (
    <div>{renderRecipe}</div>
  )
}

export default Recipies