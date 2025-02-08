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
    items: ['Milk', 'Bread', 'Eggs', 'Vegetables']
  };

  const shareUrl = window.location.href;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Share link copied to clipboard!');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Share Receipt</h1>
      
      <div className="border rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{mockReceipt.store}</h2>
          <span className="text-green-600 font-medium">
            ${mockReceipt.total.toFixed(2)}
          </span>
        </div>
        <p className="text-gray-600 mb-2">{mockReceipt.date}</p>
        <div className="text-gray-700">
          <p>Items: {mockReceipt.items.join(', ')}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={copyToClipboard}
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Copy Share Link
        </button>
        <button
          onClick={() => navigate('/user-home')}
          className="w-full py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          Back to My Receipts
        </button>
      </div>
    </div>
  );
};

export default ShareReceipt; 