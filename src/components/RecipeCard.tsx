import React from "react";
import type { Recipe } from "../types";

interface Props {
  recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }) => {
  const difficultyClass = {
    Easy: "difficulty-easy",
    Medium: "difficulty-medium",
    Hard: "difficulty-hard",
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = `https://placehold.co/600x400/f87171/white?text=${encodeURIComponent(
      recipe.name
    )}`;
  };

  return (
    <div className="card">
      <div className="card-image-wrapper">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="card-image"
          onError={handleImageError}
        />
      </div>
      <div className="card-content">
        <span className="card-cuisine">{recipe.cuisine}</span>
        <h3 className="card-title">{recipe.name}</h3>
        <div className="card-footer">
          <span
            className={`card-difficulty ${difficultyClass[recipe.difficulty]}`}
          >
            {recipe.difficulty}
          </span>
          <span>⭐ {recipe.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
