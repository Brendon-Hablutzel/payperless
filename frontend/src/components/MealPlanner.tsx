import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getRecipeSuggestions,
  getRecipeDetails,
  Recipe,
  searchImages,
} from '../api/fetch'

interface MealPlannerProps {
  onClose: () => void
}

interface MealSuggestion {
  id: number
  name: string
  image: string
  description: string
  ingredients: string[]
}

interface RecipeInput {
  name: string
  ingredients: string[]
  description?: string
}

const MealPlanner = ({ onClose }: MealPlannerProps) => {
  const navigate = useNavigate()
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [recipeDetails, setRecipeDetails] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editedDescriptions, setEditedDescriptions] = useState<
    Record<number, string>
  >({})
  const [savedRecipeIds, setSavedRecipeIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('savedRecipes')
    return saved ? JSON.parse(saved).map((r: Recipe) => r.id) : []
  })
  const [mealSuggestions, setMealSuggestions] = useState<MealSuggestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        setLoading(true)
        const data = await getRecipeSuggestions()

        // Create suggestions without images first
        const suggestions = data.recipes.map((recipe, index) => ({
          id: index + 1,
          name: recipe.name,
          image: '', // Will be populated later
          description: `Recipe using: ${recipe.ingredients.join(', ')}`,
          ingredients: recipe.ingredients,
        }))

        setMealSuggestions(suggestions)

        // Fetch images for each recipe
        // for (const suggestion of suggestions) {
        //   try {
        //     const imageData = await searchImages(suggestion.name);
        //     if (imageData.images && imageData.images.length > 0) {
        //       setMealSuggestions(prev =>
        //         prev.map(s =>
        //           s.id === suggestion.id
        //             ? { ...s, image: imageData.images[0] }
        //             : s
        //         )
        //       );
        //     }
        //   } catch (err) {
        //     console.error(`Failed to fetch image for ${suggestion.name}:`, err);
        //     // Fallback to Unsplash if Shutterstock fails
        //     setMealSuggestions(prev =>
        //       prev.map(s =>
        //         s.id === suggestion.id
        //           ? { ...s, image: `https://source.unsplash.com/featured/?${encodeURIComponent(s.name)}` }
        //           : s
        //       )
        //     );
        //   }
        // }
      } catch (err) {
        setError('Failed to load recipe suggestions')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSuggestions()
  }, [])

  const handleEdit = (id: number) => {
    setEditingId(id)
    if (!editedDescriptions[id]) {
      setEditedDescriptions((prev) => ({
        ...prev,
        [id]: mealSuggestions.find((s) => s.id === id)?.description || '',
      }))
    }
  }

  const handleSave = (id: number) => {
    setEditingId(null)
  }

  const handleDescriptionChange = (id: number, value: string) => {
    setEditedDescriptions((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const generateRecipe = async (suggestion: MealSuggestion) => {
    try {
      setLoading(true)
      const recipeInput: RecipeInput = {
        name: suggestion.name,
        ingredients: suggestion.ingredients,
        description: editedDescriptions[suggestion.id],
      }
      const details = await getRecipeDetails(recipeInput)

      setSelectedRecipe({
        ...recipeInput,
        image: suggestion.image,
        id: suggestion.id,
        description: suggestion.name,
        instructions: details.details
          .split('\n')
          .filter((line) => line.trim() !== ''),
      })
    } catch (err) {
      setError('Failed to generate recipe details')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const saveRecipe = (recipe: Recipe) => {
    const savedRecipes = JSON.parse(
      localStorage.getItem('savedRecipes') || '[]'
    )
    const isAlreadySaved = savedRecipes.some((r: Recipe) => r.id === recipe.id)

    if (!isAlreadySaved) {
      const recipeToSave = {
        ...recipe,
        savedAt: new Date().toISOString(),
      }
      const newSavedRecipes = [...savedRecipes, recipeToSave]
      localStorage.setItem('savedRecipes', JSON.stringify(newSavedRecipes))
      setSavedRecipeIds((prev) => [...prev, recipe.id])
      alert('Recipe saved to your collection!')
    } else {
      alert('This recipe is already in your collection!')
    }
  }

  const goToSavedRecipes = () => {
    onClose()
    navigate('/saved-recipes')
  }

  if (loading) {
    return (
      <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center p-4 z-50">
        <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-6">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <p>Loading recipes...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center p-4 z-50">
        <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-6">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors hover:cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recipe Ideas</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors hover:cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {!selectedRecipe ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mealSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
                >
                  {/* <img 
                    src={suggestion.image} 
                    alt={suggestion.name}
                    className="w-full h-48 object-cover"
                  /> */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {suggestion.name}
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-blue-50/50 backdrop-blur-sm rounded-lg p-3 border border-blue-100">
                        <label className="block text-sm font-medium text-blue-700 mb-1">
                          Customize recipe prompt:
                        </label>
                        <textarea
                          value={
                            editedDescriptions[suggestion.id] ||
                            suggestion.description
                          }
                          onChange={(e) =>
                            handleDescriptionChange(
                              suggestion.id,
                              e.target.value
                            )
                          }
                          className="w-full p-2 border rounded-md text-sm bg-white/90"
                          rows={3}
                          placeholder="Enter custom instructions for recipe generation..."
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => generateRecipe(suggestion)}
                          className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-1 shadow-sm hover:cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Generate Recipe
                        </button>
                      </div>
                    </div>
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
                  className="w-full md:w-1/3 h-64 object-cover rounded-lg shadow-md"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {selectedRecipe.name}
                    </h3>
                    {savedRecipeIds.includes(selectedRecipe.id) ? (
                      <button
                        onClick={goToSavedRecipes}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-1 shadow-sm hover:cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                        </svg>
                        View in My Recipes
                      </button>
                    ) : (
                      <button
                        onClick={() => saveRecipe(selectedRecipe)}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-1 shadow-sm hover:cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                        </svg>
                        Save Recipe
                      </button>
                    )}
                  </div>

                  <div className="bg-blue-50/50 backdrop-blur-sm rounded-lg p-4 border border-blue-100 mb-4">
                    <h4 className="font-semibold text-lg mb-2 text-blue-900">
                      Ingredients:
                    </h4>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedRecipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="text-gray-700">
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-50/50 backdrop-blur-sm rounded-lg p-4 border border-green-100">
                    <h4 className="font-semibold text-lg mb-2 text-green-900">
                      Instructions:
                    </h4>
                    <ol className="list-decimal list-inside space-y-2">
                      {selectedRecipe.instructions?.map(
                        (instruction, index) => (
                          <li key={index} className="text-gray-700">
                            {instruction}
                          </li>
                        )
                      )}
                    </ol>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors hover:cursor-pointer"
                >
                  Back to Suggestions
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-sm hover:cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MealPlanner
