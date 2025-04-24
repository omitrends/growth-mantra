import { useState } from 'react';
import './RecommendedNutrition.css';
import React from "react";
import Sidebar from '../Sidebar'; // Corrected the import path for Sidebar

const RecommendedNutrition = () => {
  const [goal, setGoal] = useState('');
  const [dietType, setDietType] = useState('');
  const [mealFrequency, setMealFrequency] = useState('');
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState('');

  // Options for dropdown menus
  const goals = ['Weight Loss', 'Muscle Gain', 'Maintenance'];
  const dietTypes = ['Vegetarian', 'Keto', 'Vegan', 'High Protein'];
  const mealFrequencies = ['3 meals/day', '4 meals/day', '5 meals/day'];

  // Comprehensive nutrition plans for all combinations
  const nutritionPlans = {
    'weight loss': {
      vegan: {
        '3 meals/day': {
          title: 'Vegan Weight Loss Plan (3 meals/day)',
          meals: [
            'Breakfast: Smoothie ,spinach, and banana',
            'Lunch: Oats with chickpeas and mixed greens',
            'Dinner: Dal with rice and salad',
          ],
          snacks: ['Roasted chickpeas and foxnut(Makhana) mix']
        },
        '4 meals/day': {
          title: 'Vegan Muscle Gain Plan (4 meals/day)',
          meals: [
            'Pre Breakfast: Chia pudding and berries',
            'Breakfast: Mixed salad on whole-grain bread',
            'Lunch: Oats with chickpeas and mixed greens',
            'Dinner: Dal with rice and salad',
          ],
          snacks: ['Roasted chickpeas and foxnut(Makhana) mix']
        },
        '5 meals/day': {
          title: 'Vegan Muscle Gain Plan (5 meals/day)',
          meals: [
            'Pre Breakfast: Warm jeera water',
            'Breakfast: Mixed salad on whole-grain bread',
            'Lunch: Oats with chickpeas and mixed greens',
            'Evening Snack: roasted chickpeas with spices',
            'Dinner: Dal with rice and salad',
          ],
          snacks: ['Roasted chickpeas and foxnut(Makhana) mix']
        }
      },
      keto: {
        '3 meals/day': {
          title: 'Keto Weight Loss Plan (3 meals/day)',
          meals: [
            'Breakfast: Paneer bhurji with tomato slices',
            'Lunch: Butter chicken with sautéed vegetables',
            'Dinner: Grilled fish with a side of salad',
          ],
          snacks: ['Cheese cubes', 'Boiled eggs']
        },
        '4 meals/day': {
          title: 'Keto Muscle Gain Plan (4 meals/day)',
          meals: [
            'Pre Breakfast: A glass of coconut water',
            'Breakfast: Masala omelette with cheese',
            'Lunch: Grilled chicken with cauliflower rice',
            'Dinner: Mutton curry with salad',
          ],
          snacks: ['Cheese cubes', 'Boiled eggs']
        },
        '5 meals/day': {
          title: 'Keto Muscle Gain Plan (5 meals/day)',
          meals: [
            'Pre Breakfast: Bulletproof coffee',
            'Breakfast: Keto dosa with coconut chutney',
            'Lunch: Grilled fish with sautéed vegetables',
            'Evening Snack: Paneer cubes with spices',
            'Dinner: Chicken curry with a side of spinach salad',
          ],
          snacks: ['Cheese cubes', 'Boiled eggs']
        }
      },
      vegetarian: {
        '3 meals/day': {
          title: 'Vegetarian Weight Loss Plan (3 meals/day)',
          meals: [
            'Breakfast:Poha with peanuts and a cup of green tea',
            'Lunch:  Dal with steamed rice and a side of cucumber salad',
            'Dinner: Vegetable curry with chapati and sautéed spinach',
          ],
          snacks: ['Vegetable curry with chapati and sautéed spinach']
        },
        '4 meals/day': {
          title: 'Vegetarian Weight Loss Plan (4 meals/day)',
          meals: [
            'Pre Breakfast: A glass of warm lemon water',
            'Breakfast: Idli with coconut chutney and sambar',
            'Lunch: Rajma with brown rice and a side of mixed vegetable salad',
            'Dinner: Palak paneer with chapati and a bowl of curd',
          ],
          snacks: ['Handful of mixed nuts', 'Masala buttermilk']
        },
        '5 meals/day': {
          title: 'Vegetarian Weight Loss Plan (5 meals/day)',
          meals: [
            'Pre Breakfast: A glass of jeera water',
            'Breakfast: Upma with vegetables and a cup of herbal tea',
            'Lunch: Mixed vegetable curry with quinoa and a side of raita',
            'Evening Snack:Sprouts chaat with lemon and spices',
            'Dinner:Moong dal khichdi with a side of steamed vegetables',
          ],
          snacks: ['Fox nuts (makhana)', 'A handful of walnuts']
        }
      },
      "high protein": {
        '3 meals/day': {
          title: 'High Protein Weight Loss Plan (3 meals/day)',
          meals: [
            'Breakfast:  Besan chilla with mint chutney',
            'Lunch:  Grilled chicken with dal and a side of sautéed vegetables',
            'Dinner: Fish curry with rice and a side of steamed carrots',
          ],
          snacks: ['Boiled eggs', 'Paneer tikka']
        },
        '4 meals/day': {
          title: 'High Protein Weight Loss Plan (4 meals/day)',
          meals: [
            'Pre Breakfast:  A glass of warm turmeric milk',
            'Breakfast: Moong dal dosa with coconut chutney',
            'Lunch: Grilled fish with rice and a side of vegetable salad',
            'Dinner: Chicken curry with chapati and sautéed spinach',
          ],
          snacks: ['Boiled eggs', 'Paneer tikka']
        },
        '5 meals/day': {
          title: 'High Protein Weight Loss Plan (5 meals/day)',
          meals: [
            'Pre Breakfast: A glass of amla juice',
            'Breakfast:  Paneer bhurji with multigrain toast',
            'Lunch: Grilled chicken with dal and a side of steamed vegetables',
            'Evening Snack: Boiled chickpeas(Chola) with spices',
            'Dinner:  Egg curry with chapati and a side of sautéed black chana',
          ],
          snacks: ['Boiled eggs', 'Paneer tikka', 'Almonds']
        }
      }
    },
    'muscle gain': {
      "high protein": {
        '3 meals/day': {
          title: 'High Protein Muscle gain Plan (3 meals/day)',
          meals: [
            'Breakfast:  Besan chilla with mint chutney',
            'Lunch:  Grilled chicken with dal and a side of sautéed vegetables',
            'Dinner: Fish curry with rice and a side of steamed carrots',
          ],
          snacks: ['Boiled eggs', 'Paneer tikka']
        },
        '4 meals/day': {
          title: 'High Protein Weight Loss Plan (4 meals/day)',
          meals: [
            'Pre Breakfast:  A glass of warm turmeric milk',
            'Breakfast: Moong dal dosa with coconut chutney',
            'Lunch: Grilled fish with rice and a side of vegetable salad',
            'Dinner: Chicken curry with chapati and sautéed spinach',
          ],
          snacks: ['Boiled eggs', 'Paneer tikka']
        },
        '5 meals/day': {
          title: 'High Protein Weight Loss Plan (5 meals/day)',
          meals: [
            'Pre Breakfast: A glass of amla juice',
            'Breakfast:  Paneer bhurji with multigrain toast',
            'Lunch: Grilled chicken with dal and a side of steamed vegetables',
            'Evening Snack: Boiled chickpeas(Chola) with spices',
            'Dinner:  Egg curry with chapati and a side of sautéed black chana',
          ],
          snacks: ['Boiled eggs', 'Paneer tikka', 'Almonds']
        }
      },
      vegetarian: {
        '3 meals/day': {
          title: 'Vegetarian Muscle Gain Plan (3 meals/day)',
          meals: [
            'Breakfast: Paratha with curd and a glass of lassi',
            'Lunch: Paneer curry with jeera rice and a side of salad',
            'Dinner: Dal makhani with chapati and sautéed vegetables',
          ],
          snacks: ['Banana shake', 'Handful of peanuts']
          
        },
        '4 meals/day': {
          title: 'Vegetarian Muscle Gain Plan (4 meals/day)',
          meals: [
            'Pre Breakfast: A glass of turmeric milk',
            'Breakfast: Masala oats with vegetables',
            'Lunch: Chole with roti and a side of cucumber salad',
            'Dinner: Vegetable biryani with raita',
          ],
          snacks: ['Boiled eggs', 'Trail mix']
        },
        '5 meals/day': {
          title: 'Vegetarian Muscle Gain Plan (5 meals/day)',
          meals: [
            'Pre Breakfast: A glass of warm milk with honey',
            'Breakfast: Idli with sambar and coconut chutney',
            'Lunch: Rajma with steamed rice and a side of salad',
            'Evening Snack: Paneer tikka with mint chutney',
            'Dinner: soya chunks sabji with chapati and sautéed spinach',
          ],
          snacks: ['Protein bar', 'Handful of almonds']
        }
      },
      keto: {
        '3 meals/day': {
          title: 'Keto Muscle Gain Plan (3 meals/day)',
          meals: [
            'Breakfast: Paneer bhurji with tomato slices',
            'Lunch: Butter chicken with sautéed vegetables',
            'Dinner: Grilled fish with a side of salad',
          ],
          snacks: ['Cheese cubes', 'Boiled eggs']
        },
        '4 meals/day': {
          title: 'Keto Muscle Gain Plan (4 meals/day)',
          meals: [
            'Pre Breakfast: A glass of coconut water',
            'Breakfast: Masala omelette with cheese',
            'Lunch: Grilled chicken with cauliflower rice',
            'Dinner: Mutton curry with salad',
          ],
          snacks: ['Cheese cubes', 'Boiled eggs']
        },
        '5 meals/day': {
          title: 'Keto Muscle Gain Plan (5 meals/day)',
          meals: [
            'Pre Breakfast: Bulletproof coffee',
            'Breakfast: Keto dosa with coconut chutney',
            'Lunch: Grilled fish with sautéed vegetables',
            'Evening Snack: Paneer cubes with spices',
            'Dinner: Chicken curry with a side of spinach salad',
          ],
          snacks: ['Cheese cubes', 'Boiled eggs']
        }
      },
      vegan: {
        '3 meals/day': {
          title: 'Vegan Muscle Gain Plan (3 meals/day)',
          meals: [
            'Breakfast: Smoothie ,spinach, and banana',
            'Lunch: Oats with chickpeas and mixed greens',
            'Dinner: Dal with rice and salad',
          ],
          snacks: ['Roasted chickpeas and foxnut(Makhana) mix']
        },
        '4 meals/day': {
          title: 'Vegan Muscle Gain Plan (4 meals/day)',
          meals: [
            'Pre Breakfast: Chia pudding and berries',
            'Breakfast: Mixed salad on whole-grain bread',
            'Lunch: Oats with chickpeas and mixed greens',
            'Dinner: Dal with rice and salad',
          ],
          snacks: ['Roasted chickpeas and foxnut(Makhana) mix']
        },
        '5 meals/day': {
          title: 'Vegan Muscle Gain Plan (5 meals/day)',
          meals: [
            'Pre Breakfast: Warm jeera water',
            'Breakfast: Mixed salad on whole-grain bread',
            'Lunch: Oats with chickpeas and mixed greens',
            'Evening Snack: roasted chickpeas with spices',
            'Dinner: Dal with rice and salad',
          ],
          snacks: ['Roasted chickpeas and foxnut(Makhana) mix']
        }
      }
    },
    maintenance: {
      vegetarian: {
        '3 meals/day': {
          title: 'Vegetarian Maintenance Plan (3 meals/day)',
          meals: [
            'Breakfast: Paratha with curd and a glass of lassi',
            'Lunch: Paneer curry with jeera rice and a side of salad',
            'Dinner: Dal makhani with chapati and sautéed vegetables',
          ],
          snacks: ['Roasted chickpeas and foxnut(Makhana) mix']
        },
        '4 meals/day': {
          title: 'Vegetarian Maintenance Plan (4 meals/day)',
          meals: [
            'Pre Breakfast: A glass of turmeric milk',
            'Breakfast: Masala oats with vegetables',
            'Lunch: Chole with roti and a side of cucumber salad',
            'Dinner: Vegetable biryani with raita',
          ],
          snacks: ['Boiled eggs']
        },
        '5 meals/day': {
          title: 'Vegetarian Maintenance Plan (5 meals/day)',
          meals: [
            'Pre Breakfast: A glass of warm milk with honey',
            'Breakfast: Idli with sambar and coconut chutney',
            'Lunch: Rajma with steamed rice and a side of salad',
            'Evening Snack: Paneer tikka with mint chutney',
            'Dinner: Dal tadka with chapati and sautéed spinach',
          ],
          snacks: [ 'Handful of almonds']
        }
      },
      keto: {
        '3 meals/day': {
          title: 'Keto Maintenance Plan (3 meals/day)',
          meals: [
            'Breakfast: Paneer bhurji with tomato slices',
            'Lunch: Butter chicken with sautéed vegetables',
            'Dinner: Grilled fish with a side of spinach salad',
          ],
          snacks: ['Hard-boiled eggs']
        },
        '4 meals/day': {
          title: 'Keto Maintenance Plan (4 meals/day)',
          meals: [
            'Pre Breakfast: A glass of coconut water',
            'Breakfast: Masala omelette with cheese',
            'Lunch: Grilled chicken with cauliflower rice',
            'Dinner: Mutton curry with sautéed green beans',
          ],
          snacks: ['Cheese cubes']
        },
        '5 meals/day': {
          title: 'Keto Maintenance Plan (5 meals/day)',
          meals: [
            'Pre Breakfast: Bulletproof coffee',
            'Breakfast: Keto dosa with coconut chutney',
            'Lunch: Grilled fish with sautéed vegetables',
            'Evening Snack: Paneer cubes with spices',
            'Dinner: Chicken curry with a side of spinach salad',
          ],
          snacks: ['Cheese cubes', 'Hard-boiled eggs']
        }
      },
      vegan: {
        '3 meals/day': {
          title: 'Vegan Maintenance Plan (3 meals/day)',
          meals: [
            'Breakfast: Smoothie with, spinach, and banana',
            'Lunch: Oats with chickpeas and mixed greens',
            'Dinner: Dal with rice and salad',
          ],
          
          snacks: ['Roasted chickpeas and foxnut(Makhana) mix']
        },
        '4 meals/day': {
          title: 'Vegan Maintenance Plan (4 meals/day)',
          meals: [
            'Pre Breakfast: Chia pudding and berries',
            'Breakfast: Mixed salad on whole-grain bread',
            'Lunch: Oats with chickpeas and mixed greens',
            'Dinner: Dal with rice and salad',
          ],
          snacks: ['Roasted chickpeas and foxnut(Makhana) mix']
        },
        '5 meals/day': {
          title: 'Vegan Maintenance Plan (5 meals/day)',
          meals: [
            'Pre Breakfast: Warm jeera water',
            'Breakfast: Mixed salad on whole-grain bread',
            'Lunch: Oats with chickpeas and mixed greens',
            'Evening Snack: roasted chickpeas with spices',
            'Dinner: Dal with rice and salad',
          ],
          snacks: ['Handful of nuts']
        }
      },
      "high protein": {
        '3 meals/day': {
          title: 'High Protein Maintenance Plan (3 meals/day)',
          meals: [
            'Breakfast: Besan chilla with mint chutney',
            'Lunch: Grilled chicken with dal and a side of sautéed vegetables',
            'Dinner: Fish curry with rice and a side of salad',
          ],
          snacks: ['Protein shake', 'Boiled eggs']
        },
        '4 meals/day': {
          title: 'High Protein Maintenance Plan (4 meals/day)',
          meals: [
            'Pre Breakfast: A glass of warm turmeric milk',
            'Breakfast: Moong dal dosa with coconut chutney',
            'Lunch: Grilled fish with quinoa and a side of vegetable salad',
            'Dinner: Chicken curry with chapati and sautéed spinach',
          ],
          snacks: ['Protein shake', 'Boiled eggs']
        },
        '5 meals/day': {
          title: 'High Protein Maintenance Plan (5 meals/day)',
          meals: [
            'Pre Breakfast: A glass of amla juice',
            'Breakfast: Paneer bhurji with multigrain toast',
            'Lunch: Grilled chicken with dal and a side of steamed vegetables',
            'Evening Snack: Boiled chickpeas with spices',
            'Dinner: Egg curry with chapati and a side of sautéed black chana',
          ],
          snacks: ['Protein shake', 'Boiled eggs']
        }
      }
    }
  };

  const getRecommendation = () => {
    const selectedGoal = goal.toLowerCase();
    const selectedDiet = dietType.toLowerCase();

    if (
      nutritionPlans[selectedGoal] &&
      nutritionPlans[selectedGoal][selectedDiet] &&
      nutritionPlans[selectedGoal][selectedDiet][mealFrequency]
    ) {
      setRecommendation(nutritionPlans[selectedGoal][selectedDiet][mealFrequency]);
      setError('');
    } else {
      setRecommendation({
        title: 'Custom Nutrition Plan',
        message: `We don't have an exact match for a ${goal} ${dietType} plan with ${mealFrequency} in our database yet. Please contact our nutritionist for a personalized plan.`
      });
      setError('No exact match found. Showing a generic recommendation.');
    }

    setShowRecommendation(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (goal && dietType && mealFrequency) {
      getRecommendation();
    } else {
      setError('Please select all options to get a recommendation.');
    }
  };

  const handleReset = () => {
    setGoal('');
    setDietType('');
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
          Find the perfect nutrition plan based on your goals and preferences
        </p>

        {error && <p className="error-message">{error}</p>}

        {!showRecommendation ? (
          <form className="nutrition-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Goal</label>
              <select 
                value={goal} 
                onChange={(e) => setGoal(e.target.value)} 
                required
              >
                <option value="">Select Goal</option>
                {goals.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

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
              <label>Meal Frequency</label>
              <select 
                value={mealFrequency} 
                onChange={(e) => setMealFrequency(e.target.value)} 
                required
              >
                <option value="">Select Meal Frequency</option>
                {mealFrequencies.map((freq) => (
                  <option key={freq} value={freq}>{freq}</option>
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
                <div className="meal-plan">
                  <h3>Meals</h3>
                  <ul className="meal-list">
                    {recommendation.meals.map((meal, index) => (
                      <li key={index}>{meal}</li>
                    ))}
                  </ul>
                  <h3>Snacks</h3>
                  <ul className="snack-list">
                    {recommendation.snacks.map((snack, index) => (
                      <li key={index}>{snack}</li>
                    ))}
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