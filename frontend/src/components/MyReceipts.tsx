const MyReceipts = () => {
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
      <h1 className="text-2xl font-bold mb-6">My Receipts</h1>
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
    </div>
  );
};

export default MyReceipts;
