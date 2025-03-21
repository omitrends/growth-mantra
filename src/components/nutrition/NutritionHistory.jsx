import { useState, useEffect } from 'react';
import './NutritionHistory.css';
import Sidebar from '../Sidebar';
import React from "react";


const NutritionHistory = () => {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [filter, setFilter] = useState({
    mealType: '',
    foodCategory: '',
    dateRange: 'all'
  });

  // Meal types and food categories for filter dropdowns
  const mealTypes = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack'];
  const foodCategories = ['All', 'Fruits', 'Vegetables', 'Grains', 'Proteins', 'Dairy', 'Fats'];
  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: '3months', label: 'Last 3 Months' }
  ];

  // Mock data - in a real app, this would come from an API or local storage
  useEffect(() => {
    // Simulate fetching data
    const mockMeals = [
      {
        id: 1,
        date: '2025-03-18',
        mealType: 'Breakfast',
        foodCategory: 'Fruits',
        items: [
          { foodItem: 'Apple', calories: '95', quantity: '1' },
          { foodItem: 'Oatmeal', calories: '150', quantity: '1 bowl' }
        ]
      },
      {
        id: 2,
        date: '2025-03-15',
        mealType: 'Lunch',
        foodCategory: 'Proteins',
        items: [
          { foodItem: 'Grilled Chicken', calories: '200', quantity: '150g' },
          { foodItem: 'Quinoa', calories: '120', quantity: '1 cup' }
        ]
      },
      {
        id: 3,
        date: '2025-03-10',
        mealType: 'Dinner',
        foodCategory: 'Vegetables',
        items: [
          { foodItem: 'Steamed Broccoli', calories: '55', quantity: '1 cup' },
          { foodItem: 'Salmon', calories: '250', quantity: '200g' }
        ]
      },
      {
        id: 4,
        date: '2025-03-05',
        mealType: 'Snack',
        foodCategory: 'Dairy',
        items: [
          { foodItem: 'Greek Yogurt', calories: '100', quantity: '1 cup' },
          { foodItem: 'Almonds', calories: '150', quantity: '1 oz' }
        ]
      },
      {
        id: 5,
        date: '2025-02-28',
        mealType: 'Breakfast',
        foodCategory: 'Grains',
        items: [
          { foodItem: 'Whole Grain Toast', calories: '80', quantity: '2 slices' },
          { foodItem: 'Avocado', calories: '120', quantity: '1/2' }
        ]
      }
    ];

    setMeals(mockMeals);
    setFilteredMeals(mockMeals);
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...meals];

    // Filter by meal type
    if (filter.mealType && filter.mealType !== 'All') {
      result = result.filter(meal => meal.mealType === filter.mealType);
    }

    // Filter by food category
    if (filter.foodCategory && filter.foodCategory !== 'All') {
      result = result.filter(meal => meal.foodCategory === filter.foodCategory);
    }

    // Filter by date range
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
        const mealDate = new Date(meal.date);
        return mealDate >= startDate && mealDate <= today;
      });
    }

    setFilteredMeals(result);
  }, [filter, meals]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Format date
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
            filteredMeals.map((meal) => (
              <div key={meal.id} className="meal-card">
                <div className="meal-header">
                  <div className="meal-date">{formatDate(meal.date)}</div>
                  <div className="meal-badges">
                    <span className="meal-type-badge">{meal.mealType}</span>
                    <span className="meal-category-badge">{meal.foodCategory}</span>
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
                      {meal.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.foodItem}</td>
                          <td>{item.calories}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      ))}
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
          <button className="nutrition-button export">Export Data</button>
        </div>
      </div>
    </div>
  );
};

export default NutritionHistory;