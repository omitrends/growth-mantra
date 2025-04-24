import { useState, useEffect } from 'react';
import './NutritionHistory.css';
import Sidebar from '../Sidebar';
import React from "react";
import axios from "axios";

const NutritionHistory = () => {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [filter, setFilter] = useState({
    mealType: '',
    foodCategory: '',
    dateRange: 'all'
  });

  const mealTypes = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack'];
  const foodCategories = ['All', 'Fruits', 'Vegetables', 'Grains', 'Proteins', 'Dairy', 'Fats'];
  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: '3months', label: 'Last 3 Months' }
  ];

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const storedEmail = localStorage.getItem("email");
        if (!storedEmail) {
          alert("User not logged in.");
          return;
        }

        // Fetch UserId based on email
        const userResponse = await axios.get("http://localhost:5000/get-user-id", {
          params: { email: storedEmail },
        });

        const UserId = userResponse.data.UserId;

        // Fetch all logged meals for the user
        const response = await axios.get(`http://localhost:5000/logged-meals/${UserId}`);
        setMeals(response.data.meals);
        setFilteredMeals(response.data.meals);
      } catch (error) {
        console.error("Error fetching meals:", error);
        alert("Failed to fetch meals. Please try again.");
      }
    };

    fetchMeals();
  }, []);

  useEffect(() => {
    let result = [...meals];

    if (filter.mealType && filter.mealType !== 'All') {
      result = result.filter(meal => meal.meal_type === filter.mealType);
    }

    if (filter.foodCategory && filter.foodCategory !== 'All') {
      result = result.filter(meal => meal.category === filter.foodCategory);
    }

    if (filter.dateRange !== 'all') {
      const today = new Date();
      let startDate = new Date();

      switch (filter.dateRange) {
        case 'week':
          startDate.setDate(today.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(today.getMonth() - 1);
          break;
        case '3months':
          startDate.setMonth(today.getMonth() - 3);
          break;
        default:
          break;
      }

      result = result.filter(meal => {
        const mealDate = new Date(meal.FoodDate);
        return mealDate >= startDate && mealDate <= today;
      });
    }

    setFilteredMeals(result);
  }, [filter, meals]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="history-main">
      <Sidebar />

      <div className="nutrition-history">
        <h1 className="history-title">Nutrition History</h1>

        <div className="filter-container">
          <div className="filter-field">
            <label>Meal Type</label>
            <select
              name="mealType"
              value={filter.mealType}
              onChange={handleFilterChange}
            >
              <option value="">All Types</option>
              {mealTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label>Food Category</label>
            <select
              name="foodCategory"
              value={filter.foodCategory}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              {foodCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label>Date Range</label>
            <select
              name="dateRange"
              value={filter.dateRange}
              onChange={handleFilterChange}
            >
              {dateRanges.map((range) => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="meals-container">
          {filteredMeals.length > 0 ? (
            filteredMeals.map((meal, index) => (
              <div key={index} className="meal-card">
                <div className="meal-header">
                  <div className="meal-date">{formatDate(meal.FoodDate)}</div>
                  <div className="meal-badges">
                    <span className="meal-type-badge">{meal.meal_type}</span>
                    <span className="meal-category-badge">{meal.category}</span>
                  </div>
                </div>
                <div className="meal-details">
                  <table className="history-items-table">
                    <thead>
                      <tr>
                        <th>Food Item</th>
                        <th>Calories</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{meal.food_name}</td>
                        <td>{meal.calories}</td>
                        <td>{meal.quantity}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          ) : (
            <div className="no-meals">
              <p>No meals found matching your filters.</p>
            </div>
          )}
        </div>

        <div className="bottom-buttons">
          <button className="nutrition-button back" onClick={() => window.history.back()}>Back</button>
          {/* <button className="nutrition-button export">Export Data</button> */}
        </div>
      </div>
    </div>
  );
};

export default NutritionHistory;