import { useState } from 'react';

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
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

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

  // Mock recipe generation
  const generateRecipe = (suggestion: MealSuggestion) => {
    const recipes: Record<number, Recipe> = {
      1: {
        id: 1,
        name: "Mediterranean Salad",
        image: suggestion.image,
        description: suggestion.description,
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
        description: suggestion.description,
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
        description: suggestion.description,
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

    setSelectedRecipe(recipes[suggestion.id]);
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
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => generateRecipe(suggestion)}
                >
                  <img 
                    src={suggestion.image} 
                    alt={suggestion.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{suggestion.name}</h3>
                    <p className="text-gray-600">{suggestion.description}</p>
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
                  <h3 className="text-2xl font-bold mb-4">{selectedRecipe.name}</h3>
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
              <button
                onClick={() => setSelectedRecipe(null)}
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Back to Suggestions
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealPlanner; 