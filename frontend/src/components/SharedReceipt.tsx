import { useParams } from 'react-router-dom';

const SharedReceipt = () => {
  const { id } = useParams();

  // Mock receipt data - in a real app, you'd fetch this based on the ID
  const mockReceipt = {
    id: parseInt(id || '1'),
    date: '2024-03-15',
    store: 'Grocery Store',
    total: 85.47,
    items: [
      { name: 'Milk', price: 4.99 },
      { name: 'Bread', price: 3.49 },
      { name: 'Eggs', price: 5.99 },
      { name: 'Vegetables', price: 12.99 }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{mockReceipt.store}</h1>
          <p className="text-gray-600">{mockReceipt.date}</p>
        </div>

        <div className="border-t border-b border-gray-200 py-4 mb-4">
          {mockReceipt.items.map((item, index) => (
            <div key={index} className="flex justify-between py-2">
              <span className="text-gray-700">{item.name}</span>
              <span className="text-gray-900">${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total</span>
          <span className="text-green-600">${mockReceipt.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default SharedReceipt; 