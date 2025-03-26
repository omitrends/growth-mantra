import { useState, useEffect } from "react";
import "./LogNutrition.css";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router";
import React from "react";
import axios from "axios";

const LogNutrition = () => {
  const [email, setEmail] = useState("");
  const [mealType, setMealType] = useState(""); // Matches `meal_type` in the database
  const [foodCategory, setFoodCategory] = useState(""); // Matches `category` in the database
  const [foodItem, setFoodItem] = useState(""); // Matches `food_name` in the database
  const [calories, setCalories] = useState(""); // Matches `calories_per_unit` in the database
  const [quantity, setQuantity] = useState(""); // Matches `quantity` in the database
  const [meals, setMeals] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [foodDatabase, setFoodDatabase] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Fetch user email from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Logout function
  const logout = () => {
    localStorage.removeItem("email");
    navigate("/login");
  };

  // Fetch food items from the database when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/search-food") // Replace with your actual API endpoint
      .then((response) => {
        console.log("Fetched food database:", response.data); // Debugging log
        setFoodDatabase(response.data);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });
  }, []);

  // Handle food input changes and filter suggestions
  const handleFoodInput = async (value) => {
    setFoodItem(value);
    setErrorMessage("");
  
    if (value.trim() === "") {
      setSuggestions([]); // Clear suggestions if the input is empty
      return;
    }
  
    try {
      const response = await axios.get("http://localhost:5000/search-food", {
        params: { q: value }, // Pass the search query as a parameter
      });
  
      const filteredSuggestions = response.data;
  
      if (filteredSuggestions.length === 0) {
        setErrorMessage("Food item not found in database.");
      }
  
      setSuggestions(filteredSuggestions);
    } catch (error) {
      console.error("Error fetching food suggestions:", error);
      setErrorMessage("Error fetching food suggestions.");
    }
  };

  // Handle food selection and auto-fill calories
  const handleFoodSelect = (selectedFood) => {
    setFoodItem(selectedFood.food_name);
    setCalories(selectedFood.calories_per_unit * (quantity || 1)); // Calculate calories based on quantity
    setSuggestions([]);
    setActiveIndex(-1);
    setErrorMessage("");
  };

  // Recalculate calories when quantity changes
  useEffect(() => {
    if (foodItem && suggestions.length > 0) {
      const selectedFood = suggestions.find((food) => food.food_name === foodItem);
      if (selectedFood) {
        setCalories(selectedFood.calories_per_unit * (quantity || 1));
      }
    }
  }, [quantity, foodItem, suggestions]);

  // Handle keyboard navigation in the dropdown
  const handleKeyDown = (e) => {
    if (suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        setActiveIndex((prevIndex) =>
          prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (e.key === "ArrowUp") {
        setActiveIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      } else if (e.key === "Enter" && activeIndex >= 0) {
        handleFoodSelect(suggestions[activeIndex]);
      }
    }
  };

  // Add a meal to the meals list
  const addMeal = () => {
    if (foodItem && calories && quantity) {
      const newMeal = { id: Date.now(), food_name: foodItem, calories, quantity };
      setMeals([...meals, newMeal]);
      setFoodItem("");
      setCalories("");
      setQuantity("");
    } else {
      alert("Please fill in all fields before adding a meal.");
    }
  };

  // Submit the meals to the backend
  const handleSubmit = async () => {
    if (meals.length > 0 && mealType && foodCategory) {
      try {
        const storedEmail = localStorage.getItem("email");
        const userResponse = await axios.get("http://localhost:5000/get-user-id", {
          params: { email: storedEmail },
        });
  
        const UserId = userResponse.data.UserId;
  
        console.log("Submitting data:", {
          UserId,
          meal_type: mealType,
          category: foodCategory,
          items: meals,
        }); // Debugging log
  
        await axios.post("http://localhost:5000/log-meal", {
          UserId,
          meal_type: mealType,
          category: foodCategory,
          items: meals,
        });
  
        alert("Meal logged successfully!");
        setMealType("");
        setFoodCategory("");
        setFoodItem("");
        setCalories("");
        setQuantity("");
        setMeals([]);
      } catch (error) {
        console.error("Error logging meal:", error);
        alert("Failed to log meal. Please try again.");
      }
    } else {
      alert("Please enter meal details and add at least one food item.");
    }
  };

  // Navigate to the Nutrition History page
  const handleView = () => {
    navigate("/nutrition-history");
  };

  return (
    <div className="log-main">
      <Sidebar />
      <div className="log-nutrition">
        <h1 className="log-title">Log Nutrition</h1>

        <div className="dropdown-container">
          <div className="dropdown-field">
            <label>Meal Type</label>
            <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
              <option value="">Select Meal Type</option>
              {["Breakfast", "Lunch", "Dinner", "Snack"].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="dropdown-field">
            <label>Food Category</label>
            <select
              value={foodCategory}
              onChange={(e) => setFoodCategory(e.target.value)}
            >
              <option value="">Select Food Category</option>
              {["Fruits", "Vegetables", "Grains", "Proteins", "Dairy", "Fats"].map(
                (category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                )
              )}
            </select>
          </div>

          <button className="add-meal-button" onClick={addMeal}>
            Add Meal
          </button>
        </div>

        <div className="input-container">
          <div className="input-field">
            <label>Food Item</label>
            <input
              type="text"
              value={foodItem}
              onChange={(e) => handleFoodInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type to search..."
            />

{suggestions.length > 0 && (
  <ul className="suggestions-dropdown">
    {suggestions.map((food, index) => (
      <li
        key={food.food_name}
        className={index === activeIndex ? "active" : ""}
        onMouseEnter={() => setActiveIndex(index)}
        onClick={() => handleFoodSelect(food)}
      >
        {food.food_name} ({food.calories_per_unit} kcal)
      </li>
    ))}
  </ul>
)}

{errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>

          <div className="input-field">
            <label>Calories per unit</label>
            <input type="number" value={calories} readOnly placeholder="Auto-filled" />
          </div>

          <div className="input-field">
            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="E.g., 1"
            />
          </div>
        </div>

        {meals.length > 0 && (
          <div className="meals-container">
            <h2>Meals</h2>
            <table className="meals-table">
              <thead>
                <tr>
                  <th>Food Item</th>
                  <th>Calories</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {meals.map((meal) => (
                  <tr key={meal.id}>
                    <td>{meal.food_name}</td>
                    <td>{meal.calories}</td>
                    <td>{meal.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="bottom-buttons">
          <button className="nutrition-button submit" onClick={handleSubmit}>
            Submit
          </button>
          <button className="nutrition-button view" onClick={handleView}>
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogNutrition;