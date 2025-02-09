import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  points: number;
  level: string;
  receiptsCount: number;
  sustainableChoices: number;
}

const calculateLevel = (points: number): string => {
  if (points >= 1000) return "Eco Master";
  if (points >= 500) return "Sustainability Pro";
  if (points >= 250) return "Green Enthusiast";
  if (points >= 100) return "Eco Learner";
  return "Eco Beginner";
};

const SustainabilityLeaderboard = () => {
  // In a real app, this would be fetched from an API
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('sustainabilityUsers');
    const defaultUsers = [
      { id: 1, name: "Alex Green", points: 850, receiptsCount: 25, sustainableChoices: 20 },
      { id: 2, name: "Sam Earth", points: 620, receiptsCount: 18, sustainableChoices: 15 },
      { id: 3, name: "Jordan Rivers", points: 450, receiptsCount: 12, sustainableChoices: 10 },
      { id: 4, name: "Taylor Woods", points: 320, receiptsCount: 8, sustainableChoices: 6 },
      { id: 5, name: "Casey Waters", points: 180, receiptsCount: 5, sustainableChoices: 3 },
    ].map(user => ({
      ...user,
      level: calculateLevel(user.points)
    }));
    return saved ? JSON.parse(saved) : defaultUsers;
  });

  const [timeFrame, setTimeFrame] = useState<'week' | 'month' | 'allTime'>('allTime');

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Sustainability Leaderboard</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setTimeFrame('week')}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                timeFrame === 'week'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTimeFrame('month')}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                timeFrame === 'month'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setTimeFrame('allTime')}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                timeFrame === 'allTime'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Time
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-green-50 border-b border-green-100">
            <div className="flex items-center justify-between text-sm font-medium text-green-800">
              <span>Rank</span>
              <span className="flex-1 ml-4">User</span>
              <span className="w-24 text-center">Points</span>
              <span className="w-32 text-center">Level</span>
              <span className="w-24 text-center">Receipts</span>
              <span className="w-24 text-center">Eco Choices</span>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {users
              .sort((a, b) => b.points - a.points)
              .map((user, index) => (
                <div
                  key={user.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-8 text-lg font-semibold text-gray-500">
                      {index + 1}
                    </span>
                    <div className="flex-1 ml-4">
                      <span className="font-medium text-gray-900">{user.name}</span>
                    </div>
                    <span className="w-24 text-center font-semibold text-green-600">
                      {user.points}
                    </span>
                    <span className="w-32 text-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.level === 'Eco Master' ? 'bg-green-100 text-green-800' :
                        user.level === 'Sustainability Pro' ? 'bg-blue-100 text-blue-800' :
                        user.level === 'Green Enthusiast' ? 'bg-yellow-100 text-yellow-800' :
                        user.level === 'Eco Learner' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.level}
                      </span>
                    </span>
                    <span className="w-24 text-center text-gray-600">
                      {user.receiptsCount}
                    </span>
                    <span className="w-24 text-center text-gray-600">
                      {user.sustainableChoices}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">How to Earn Points</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Receipt Actions</h3>
              <ul className="list-disc list-inside text-gray-600 text-sm">
                <li>Upload a receipt: +10 points</li>
                <li>Choose sustainable products: +20 points each</li>
                <li>Complete weekly shopping: +50 bonus points</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Eco Achievements</h3>
              <ul className="list-disc list-inside text-gray-600 text-sm">
                <li>First sustainable choice: +100 points</li>
                <li>5 sustainable choices in a week: +200 points</li>
                <li>Monthly sustainability streak: +500 points</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityLeaderboard; 