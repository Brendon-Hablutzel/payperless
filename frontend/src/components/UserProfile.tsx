import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

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

interface User {
  id: number;
  name: string;
  ecoScore: number;
  recipesCount: number;
  level: string;
  joinedDate: string;
  bio: string;
  recipes: Recipe[];
}

const calculateLevel = (ecoScore: number): string => {
  if (ecoScore >= 1000) return "Eco Master";
  if (ecoScore >= 500) return "Sustainability Pro";
  if (ecoScore >= 250) return "Green Enthusiast";
  if (ecoScore >= 100) return "Eco Learner";
  return "Eco Beginner";
};

// Mock user data - in a real app, this would come from an API
const mockUser: User = {
  id: 1,
  name: "Sarah Green",
  ecoScore: 850,
  recipesCount: 15,
  level: "Sustainability Pro",
  joinedDate: "2023-09-15",
  bio: "Passionate about sustainable cooking and reducing food waste. Love creating healthy, eco-friendly recipes that everyone can enjoy!",
  recipes: [
    {
      id: 1,
      name: "Mediterranean Quinoa Bowl",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
      description: "A healthy and colorful quinoa bowl packed with Mediterranean flavors",
      ingredients: ["1 cup quinoa", "2 cups cherry tomatoes", "1 cucumber"],
      instructions: ["Cook quinoa", "Chop vegetables", "Combine and serve"],
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
    // Add more recipes as needed
  ]
};

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'recipes' | 'achievements'>('recipes');

  useEffect(() => {
    // In a real app, fetch user data from API
    setUser(mockUser);
  }, [userId]);

  if (!user) return null;

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-green-500 h-32"></div>
          <div className="px-6 pb-6">
            <div className="flex items-start -mt-16 mb-6">
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}&size=128&background=random`}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <div className="ml-6 mt-16">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <div className="text-gray-500">Joined {new Date(user.joinedDate).toLocaleDateString()}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{user.ecoScore}</div>
                <div className="text-sm text-green-800">Eco Points</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{user.recipesCount}</div>
                <div className="text-sm text-blue-800">Recipes Shared</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">{user.level}</div>
                <div className="text-sm text-purple-800">Current Level</div>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{user.bio}</p>

            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('recipes')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'recipes'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Recipes
                </button>
                <button
                  onClick={() => setActiveTab('achievements')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'achievements'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Achievements
                </button>
              </nav>
            </div>

            {activeTab === 'recipes' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.recipes.map((recipe) => (
                  <Link
                    key={recipe.id}
                    to={`/explore-recipes?recipe=${recipe.id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
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
                      
                      <div className="flex flex-wrap gap-2">
                        {recipe.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4 flex items-center">
                  <div className="bg-green-100 rounded-full p-2 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Sustainability Champion</h3>
                    <p className="text-sm text-gray-600">Reached {user.level} level with {user.ecoScore} eco points</p>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 flex items-center">
                  <div className="bg-blue-100 rounded-full p-2 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Recipe Creator</h3>
                    <p className="text-sm text-gray-600">Shared {user.recipesCount} recipes with the community</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 