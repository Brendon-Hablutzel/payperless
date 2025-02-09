import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Recipe {
  id: number;
  name: string;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  savedAt: string;
  fullText?: string;
}

const SavedRecipes = () => {
  // In a real app, this would be fetched from an API/backend
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('savedRecipes');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState<Recipe | null>(null);

  const deleteRecipe = (id: number) => {
    const newRecipes = savedRecipes.filter(recipe => recipe.id !== id);
    setSavedRecipes(newRecipes);
    localStorage.setItem('savedRecipes', JSON.stringify(newRecipes));
  };

  const startEditing = () => {
    if (selectedRecipe) {
      const formattedRecipe = `Description:
${selectedRecipe.description}

Ingredients:
${selectedRecipe.ingredients.join('\n')}

Instructions:
${selectedRecipe.instructions.join('\n')}`;

      setEditedRecipe({
        ...selectedRecipe,
        fullText: formattedRecipe
      });
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (editedRecipe?.fullText) {
      const sections = editedRecipe.fullText.split('\n\n');
      const description = sections[0].replace('Description:\n', '');
      const ingredients = sections[1].replace('Ingredients:\n', '').split('\n').filter(Boolean);
      const instructions = sections[2].replace('Instructions:\n', '').split('\n').filter(Boolean);

      const updatedRecipe = {
        ...editedRecipe,
        description,
        ingredients,
        instructions
      };

      const newRecipes = savedRecipes.map(recipe => 
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      );

      setSavedRecipes(newRecipes);
      setSelectedRecipe(updatedRecipe);
      localStorage.setItem('savedRecipes', JSON.stringify(newRecipes));
      setIsEditing(false);
    }
  };

  if (selectedRecipe) {
    const recipe = isEditing ? editedRecipe : selectedRecipe;
    if (!recipe) return null;

    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => {
                setSelectedRecipe(null);
                setIsEditing(false);
              }}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Collection
            </button>
            {!isEditing ? (
              <button
                onClick={startEditing}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Recipe
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Save Changes
              </button>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={recipe.image} 
              alt={recipe.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{recipe.name}</h2>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-md p-4">
                    <p className="text-sm text-blue-700 mb-2">
                      Edit your recipe below. Keep the "Description:", "Ingredients:", and "Instructions:" headers.
                    </p>
                    <textarea
                      value={recipe.fullText}
                      onChange={(e) => setEditedRecipe({ ...recipe, fullText: e.target.value })}
                      className="w-full p-3 border rounded-md font-mono text-sm"
                      rows={20}
                      style={{ whiteSpace: 'pre-wrap' }}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Description:</h3>
                    <p className="text-gray-600">{recipe.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Ingredients:</h3>
                    <ul className="list-disc list-inside">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="text-gray-700">{ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Instructions:</h3>
                    <ol className="list-decimal list-inside">
                      {recipe.instructions.map((instruction, index) => (
                        <li key={index} className="text-gray-700 mb-2">{instruction}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Recipe Collection</h1>
        <Link
          to="/new-recipe"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          New Recipe
        </Link>
      </div>
      {savedRecipes.length === 0 ? (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="text-gray-600">You haven't saved any recipes yet.</p>
          <p className="text-gray-500 text-sm mt-1">Generate some meal plans to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {savedRecipes.map((recipe) => (
            <div 
              key={recipe.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img 
                src={recipe.image} 
                alt={recipe.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{recipe.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setSelectedRecipe(recipe)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    View Recipe
                  </button>
                  <button
                    onClick={() => deleteRecipe(recipe.id)}
                    className="p-1 text-red-500 hover:text-red-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  Saved on {new Date(recipe.savedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedRecipes; 