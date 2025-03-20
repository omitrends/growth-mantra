import { useState } from 'react';
import './RecommendedNutrition.css';
import Sidebar from './Sidebar';

const RecommendedNutrition = () => {
  const [dietType, setDietType] = useState('');
  const [goal, setGoal] = useState('');
  const [mealFrequency, setMealFrequency] = useState('');
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState('');

  // Options for dropdown menus
  const dietTypes = ['Balanced', 'Keto', 'Vegan', 'Low-Carb', 'High-Protein', 'Mediterranean'];
  const goals = ['Weight Loss', 'Muscle Gain', 'Maintenance', 'Improved Health'];
  const mealFrequencies = [
    { value: '3', label: '3 Meals per Day' },
    { value: '4', label: '4 Meals per Day' },
    { value: '5', label: '5 Meals per Day' },
    { value: '6', label: '6 Meals per Day' }
  ];

  // Sample nutrition plans - in a real app, these would come from a database
  const nutritionPlans = {
    balanced: {
      weightLoss: {
        '3': {
          title: 'Balanced Weight Loss Plan (3 Meals)',
          frequency: '3 meals per day',
          meals: [
            'Breakfast: Oatmeal with berries and a boiled egg',
            'Lunch: Grilled chicken salad with olive oil dressing',
            'Dinner: Baked salmon with steamed vegetables'
          ]
        },
        '5': {
          title: 'Balanced Weight Loss Plan (5 Meals)',
          frequency: '5 meals per day',
          meals: [
            'Breakfast: Greek yogurt with honey and nuts',
            'Snack: Apple slices with almond butter',
            'Lunch: Quinoa salad with chickpeas and avocado',
            'Snack: Carrot sticks with hummus',
            'Dinner: Grilled turkey with roasted sweet potatoes'
          ]
        }
      },
      muscleGain: {
        '4': {
          title: 'Balanced Muscle Gain Plan (4 Meals)',
          frequency: '4 meals per day',
          meals: [
            'Breakfast: Scrambled eggs with whole-grain toast',
            'Lunch: Grilled chicken with brown rice and broccoli',
            'Snack: Protein shake with banana',
            'Dinner: Beef stir-fry with quinoa'
          ]
        }
      }
    },
    keto: {
      weightLoss: {
        '3': {
          title: 'Keto Weight Loss Plan (3 Meals)',
          frequency: '3 meals per day',
          meals: [
            'Breakfast: Avocado and eggs with bacon',
            'Lunch: Grilled salmon with asparagus',
            'Dinner: Chicken thighs with cauliflower rice'
          ]
        }
      }
    },
    vegan: {
      improvedHealth: {
        '4': {
          title: 'Vegan Health Plan (4 Meals)',
          frequency: '4 meals per day',
          meals: [
            'Breakfast: Smoothie with spinach, banana, and almond milk',
            'Lunch: Lentil soup with whole-grain bread',
            'Snack: Mixed nuts and dried fruit',
            'Dinner: Stir-fried tofu with mixed vegetables'
          ]
        }
      }
    }
  };

  const getRecommendation = () => {
    // Convert diet type and goal to lowercase for object keys
    const diet = dietType.toLowerCase();
    const nutritionGoal = goal.toLowerCase().replace(' ', '');

    // If we have a plan that matches the user's criteria
    if (
      nutritionPlans[diet] &&
      nutritionPlans[diet][nutritionGoal] &&
      nutritionPlans[diet][nutritionGoal][mealFrequency]
    ) {
      setRecommendation(nutritionPlans[diet][nutritionGoal][mealFrequency]);
      setError('');
    } else {
      // If no exact match, return a generic response
      setRecommendation({
        title: 'Custom Nutrition Plan',
        message: `We don't have an exact match for a ${dietType} ${goal} ${mealFrequency}-meal plan in our database yet. Please contact our nutritionist for a personalized plan.`
      });
      setError('No exact match found. Showing a generic recommendation.');
    }

    setShowRecommendation(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dietType && goal && mealFrequency) {
      getRecommendation();
    } else {
      setError('Please select all options to get a recommendation.');
    }
  };

  const handleReset = () => {
    setDietType('');
    setGoal('');
    setMealFrequency('');
    setShowRecommendation(false);
    setRecommendation(null);
    setError('');
  };

  return (
    <div className='main-rec'>
      <Sidebar />
      <div className="recommended-nutrition">
        <h1 className="recommended-title">Recommended Nutrition Plans</h1>
        <p className="recommended-subtitle">
          Find the perfect nutrition plan based on your preferences and goals
        </p>

        {error && <p className="error-message">{error}</p>}

        {!showRecommendation ? (
          <form className="nutrition-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Diet Type</label>
              <select
                value={dietType}
                onChange={(e) => setDietType(e.target.value)}
                required
              >
                <option value="">Select Diet Type</option>
                {dietTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                required
              >
                <option value="">Select Goal</option>
                {goals.map((goal) => (
                  <option key={goal} value={goal}>{goal}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Meal Frequency</label>
              <select
                value={mealFrequency}
                onChange={(e) => setMealFrequency(e.target.value)}
                required
              >
                <option value="">Select Frequency</option>
                {mealFrequencies.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="recommend-button">Get Recommendations</button>
          </form>
        ) : (
          <div className="recommendation-results">
            {recommendation.message ? (
              <div className="generic-recommendation">
                <h2>{recommendation.title}</h2>
                <p>{recommendation.message}</p>
              </div>
            ) : (
              <div className="specific-recommendation">
                <h2>{recommendation.title}</h2>
                <p className="recommendation-frequency"><strong>Frequency:</strong> {recommendation.frequency}</p>

                {recommendation.meals && (
                  <div className="nutrition-details">
                    <h3>Meal Plan</h3>
                    <ul className="meal-list">
                      {recommendation.meals.map((meal, index) => (
                        <li key={index}>{meal}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="recommendation-tips">
                  <h3>Tips</h3>
                  <ul>
                    <li>Stay hydrated throughout the day</li>
                    <li>Include a variety of foods to ensure balanced nutrition</li>
                    <li>Monitor portion sizes to align with your goals</li>
                    <li>Consult a nutritionist for personalized advice</li>
                  </ul>
                </div>
              </div>
            )}

            <button onClick={handleReset} className="reset-button">
              Find Another Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendedNutrition;