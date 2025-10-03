import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Recipe } from "../types";
import LoadingSpinner from "../components/LoadingSpinner";

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      setIsLoading(true);
      window.scrollTo(0, 0);
      try {
        const response = await fetch(`https://dummyjson.com/recipes/${id}`);
        if (!response.ok) {
          throw new Error("레시피 정보를 불러오는 데 실패했습니다.");
        }
        const data: Recipe = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error(error);
        navigate("/"); // 에러 발생 시 홈으로 이동
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id, navigate]);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    if (recipe) {
      const target = e.target as HTMLImageElement;
      target.onerror = null;
      target.src = `https://placehold.co/800x600/f87171/white?text=${encodeURIComponent(
        recipe.name
      )}`;
    }
  };

  if (isLoading || !recipe) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container page-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        <span>&larr;</span> 목록으로 돌아가기
      </button>

      <div className="detail-container">
        <div className="detail-grid">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="detail-image"
            onError={handleImageError}
          />
          <div className="detail-content">
            <p className="detail-cuisine">
              {recipe.cuisine} / {recipe.difficulty}
            </p>
            <h1 className="detail-title">{recipe.name}</h1>

            <div className="detail-meta">
              <span className="detail-meta-item">
                🕒 총 {recipe.prepTimeMinutes + recipe.cookTimeMinutes}분
              </span>
              <span className="detail-meta-item">🍽️ {recipe.servings}인분</span>
              <span className="detail-meta-item">
                🔥 {recipe.caloriesPerServing} kcal
              </span>
            </div>

            <div className="detail-section">
              <h2 className="detail-section-title">재료</h2>
              <ul className="detail-ingredients-list">
                {recipe.ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div style={{ padding: "2rem", backgroundColor: "#f9fafb" }}>
          <h2 className="detail-section-title">만드는 방법</h2>
          <ol className="detail-instructions-list">
            {recipe.instructions.map((item, index) => (
              <li key={index} className="detail-instruction-item">
                <span className="instruction-number">{index + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
