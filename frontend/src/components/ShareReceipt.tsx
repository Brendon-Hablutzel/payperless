import { useParams, useNavigate } from 'react-router-dom';

const ShareReceipt = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const shareUrl = `${window.location.origin}/receipt/${id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Share link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
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

        <div className="flex flex-col gap-4">
          <button
            onClick={copyToClipboard}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Copy Share Link
          </button>
          <button
            onClick={() => navigate('/user-home')}
            className="w-full py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Back to My Receipts
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareReceipt; 