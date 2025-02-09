import { useState } from 'react';
import { Receipt, ReceiptItem } from '../types/Receipt';
import MealPlanner from './MealPlanner';
import { Link } from 'react-router-dom';

interface TipsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  tips: Array<{
    tip: string;
    impact?: string;
    savings?: number;
  }>;
  type: 'eco' | 'budget';
}

const TipsModal = ({ isOpen, onClose, title, tips, type }: TipsModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            {tips.map((tip, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg ${
                  type === 'eco' ? 'bg-green-50' : 'bg-blue-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  {type === 'eco' ? (
                    <svg className="h-6 w-6 text-green-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-blue-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <div className="flex-1">
                    <p className={`font-medium ${
                      type === 'eco' ? 'text-green-800' : 'text-blue-800'
                    }`}>
                      {tip.tip}
                    </p>
                    {tip.impact && (
                      <p className={`mt-1 text-sm ${
                        type === 'eco' ? 'text-green-600' : 'text-blue-600'
                      }`}>
                        Impact: {tip.impact}
                      </p>
                    )}
                    {tip.savings && (
                      <p className="mt-1 text-sm text-blue-600">
                        Potential Savings: ${tip.savings.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const [showEcoTips, setShowEcoTips] = useState(false);
  const [showBudgetTips, setShowBudgetTips] = useState(false);
  const [generatedEcoTips, setGeneratedEcoTips] = useState<Array<{tip: string; impact: string}>>([]);
  const [generatedBudgetTips, setGeneratedBudgetTips] = useState<Array<{tip: string; savings: number}>>([]);

  const handleViewDetails = (receipt: Receipt) => {
    setSelectedReceipt(receipt);
  };

  const handleGenerateMealPlan = (receipt: Receipt) => {
    setSelectedReceipt(receipt);
    setShowMealPlanner(true);
  };

  const generateEcoTips = (receipt: Receipt) => {
    // Mock eco tips generation based on receipt items
    const tips = [
      {
        tip: "Switch to reusable bags for your groceries",
        impact: "Reduces plastic waste by ~300 bags per year"
      },
      {
        tip: "Consider local organic alternatives for your produce",
        impact: "Reduces carbon footprint by 25%"
      },
      {
        tip: "Try bulk buying for frequently purchased items",
        impact: "Reduces packaging waste by 40%"
      },
      {
        tip: "Look for products with eco-friendly packaging",
        impact: "Reduces plastic waste by 30%"
      }
    ];
    setGeneratedEcoTips(tips);
    setShowEcoTips(true);
  };

  const generateBudgetTips = (receipt: Receipt) => {
    // Mock budget tips generation based on receipt items
    const tips = [
      {
        tip: "Buy in bulk for non-perishable items",
        savings: 45.50
      },
      {
        tip: "Switch to store brand alternatives",
        savings: 25.75
      },
      {
        tip: "Use a loyalty card for additional savings",
        savings: 15.20
      },
      {
        tip: "Shop during seasonal sales",
        savings: 35.90
      }
    ];
    setGeneratedBudgetTips(tips);
    setShowBudgetTips(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Receipts</h1>
        <Link
          to="/scan"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Receipt
        </Link>
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

                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => generateEcoTips(receipt)}
                    className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                    </svg>
                    Generate Eco Tips
                  </button>
                  <button
                    onClick={() => generateBudgetTips(receipt)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                    Generate Budget Tips
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

      <TipsModal
        isOpen={showEcoTips}
        onClose={() => setShowEcoTips(false)}
        title="Eco-Friendly Tips"
        tips={generatedEcoTips}
        type="eco"
      />

      <TipsModal
        isOpen={showBudgetTips}
        onClose={() => setShowBudgetTips(false)}
        title="Budget Saving Tips"
        tips={generatedBudgetTips}
        type="budget"
      />
    </div>
  );
};

export default MyReceipts;
