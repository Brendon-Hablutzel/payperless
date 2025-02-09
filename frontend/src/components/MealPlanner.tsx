import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Recipe {
  id: number;
  name: string;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}

interface MealSuggestion {
  id: number;
  name: string;
  image: string;
  description: string;
}

interface MealPlannerProps {
  onClose: () => void;
}

const MealPlanner = ({ onClose }: MealPlannerProps) => {
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedDescriptions, setEditedDescriptions] = useState<Record<number, string>>({});
  const [savedRecipeIds, setSavedRecipeIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('savedRecipes');
    return saved ? JSON.parse(saved).map((r: Recipe) => r.id) : [];
  });

  // Mock meal suggestions based on common grocery items
  const mealSuggestions: MealSuggestion[] = [
    {
      id: 1,
      name: "Mediterranean Salad",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300",
      description: "Fresh salad with vegetables, olives, and feta cheese"
    },
    {
      id: 2,
      name: "Breakfast Power Bowl",
      image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=300",
      description: "Nutritious bowl with eggs, vegetables, and whole grains"
    },
    {
      id: 3,
      name: "Veggie Stir Fry",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300",
      description: "Quick and healthy vegetable stir fry"
    }
  ];

  const handleEdit = (id: number) => {
    setEditingId(id);
    if (!editedDescriptions[id]) {
      setEditedDescriptions(prev => ({
        ...prev,
        [id]: mealSuggestions.find(s => s.id === id)?.description || ''
      }));
    }
  };

  const handleSave = (id: number) => {
    setEditingId(null);
  };

  const handleDescriptionChange = (id: number, value: string) => {
    setEditedDescriptions(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Mock recipe generation
  const generateRecipe = (suggestion: MealSuggestion) => {
    const recipes: Record<number, Recipe> = {
      1: {
        id: 1,
        name: "Mediterranean Salad",
        image: suggestion.image,
        description: editedDescriptions[suggestion.id] || suggestion.description,
        ingredients: [
          "2 cups mixed salad greens",
          "1 cucumber, diced",
          "1 cup cherry tomatoes, halved",
          "1/2 red onion, thinly sliced",
          "1/2 cup Kalamata olives",
          "1/2 cup crumbled feta cheese",
          "2 tablespoons olive oil",
          "1 tablespoon balsamic vinegar",
          "Salt and pepper to taste"
        ],
        instructions: [
          "Wash and prepare all vegetables",
          "In a large bowl, combine salad greens, cucumber, tomatoes, and red onion",
          "Add olives and feta cheese",
          "Drizzle with olive oil and balsamic vinegar",
          "Season with salt and pepper",
          "Toss gently and serve immediately"
        ]
      },
      2: {
        id: 2,
        name: "Breakfast Power Bowl",
        image: suggestion.image,
        description: editedDescriptions[suggestion.id] || suggestion.description,
        ingredients: [
          "2 eggs",
          "1 cup cooked quinoa",
          "1 cup baby spinach",
          "1 avocado, sliced",
          "Cherry tomatoes",
          "Salt and pepper to taste",
          "Hot sauce (optional)"
        ],
        instructions: [
          "Cook quinoa according to package instructions",
          "Poach or fry eggs to your liking",
          "In a bowl, arrange quinoa as the base",
          "Add spinach and sliced avocado",
          "Top with eggs and cherry tomatoes",
          "Season with salt and pepper",
          "Add hot sauce if desired"
        ]
      },
      3: {
        id: 3,
        name: "Veggie Stir Fry",
        image: suggestion.image,
        description: editedDescriptions[suggestion.id] || suggestion.description,
        ingredients: [
          "2 cups mixed vegetables (broccoli, carrots, snap peas)",
          "2 cloves garlic, minced",
          "1 tablespoon ginger, minced",
          "2 tablespoons soy sauce",
          "1 tablespoon sesame oil",
          "Cooked rice for serving"
        ],
        instructions: [
          "Heat sesame oil in a large wok or skillet",
          "Add minced garlic and ginger, sauté until fragrant",
          "Add vegetables and stir-fry until crisp-tender",
          "Add soy sauce and toss to combine",
          "Serve hot over rice"
        ]
      }
    };

    setSelectedRecipe({
      ...recipes[suggestion.id],
      description: editedDescriptions[suggestion.id] || suggestion.description
    });
  };

  const saveRecipe = (recipe: Recipe) => {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    const isAlreadySaved = savedRecipes.some((r: Recipe) => r.id === recipe.id);
    
    if (!isAlreadySaved) {
      const recipeToSave = {
        ...recipe,
        savedAt: new Date().toISOString()
      };
      const newSavedRecipes = [...savedRecipes, recipeToSave];
      localStorage.setItem('savedRecipes', JSON.stringify(newSavedRecipes));
      setSavedRecipeIds(prev => [...prev, recipe.id]);
      alert('Recipe saved to your collection!');
    } else {
      alert('This recipe is already in your collection!');
    }
  };

  const goToSavedRecipes = () => {
    onClose();
    navigate('/saved-recipes');
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Meal Suggestions</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {!selectedRecipe ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mealSuggestions.map((suggestion) => (
                <div 
                  key={suggestion.id}
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img 
                    src={suggestion.image} 
                    alt={suggestion.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{suggestion.name}</h3>
                    {editingId === suggestion.id ? (
                      <div className="space-y-2">
                        <div className="bg-blue-50 p-3 rounded-md">
                          <label className="block text-sm font-medium text-blue-700 mb-1">
                            Customize your meal description:
                          </label>
                          <textarea
                            value={editedDescriptions[suggestion.id] || suggestion.description}
                            onChange={(e) => handleDescriptionChange(suggestion.id, e.target.value)}
                            className="w-full p-2 border rounded-md text-sm"
                            rows={3}
                            placeholder="Enter custom description..."
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleSave(suggestion.id)}
                            className="px-4 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Save Changes
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-gray-600">
                          {editedDescriptions[suggestion.id] || suggestion.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <button
                            onClick={() => handleEdit(suggestion.id)}
                            className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors flex items-center gap-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            Customize Meal
                          </button>
                          <button
                            onClick={() => generateRecipe(suggestion)}
                            className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                            </svg>
                            Generate Recipe
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <img 
                  src={selectedRecipe.image} 
                  alt={selectedRecipe.name}
                  className="w-full md:w-1/3 h-64 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">{selectedRecipe.name}</h3>
                    {savedRecipeIds.includes(selectedRecipe.id) ? (
                      <button
                        onClick={goToSavedRecipes}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                        </svg>
                        View in My Recipes
                      </button>
                    ) : (
                      <button
                        onClick={() => saveRecipe(selectedRecipe)}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                        </svg>
                        Save Recipe
                      </button>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{selectedRecipe.description}</p>
                  
                  <h4 className="font-semibold text-lg mb-2">Ingredients:</h4>
                  <ul className="list-disc list-inside mb-4">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-gray-700">{ingredient}</li>
                    ))}
                  </ul>

                  <h4 className="font-semibold text-lg mb-2">Instructions:</h4>
                  <ol className="list-decimal list-inside">
                    {selectedRecipe.instructions.map((instruction, index) => (
                      <li key={index} className="text-gray-700 mb-2">{instruction}</li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Back to Suggestions
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealPlanner; 