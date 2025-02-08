import { useState } from 'react';
import MealPlanner from './MealPlanner';

const MyReceipts = () => {
  const [showMealPlanner, setShowMealPlanner] = useState(false);
  
  // Mock receipt data
  const mockReceipts = [
    {
      id: 1,
      date: '2024-03-15',
      store: 'Grocery Store',
      total: 85.47,
      items: ['Milk', 'Bread', 'Eggs', 'Vegetables']
    },
    {
      id: 2,
      date: '2024-03-14',
      store: 'Electronics Shop',
      total: 299.99,
      items: ['Headphones', 'USB Cable']
    },
    {
      id: 3,
      date: '2024-03-12',
      store: 'Bookstore',
      total: 45.98,
      items: ['Novel', 'Magazine', 'Notebook']
    }
  ];

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
        {mockReceipts.map((receipt) => (
          <div 
            key={receipt.id} 
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">{receipt.store}</h2>
              <div className="flex items-center gap-4">
                <span className="text-green-600 font-medium">
                  ${receipt.total.toFixed(2)}
                </span>
                <button
                  onClick={() => window.location.href = `/share-receipt/${receipt.id}`}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  Share
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-2">{receipt.date}</p>
            <div className="text-sm text-gray-700">
              <p>Items: {receipt.items.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
      
      {showMealPlanner && (
        <MealPlanner onClose={() => setShowMealPlanner(false)} />
      )}
    </div>
  );
};

export default MyReceipts;
