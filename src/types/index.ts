// API 응답 데이터 구조에 맞춘 타입들을 정의합니다.
export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

export interface ApiResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}
