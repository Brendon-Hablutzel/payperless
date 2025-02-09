import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface Recipe {
  id: number;
  name: string;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  author: {
    id: number;
    name: string;
    ecoScore: number;
    recipesCount: number;
  };
  likes: number;
  cookTime: string;
  cuisine: string;
  tags: string[];
}

const mockCommunityRecipes: Recipe[] = [
  {
    id: 1,
    name: "Mediterranean Quinoa Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
    description: "A healthy and colorful quinoa bowl packed with Mediterranean flavors",
    ingredients: [
      "1 cup quinoa",
      "2 cups cherry tomatoes",
      "1 cucumber",
      "1/2 red onion",
      "1 cup kalamata olives",
      "200g feta cheese",
      "Extra virgin olive oil",
      "Fresh lemon juice"
    ],
    instructions: [
      "Cook quinoa according to package instructions",
      "Chop vegetables into bite-sized pieces",
      "Combine all ingredients in a large bowl",
      "Drizzle with olive oil and lemon juice",
      "Season with salt and pepper to taste"
    ],
    author: {
      id: 1,
      name: "Sarah Green",
      ecoScore: 850,
      recipesCount: 15
    },
    likes: 342,
    cookTime: "25 mins",
    cuisine: "Mediterranean",
    tags: ["Vegetarian", "Healthy", "Quick"]
  },
  {
    id: 2,
    name: "Spicy Thai Basil Stir-Fry",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500",
    description: "A flavorful and aromatic Thai stir-fry with fresh basil",
    ingredients: [
      "400g chicken breast",
      "4 cloves garlic",
      "3 Thai chilies",
      "2 cups Thai basil leaves",
      "2 tbsp soy sauce",
      "1 tbsp fish sauce",
      "1 tbsp oyster sauce",
      "Vegetable oil"
    ],
    instructions: [
      "Slice chicken into thin pieces",
      "Mince garlic and chilies",
      "Heat oil in a wok over high heat",
      "Stir-fry chicken until cooked through",
      "Add sauces and aromatics",
      "Finish with fresh basil leaves"
    ],
    author: {
      id: 2,
      name: "Mike Chen",
      ecoScore: 620,
      recipesCount: 8
    },
    likes: 289,
    cookTime: "20 mins",
    cuisine: "Thai",
    tags: ["Spicy", "Asian", "Quick"]
  },
  {
    id: 3,
    name: "Classic Tiramisu",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500",
    description: "Traditional Italian dessert with coffee-soaked ladyfingers",
    ingredients: [
      "500g mascarpone cheese",
      "24 ladyfinger cookies",
      "4 eggs",
      "100g sugar",
      "2 cups strong coffee",
      "Cocoa powder",
      "2 tbsp Marsala wine (optional)"
    ],
    instructions: [
      "Separate egg yolks and whites",
      "Beat yolks with sugar until pale",
      "Fold in mascarpone cheese",
      "Whip egg whites and fold into mixture",
      "Dip ladyfingers in coffee",
      "Layer cookies and cream mixture",
      "Dust with cocoa powder"
    ],
    author: {
      id: 3,
      name: "Isabella Romano",
      ecoScore: 920,
      recipesCount: 12
    },
    likes: 456,
    cookTime: "40 mins",
    cuisine: "Italian",
    tags: ["Dessert", "Classic", "No-Bake"]
  }
];

const ExploreRecipes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('');
  const [recipes, setRecipes] = useState(mockCommunityRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const cuisines = Array.from(new Set(mockCommunityRecipes.map(recipe => recipe.cuisine)));

  const saveRecipe = (recipe: Recipe, e: React.MouseEvent) => {
    e.stopPropagation();
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    const isAlreadySaved = savedRecipes.some((r: Recipe) => r.id === recipe.id);
    
    if (!isAlreadySaved) {
      const recipeToSave = {
        ...recipe,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem('savedRecipes', JSON.stringify([...savedRecipes, recipeToSave]));
      alert('Recipe saved to your collection!');
    } else {
      alert('This recipe is already in your collection!');
    }
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCuisine = !selectedCuisine || recipe.cuisine === selectedCuisine;
    
    return matchesSearch && matchesCuisine;
  });

  if (selectedRecipe) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedRecipe(null)}
            className="mb-6 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Recipes
          </button>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={selectedRecipe.image} 
              alt={selectedRecipe.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedRecipe.name}</h2>
                <button
                  onClick={(e) => saveRecipe(selectedRecipe, e)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                  Save Recipe
                </button>
              </div>

              <Link
                to={`/profile/${selectedRecipe.author.id}`}
                className="flex items-center mb-6 hover:bg-gray-50 p-2 rounded-md transition-colors"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${selectedRecipe.author.name}&background=random`}
                  alt={selectedRecipe.author.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="font-medium">{selectedRecipe.author.name}</div>
                  <div className="text-sm text-gray-500">
                    {selectedRecipe.author.recipesCount} recipes · {selectedRecipe.author.ecoScore} eco points
                  </div>
                </div>
              </Link>

              <p className="text-gray-600 mb-6">{selectedRecipe.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedRecipe.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {selectedRecipe.cookTime}
                </div>
                <div>{selectedRecipe.cuisine}</div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  {selectedRecipe.likes}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Ingredients</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-gray-700">{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Instructions</h3>
                  <ol className="list-decimal list-inside space-y-2">
                    {selectedRecipe.instructions.map((instruction, index) => (
                      <li key={index} className="text-gray-700">{instruction}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-6">Explore Recipes</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Cuisines</option>
                {cuisines.map(cuisine => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{recipe.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                    {recipe.likes}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {recipe.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {recipe.cookTime}
                  </div>
                  <div>{recipe.cuisine}</div>
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    to={`/profile/${recipe.author.id}`}
                    className="flex items-center hover:bg-gray-50 p-1 rounded-md transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={`https://ui-avatars.com/api/?name=${recipe.author.name}&background=random`}
                      alt={recipe.author.name}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <div>
                      <span className="text-sm text-gray-600">{recipe.author.name}</span>
                      <div className="text-xs text-gray-500">{recipe.author.ecoScore} eco points</div>
                    </div>
                  </Link>
                  <button
                    onClick={(e) => saveRecipe(recipe, e)}
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                    Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreRecipes; 