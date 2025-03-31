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
      vegetarian: {
        '3 meals/day': {
          title: 'Vegetarian Weight Loss Plan (3 meals/day)',
          meals: [
            'Breakfast: Greek yogurt with granola and fresh fruit',
            'Lunch: Grilled tofu salad with olive oil dressing',
            'Dinner: Lentil soup with steamed broccoli and quinoa',
          ],
          snacks: ['Carrot sticks with hummus', 'Apple slices with almond butter']
        },
        '4 meals/day': {
          title: 'Vegetarian Weight Loss Plan (4 meals/day)',
          meals: [
            'Pre Breakfast: Cottage cheese with pineapple',
            'Breakfast: Scrambled eggs with spinach and whole-grain toast',
            'Lunch: Chickpea wrap with avocado and mixed greens',
            'Dinner: Grilled paneer with roasted sweet potatoes and asparagus',
          ],
          snacks: ['Handful of mixed nuts', 'Greek yogurt with honey']
        },
        '5 meals/day': {
          title: 'Vegetarian Weight Loss Plan (5 meals/day)',
          meals: [
            'Pre Breakfast: Smoothie with protein powder and spinach',
            'Breakfast: Smoothie with spinach, banana, and almond milk',
            'Lunch: Grilled halloumi with quinoa and roasted vegetables',
            'Evening Snack: Hummus with cucumber slices',
            'Dinner: Baked tofu with steamed green beans and brown rice',
          ],
          snacks: ['Trail mix', 'Handful of almonds']
        }
      },
      "high protein": {
        '3 meals/day': {
          title: 'High Protein Weight Loss Plan (3 meals/day)',
          meals: [
            'Breakfast: Egg white omelette with turkey bacon',
            'Lunch: Grilled chicken breast with quinoa and steamed broccoli',
            'Dinner: Baked salmon with sweet potato and asparagus',
          ],
          snacks: ['Protein shake', 'Boiled eggs']
        },
        '4 meals/day': {
          title: 'High Protein Weight Loss Plan (4 meals/day)',
          meals: [
            'Pre Breakfast: Greek yogurt with berries',
            'Breakfast: Protein pancakes with almond butter',
            'Lunch: Grilled steak with brown rice and green beans',
            'Dinner: Chicken stir-fry with mixed vegetables and jasmine rice',
          ],
          snacks: ['Greek yogurt with honey', 'Peanut butter on celery sticks']
        },
        '5 meals/day': {
          title: 'High Protein Weight Loss Plan (5 meals/day)',
          meals: [
            'Pre Breakfast: Protein smoothie with spinach and banana',
            'Breakfast: Smoothie with protein powder, oats, and banana',
            'Lunch: Grilled turkey burger with avocado and sweet potato fries',
            'Evening Snack: Cottage cheese with pineapple',
            'Dinner: Lean beef chili with kidney beans and cornbread',
          ],
          snacks: ['Protein bar', 'Cottage cheese with pineapple', 'Almonds']
        }
      }
    },
    'muscle gain': {
      vegetarian: {
        '3 meals/day': {
          title: 'Vegetarian Muscle Gain Plan (3 meals/day)',
          meals: [
            'Breakfast: Scrambled eggs with whole-grain toast and avocado',
            'Lunch: Grilled paneer with brown rice and steamed broccoli',
            'Dinner: Lentil curry with mixed vegetables and quinoa',
          ],
          snacks: ['Protein shake', 'Greek yogurt with granola']
        },
        '4 meals/day': {
          title: 'Vegetarian Muscle Gain Plan (4 meals/day)',
          meals: [
            'Pre Breakfast: Overnight oats with chia seeds',
            'Breakfast: Protein pancakes with banana and peanut butter',
            'Lunch: Grilled tofu with sweet potatoes and asparagus',
            'Dinner: Chickpea curry with basmati rice and spinach',
          ],
          snacks: ['Boiled eggs', 'Trail mix', 'Cottage cheese']
        },
        '5 meals/day': {
          title: 'Vegetarian Muscle Gain Plan (5 meals/day)',
          meals: [
            'Pre Breakfast: Smoothie with protein powder and spinach',
            'Breakfast: Smoothie with protein powder, oats, and berries',
            'Lunch: Grilled halloumi sandwich with avocado and whole-grain bread',
            'Evening Snack: Greek yogurt with honey and nuts',
            'Dinner: Grilled paneer with mashed potatoes and green beans',
          ],
          snacks: ['Protein bar', 'Peanut butter on rice cakes', 'Almonds']
        }
      },
      keto: {
        '3 meals/day': {
          title: 'Keto Muscle Gain Plan (3 meals/day)',
          meals: [
            'Breakfast: Scrambled eggs with cheese and avocado',
            'Lunch: Grilled chicken Caesar salad (no croutons)',
            'Dinner: Pan-seared salmon with zucchini noodles',
          ],
          snacks: ['Hard-boiled eggs', 'Cheese sticks']
        },
        '4 meals/day': {
          title: 'Keto Muscle Gain Plan (4 meals/day)',
          meals: [
            'Pre Breakfast: Greek yogurt with chia seeds',
            'Breakfast: Omelette with spinach and feta cheese',
            'Lunch: Grilled steak with sautéed mushrooms and asparagus',
            'Dinner: Roasted chicken thighs with cauliflower mash',
          ],
          snacks: ['Avocado slices', 'Pork rinds']
        },
        '5 meals/day': {
          title: 'Keto Muscle Gain Plan (5 meals/day)',
          meals: [
            'Pre Breakfast: Bulletproof coffee',
            'Breakfast: Keto pancakes with butter and sugar-free syrup',
            'Lunch: Grilled salmon with avocado salad',
            'Evening Snack: Celery sticks with cream cheese',
            'Dinner: Beef stir-fry with broccoli and coconut oil',
          ],
          snacks: ['Macadamia nuts', 'Cheddar cheese cubes', 'Olives']
        }
      },
      vegan: {
        '3 meals/day': {
          title: 'Vegan Muscle Gain Plan (3 meals/day)',
          meals: [
            'Breakfast: Smoothie with almond milk, spinach, and banana',
            'Lunch: Quinoa salad with chickpeas and mixed greens',
            'Dinner: Lentil curry with steamed broccoli and brown rice',
          ],
          snacks: ['Carrot sticks with hummus', 'Apple slices with almond butter']
        },
        '4 meals/day': {
          title: 'Vegan Muscle Gain Plan (4 meals/day)',
          meals: [
            'Pre Breakfast: Chia pudding with almond milk and berries',
            'Breakfast: Avocado toast on whole-grain bread',
            'Lunch: Grilled vegetable wrap with hummus',
            'Dinner: Stir-fried tofu with mixed vegetables and quinoa',
          ],
          snacks: ['Trail mix', 'Vegan protein bar']
        },
        '5 meals/day': {
          title: 'Vegan Muscle Gain Plan (5 meals/day)',
          meals: [
            'Pre Breakfast: Smoothie with almond milk, spinach, and protein powder',
            'Breakfast: Oatmeal with almond butter and fresh fruit',
            'Lunch: Buddha bowl with quinoa, roasted vegetables, and tahini dressing',
            'Evening Snack: Celery sticks with almond butter',
            'Dinner: Vegan chili with kidney beans and cornbread',
          ],
          snacks: ['Handful of nuts', 'Vegan yogurt with granola']
        }
      }
    },
    maintenance: {
      vegetarian: {
        '3 meals/day': {
          title: 'Vegetarian Maintenance Plan (3 meals/day)',
          meals: [
            'Breakfast: Greek yogurt with granola and fresh fruit',
            'Lunch: Grilled tofu sandwich with a side salad',
            'Dinner: Baked cod with roasted vegetables and wild rice',
          ],
          snacks: ['Hummus with carrot sticks', 'Handful of trail mix']
        },
        '4 meals/day': {
          title: 'Vegetarian Maintenance Plan (4 meals/day)',
          meals: [
            'Pre Breakfast: Overnight oats with chia seeds',
            'Breakfast: Smoothie with spinach, banana, and almond milk',
            'Lunch: Grilled paneer Caesar wrap with whole-grain tortilla',
            'Dinner: Roasted tofu with mashed potatoes and green beans',
          ],
          snacks: ['Boiled eggs', 'Apple slices with peanut butter']
        },
        '5 meals/day': {
          title: 'Vegetarian Maintenance Plan (5 meals/day)',
          meals: [
            'Pre Breakfast: Protein smoothie with spinach and banana',
            'Breakfast: Scrambled eggs with avocado and whole-grain toast',
            'Lunch: Grilled halloumi with quinoa and roasted vegetables',
            'Evening Snack: Greek yogurt with honey and nuts',
            'Dinner: Chickpea stir-fry with brown rice and broccoli',
          ],
          snacks: ['Protein shake', 'Cottage cheese with pineapple', 'Trail mix']
        }
      },
      keto: {
        '3 meals/day': {
          title: 'Keto Maintenance Plan (3 meals/day)',
          meals: [
            'Breakfast: Scrambled eggs with cheese and avocado',
            'Lunch: Grilled chicken Caesar salad (no croutons)',
            'Dinner: Pan-seared salmon with zucchini noodles',
          ],
          snacks: ['Hard-boiled eggs', 'Cheese sticks']
        },
        '4 meals/day': {
          title: 'Keto Maintenance Plan (4 meals/day)',
          meals: [
            'Pre Breakfast: Greek yogurt with chia seeds',
            'Breakfast: Omelette with spinach and feta cheese',
            'Lunch: Grilled steak with sautéed mushrooms and asparagus',
            'Dinner: Roasted chicken thighs with cauliflower mash',
          ],
          snacks: ['Avocado slices', 'Pork rinds']
        },
        '5 meals/day': {
          title: 'Keto Maintenance Plan (5 meals/day)',
          meals: [
            'Pre Breakfast: Bulletproof coffee',
            'Breakfast: Keto pancakes with butter and sugar-free syrup',
            'Lunch: Grilled salmon with avocado salad',
            'Evening Snack: Celery sticks with cream cheese',
            'Dinner: Beef stir-fry with broccoli and coconut oil',
          ],
          snacks: ['Macadamia nuts', 'Cheddar cheese cubes', 'Olives']
        }
      },
      vegan: {
        '3 meals/day': {
          title: 'Vegan Maintenance Plan (3 meals/day)',
          meals: [
            'Breakfast: Smoothie with almond milk, spinach, and banana',
            'Lunch: Quinoa salad with chickpeas and mixed greens',
            'Dinner: Lentil curry with steamed broccoli and brown rice',
          ],
          snacks: ['Carrot sticks with hummus', 'Apple slices with almond butter']
        },
        '4 meals/day': {
          title: 'Vegan Maintenance Plan (4 meals/day)',
          meals: [
            'Pre Breakfast: Chia pudding with almond milk and berries',
            'Breakfast: Avocado toast on whole-grain bread',
            'Lunch: Grilled vegetable wrap with hummus',
            'Dinner: Stir-fried tofu with mixed vegetables and quinoa',
          ],
          snacks: ['Trail mix', 'Vegan protein bar']
        },
        '5 meals/day': {
          title: 'Vegan Maintenance Plan (5 meals/day)',
          meals: [
            'Pre Breakfast: Smoothie with almond milk, spinach, and protein powder',
            'Breakfast: Oatmeal with almond butter and fresh fruit',
            'Lunch: Buddha bowl with quinoa, roasted vegetables, and tahini dressing',
            'Evening Snack: Celery sticks with almond butter',
            'Dinner: Vegan chili with kidney beans and cornbread',
          ],
          snacks: ['Handful of nuts', 'Vegan yogurt with granola']
        }
      },
      "high protein": {
        '3 meals/day': {
          title: 'High Protein Maintenance Plan (3 meals/day)',
          meals: [
            'Breakfast: Egg white omelette with turkey bacon',
            'Lunch: Grilled chicken breast with quinoa and roasted vegetables',
            'Dinner: Baked salmon with sweet potato and steamed broccoli',
          ],
          snacks: ['Protein shake', 'Boiled eggs']
        },
        '4 meals/day': {
          title: 'High Protein Maintenance Plan (4 meals/day)',
          meals: [
            'Pre Breakfast: Greek yogurt with berries',
            'Breakfast: Protein pancakes with almond butter',
            'Lunch: Grilled steak with brown rice and green beans',
            'Dinner: Chicken stir-fry with mixed vegetables and jasmine rice',
          ],
          snacks: ['Greek yogurt with honey', 'Peanut butter on celery sticks']
        },
        '5 meals/day': {
          title: 'High Protein Maintenance Plan (5 meals/day)',
          meals: [
            'Pre Breakfast: Protein smoothie with spinach and banana',
            'Breakfast: Smoothie with protein powder, oats, and banana',
            'Lunch: Grilled turkey burger with avocado and sweet potato fries',
            'Evening Snack: Cottage cheese with pineapple',
            'Dinner: Lean beef chili with kidney beans and cornbread',
          ],
          snacks: ['Protein bar', 'Cottage cheese with pineapple', 'Almonds']
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