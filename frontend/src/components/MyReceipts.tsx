import { useState } from 'react';
import { Receipt, ReceiptItem } from '../types/Receipt';
import MealPlanner from './MealPlanner';

const mockReceipts: Receipt[] = [
  {
    id: "1",
    store: "Whole Foods Market",
    date: "2024-03-15",
    total: 156.78,
    imageUrl: "https://example.com/receipt1.jpg",
    sustainabilityScore: 85,
    sustainableChoices: 6,
    sustainabilityPoints: 120,
    sustainabilityTips: [
      "Consider bringing reusable bags next time",
      "Try our organic produce section for more eco-friendly options"
    ],
    items: [
      {
        id: "item1",
        name: "Organic Bananas",
        price: 3.99,
        quantity: 1,
        category: "Produce",
        isEcoFriendly: true,
        sustainabilityScore: 90,
        sustainabilityTip: "Organic farming helps protect soil health"
      },
      {
        id: "item2",
        name: "Local Farm Eggs",
        price: 5.99,
        quantity: 1,
        category: "Dairy",
        isEcoFriendly: true,
        sustainabilityScore: 85,
        sustainabilityTip: "Local products reduce transportation emissions"
      },
      {
        id: "item3",
        name: "Reusable Water Bottle",
        price: 24.99,
        quantity: 1,
        category: "Home Goods",
        isEcoFriendly: true,
        sustainabilityScore: 95,
        sustainabilityTip: "Helps reduce single-use plastic waste"
      }
    ]
  },
  {
    id: "2",
    store: "Trader Joe's",
    date: "2024-03-14",
    total: 89.45,
    imageUrl: "https://example.com/receipt2.jpg",
    sustainabilityScore: 75,
    sustainableChoices: 4,
    sustainabilityPoints: 80,
    sustainabilityTips: [
      "Look for products with less packaging",
      "Try our plant-based alternatives"
    ],
    items: [
      {
        id: "item4",
        name: "Plant-Based Burger",
        price: 7.99,
        quantity: 1,
        category: "Vegetarian",
        isEcoFriendly: true,
        sustainabilityScore: 88,
        sustainabilityTip: "Plant-based options have lower carbon footprint"
      },
      {
        id: "item5",
        name: "Bamboo Paper Towels",
        price: 4.99,
        quantity: 2,
        category: "Household",
        isEcoFriendly: true,
        sustainabilityScore: 82,
        sustainabilityTip: "Bamboo is a more sustainable resource"
      }
    ]
  }
];

const MyReceipts = () => {
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [showMealPlanner, setShowMealPlanner] = useState(false);

  const handleViewDetails = (receipt: Receipt) => {
    setSelectedReceipt(receipt);
  };

  const handleGenerateMealPlan = (receipt: Receipt) => {
    setSelectedReceipt(receipt);
    setShowMealPlanner(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Receipts</h1>
        <button
          onClick={() => setShowMealPlanner(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
          Suggest Meal Plans
        </button>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockReceipts.map((receipt) => (
            <div
              key={receipt.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {receipt.imageUrl && (
                <img
                  src={receipt.imageUrl}
                  alt={`Receipt from ${receipt.store}`}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{receipt.store}</h3>
                    <p className="text-sm text-gray-600">{receipt.date}</p>
                  </div>
                  <span className="text-lg font-bold text-gray-900">
                    ${receipt.total.toFixed(2)}
                  </span>
                </div>
                
                {/* Sustainability Section */}
                <div className="mt-3 p-3 bg-green-50 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-800">Eco Score</span>
                    <div className="flex items-center">
                      <span className="text-sm font-semibold text-green-600">
                        {receipt.sustainabilityScore}/100
                      </span>
                      <svg className="h-5 w-5 ml-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-green-700">
                    <span>Eco Choices: {receipt.sustainableChoices}</span>
                    <span>+{receipt.sustainabilityPoints} points</span>
                  </div>
                </div>

                <div className="mt-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Items</h4>
                  <div className="space-y-2">
                    {receipt.items.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center text-sm"
                      >
                        <div className="flex items-center">
                          <span className="text-gray-800">{item.name}</span>
                          {item.isEcoFriendly && (
                            <svg
                              className="h-4 w-4 ml-1 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="text-gray-600">${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                    {receipt.items.length > 3 && (
                      <p className="text-sm text-gray-500">
                        +{receipt.items.length - 3} more items
                      </p>
                    )}
                  </div>
                </div>

                {receipt.sustainabilityTips && receipt.sustainabilityTips.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Eco Tips</h4>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {receipt.sustainabilityTips.slice(0, 2).map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => handleViewDetails(receipt)}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleGenerateMealPlan(receipt)}
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  >
                    Generate Meal Plan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {showMealPlanner && (
        <MealPlanner onClose={() => setShowMealPlanner(false)} />
      )}
    </div>
  );
};

export default MyReceipts;
