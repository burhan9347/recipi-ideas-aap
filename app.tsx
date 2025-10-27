import { useState } from "react";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

function App() {
  const [ingredient, setIngredient] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [error, setError] = useState("");

  const fetchMeals = async () => {
    if (!ingredient.trim()) {
      setError("Please enter an ingredient.");
      setMeals([]);
      return;
    }

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const data = await res.json();
      if (data.meals) {
        setMeals(data.meals);
        setError("");
      } else {
        setMeals([]);
        setError("No meals found for that ingredient.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🍳 Recipe Ideas</h1>

      <div className="flex justify-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter an ingredient (e.g., chicken)"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          className="px-4 py-2 border rounded w-64"
        />
        <button
          onClick={fetchMeals}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div
            key={meal.idMeal}
            className="bg-white rounded shadow p-4 flex flex-col items-center"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold mb-2 text-center">
              {meal.strMeal}
            </h3>
            <a
              href={`https://www.themealdb.com/meal/${meal.idMeal}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Recipe
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
