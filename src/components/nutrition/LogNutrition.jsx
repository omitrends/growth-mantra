import { useState } from 'react';
import './LogNutrition.css';
import Sidebar from '../Sidebar';

const LogNutrition = () => {
  const [mealType, setMealType] = useState('');
  const [foodItem, setFoodItem] = useState('');
  const [calories, setCalories] = useState('');
  const [quantity, setQuantity] = useState('');
  const [meals, setMeals] = useState([]);

  // Meal types and food categories for dropdown menus
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  const foodCategories = ['Fruits', 'Vegetables', 'Grains', 'Proteins', 'Dairy', 'Fats'];

  const addMeal = () => {
    if (foodItem && calories && quantity) {
      const newMeal = {
        id: Date.now(),
        foodItem,
        calories,
        quantity
      };
      setMeals([...meals, newMeal]);
      // Clear inputs after adding
      setFoodItem('');
      setCalories('');
      setQuantity('');
    }
  };

  const handleSubmit = () => {
    if (meals.length > 0 && mealType) {
      // Here you would typically send the data to a server
      alert('Meal logged successfully!');
      // Clear all inputs and meals
      setMealType('');
      setFoodItem('');
      setCalories('');
      setQuantity('');
      setMeals([]);
    } else {
      alert('Please enter meal details and add at least one food item');
    }
  };

  const handleView = () => {
    // This would typically navigate to a view showing all logged meals
    alert('Navigating to meal history');
  };

  return (
    <div className="log-main">
      <Sidebar />
      <div className="log-nutrition">
        <h1 className="log-title">Log Nutrition</h1>

        <div className="dropdown-container">
          <div className="dropdown-field">
            <label>Meal Type</label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
            >
              <option value="">Select Meal Type</option>
              {mealTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="dropdown-field">
            <label>Food Category</label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
            >
              <option value="">Select Food Category</option>
              {foodCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="input-container">
          <div className="input-field">
            <label>Food Item</label>
            <input
              type="text"
              value={foodItem}
              onChange={(e) => setFoodItem(e.target.value)}
              placeholder="E.g., Apple"
            />
          </div>

          <div className="input-field">
            <label>Calories</label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="E.g., 95"
            />
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

        <div className="button-container">
          <button className="add-meal-button" onClick={addMeal}>Add Meal</button>
          <button className="enter-button" onClick={addMeal}>Enter</button>
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
                    <td>{meal.foodItem}</td>
                    <td>{meal.calories}</td>
                    <td>{meal.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="bottom-buttons">
          <button className="nutrition-button submit" onClick={handleSubmit}>Submit</button>
          <button className="nutrition-button view" onClick={handleView}>View</button>
        </div>
      </div>
    </div>
  );
};

export default LogNutrition;