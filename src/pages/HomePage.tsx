import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Recipe, ApiResponse } from "../types";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";

const RECIPES_PER_PAGE = 12;

const HomePage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      window.scrollTo(0, 0);
      try {
        const skip = (currentPage - 1) * RECIPES_PER_PAGE;
        const response = await fetch(
          `https://dummyjson.com/recipes?limit=${RECIPES_PER_PAGE}&skip=${skip}`
        );
        if (!response.ok) {
          throw new Error("데이터를 불러오는 데 실패했습니다.");
        }
        const data: ApiResponse = await response.json();
        setRecipes(data.recipes);
        setTotalPages(Math.ceil(data.total / RECIPES_PER_PAGE));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading && recipes.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container page-container">
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <Link
            to={`/recipe/${recipe.id}`}
            key={recipe.id}
            style={{ textDecoration: "none" }}
          >
            <RecipeCard recipe={recipe} />
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;
