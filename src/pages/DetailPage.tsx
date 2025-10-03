import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Recipe } from "../types";
import LoadingSpinner from "../components/LoadingSpinner";

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    const fetchRecipe = async () => {
      if (!id) {
        setError("잘못된 레시피 ID입니다.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://dummyjson.com/recipes/${id}`);
        if (!response.ok) {
          throw new Error("레시피를 불러오는 데 실패했습니다.");
        }
        const data: Recipe = await response.json();
        setRecipe(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="page-container">
        <p>{error}</p>
      </div>
    );
  if (!recipe)
    return (
      <div className="page-container">
        <p>레시피를 찾을 수 없습니다.</p>
      </div>
    );

  return (
    <div className="page-container">
      <div className="btn-container">
        <button onClick={() => navigate(-1)} className="back-btn">
          <span>&larr;</span> 뒤로 가기
        </button>
      </div>

      <div className="detail-container">
        <div className="detail-layout">
          <div className="detail-header">
            <div className="detail-image-wrapper">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="detail-image"
              />
            </div>

            <div className="detail-header-info">
              <div className="detail-title-area">
                <h1 className="detail-title">{recipe.name}</h1>
                <span
                  className={`difficulty-badge difficulty-${recipe.difficulty.toLowerCase()}`}
                >
                  {recipe.difficulty}
                </span>
              </div>

              <div className="detail-time-info">
                <p>
                  <strong>요리 종류:</strong> {recipe.cuisine}
                </p>
                <p>
                  <strong>준비 시간:</strong> {recipe.prepTimeMinutes}분
                </p>
                <p>
                  <strong>조리 시간:</strong> {recipe.cookTimeMinutes}분
                </p>
                <p>
                  <strong>제공 인분:</strong> {recipe.servings}인분
                </p>
                <p>
                  <strong>칼로리:</strong> {recipe.caloriesPerServing} kcal
                </p>
              </div>

              {recipe.tags && recipe.tags.length > 0 && (
                <div className="detail-tags">
                  {recipe.tags.map((tag, index) => (
                    <span key={index} className="tag-badge">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="detail-section">
            <h2 className="detail-section-title">재료</h2>
            <div className="ingredients-box">
              <p>
                {recipe.ingredients.map((ingredient, index) => (
                  <span key={index}>
                    • {ingredient}
                    {index < recipe.ingredients.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className="detail-section">
            <h2 className="detail-section-title">조리 방법</h2>
            <ol className="detail-instructions-list">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="detail-instruction-item">
                  <span className="instruction-number">{index + 1}</span>
                  <p>{instruction}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="detail-section">
            <h2 className="detail-section-title">추가 정보</h2>
            <div className="cooking-info">
              <p>
                <strong>난이도:</strong> {recipe.difficulty}
              </p>
              <p>
                <strong>총 조리 시간:</strong>{" "}
                {recipe.prepTimeMinutes + recipe.cookTimeMinutes}분
              </p>
              <p>
                <strong>요리 종류:</strong> {recipe.cuisine}
              </p>
              <p>
                <strong>평점:</strong> ⭐ {recipe.rating || "N/A"}
              </p>
              <p>
                <strong>리뷰 수:</strong> {recipe.reviewCount || "N/A"}개
              </p>
              {recipe.mealType && recipe.mealType.length > 0 && (
                <p>
                  <strong>식사 유형:</strong> {recipe.mealType.join(", ")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
