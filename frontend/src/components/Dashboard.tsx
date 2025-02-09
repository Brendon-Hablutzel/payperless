import { useState, useEffect } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'

// Add custom hook for window width
const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return width
}

const receipts = [
  {
    receipt_id: '20200625',
    store: 'ALDI, Leipzig/Lausen',
    date: '2020-06-25',
    items: [
      {
        item_id: 'olive_oil',
        name: 'Organic Olive Oil',
        price: 4.55,
        category: 'Pantry Staples',
      },
      {
        item_id: 'vital_fit',
        name: 'Vital and Fit Drink',
        price: 0.55,
        category: 'Pantry Staples',
      },
      {
        item_id: 'balsamic_vinegar',
        name: 'Balsamic Vinegar',
        price: 0.55,
        category: 'Pantry Staples',
      },
      {
        item_id: 'plant_cream',
        name: 'Plant Cream',
        price: 0.85,
        category: 'Pantry Staples',
      },
      {
        item_id: 'cluster_tomatoes',
        name: 'Cluster Tomatoes',
        price: 0.85,
        category: 'Fruits & Vegetables',
      },
      {
        item_id: 'mozzarella',
        name: 'Mozzarella Cheese',
        price: 0.55,
        category: 'Dairy',
      },
      {
        item_id: 'cucumber',
        name: 'Salad Cucumbers',
        price: 0.55,
        category: 'Fruits & Vegetables',
      },
      {
        item_id: 'spice_set',
        name: 'Spice Set (Grinder)',
        price: 1.45,
        category: 'Pantry Staples',
      },
      {
        item_id: 'stuffed_peppers',
        name: 'Stuffed Cherry Peppers',
        price: 1.65,
        category: 'Prepared Foods',
      },
      {
        item_id: 'trash_bags',
        name: 'Trash Bags (25 liters)',
        price: 0.55,
        category: 'Household Items',
      },
      {
        item_id: 'toasties',
        name: 'Toasties (Wheat)',
        price: 1.25,
        category: 'Breads & Baked Goods',
      },
      {
        item_id: 'bell_peppers',
        name: 'Bell Peppers (Organic)',
        price: 2.15,
        category: 'Fruits & Vegetables',
      },
      {
        item_id: 'compostable_bags',
        name: 'Compostable Paper Bags (Organic)',
        price: 1.55,
        category: 'Household Items',
      },
      {
        item_id: 'avocado',
        name: 'Avocado (1kg net)',
        price: 1.55,
        category: 'Fruits & Vegetables',
      },
    ],
  },
  {
    receipt_id: '20200717',
    store: 'REWE Center, Leipzig',
    date: '2020-07-17',
    items: [
      {
        item_id: 'tzatziki',
        name: 'Premium Tzatziki',
        price: 2.15,
        category: 'Prepared Foods',
      },
      {
        item_id: 'yogurt',
        name: 'Bio Greek Yogurt',
        price: 1.82,
        category: 'Dairy',
      },
      {
        item_id: 'hummus',
        name: 'Fresh Hummus',
        price: 2.96,
        category: 'Prepared Foods',
      },
      {
        item_id: 'guacamole',
        name: 'Organic Guacamole',
        price: 3.54,
        category: 'Prepared Foods',
      },
      {
        item_id: 'eggs',
        name: 'Free-range Eggs',
        price: 3.12,
        category: 'Dairy',
      },
      {
        item_id: 'kiwi',
        name: 'Gold Kiwi',
        price: 2.12,
        category: 'Fruits & Vegetables',
      },
    ],
  },
  {
    receipt_id: '20200725',
    store: 'Lidl, Leipzig Zentrum',
    date: '2020-07-25',
    items: [
      {
        item_id: 'mushrooms',
        name: 'Organic Mushrooms',
        price: 1.73,
        category: 'Fruits & Vegetables',
      },
      {
        item_id: 'bread',
        name: 'Sourdough Bread',
        price: 2.15,
        category: 'Breads & Baked Goods',
      },
      {
        item_id: 'cheese',
        name: 'Aged Gouda',
        price: 3.93,
        category: 'Dairy',
      },
      {
        item_id: 'wine',
        name: 'Red Wine',
        price: 4.93,
        category: 'Beverages',
      },
      {
        item_id: 'chocolate',
        name: 'Dark Chocolate',
        price: 2.54,
        category: 'Snacks',
      },
    ],
  },
  {
    receipt_id: '20200926',
    store: 'Edeka, Leipzig Hauptbahnhof',
    date: '2020-09-26',
    items: [
      {
        item_id: 'sushi',
        name: 'Fresh Sushi Box',
        price: 7.82,
        category: 'Prepared Foods',
      },
      {
        item_id: 'salmon',
        name: 'Smoked Salmon',
        price: 5.15,
        category: 'Seafood',
      },
      {
        item_id: 'avocados',
        name: 'Ripe Avocados',
        price: 3.22,
        category: 'Fruits & Vegetables',
      },
      {
        item_id: 'quinoa',
        name: 'Organic Quinoa',
        price: 4.44,
        category: 'Pantry Staples',
      },
      {
        item_id: 'kombucha',
        name: 'Craft Kombucha',
        price: 3.96,
        category: 'Beverages',
      },
    ],
  },
  {
    receipt_id: '20201015',
    store: 'Bio Company, Leipzig',
    date: '2020-10-15',
    items: [
      {
        item_id: 'tofu',
        name: 'Organic Tofu',
        price: 2.99,
        category: 'Protein',
      },
      {
        item_id: 'tempeh',
        name: 'Fresh Tempeh',
        price: 3.49,
        category: 'Protein',
      },
      {
        item_id: 'coconut_milk',
        name: 'Organic Coconut Milk',
        price: 2.99,
        category: 'Pantry Staples',
      },
      {
        item_id: 'chia_seeds',
        name: 'Organic Chia Seeds',
        price: 4.99,
        category: 'Pantry Staples',
      },
      {
        item_id: 'almond_butter',
        name: 'Raw Almond Butter',
        price: 6.99,
        category: 'Pantry Staples',
      },
    ],
  },
  {
    receipt_id: '20201103',
    store: 'Kaufland, Leipzig Paunsdorf',
    date: '2020-11-03',
    items: [
      {
        item_id: 'paper_towels',
        name: 'Recycled Paper Towels',
        price: 3.99,
        category: 'Household Items',
      },
      {
        item_id: 'laundry_detergent',
        name: 'Eco Laundry Detergent',
        price: 7.99,
        category: 'Household Items',
      },
      {
        item_id: 'dish_soap',
        name: 'Natural Dish Soap',
        price: 2.99,
        category: 'Household Items',
      },
      {
        item_id: 'sponges',
        name: 'Compostable Sponges',
        price: 3.49,
        category: 'Household Items',
      },
    ],
  },
  {
    receipt_id: '20201122',
    store: 'Konsum, Leipzig Südvorstadt',
    date: '2020-11-22',
    items: [
      {
        item_id: 'coffee_beans',
        name: 'Fair Trade Coffee Beans',
        price: 8.99,
        category: 'Beverages',
      },
      {
        item_id: 'local_honey',
        name: 'Local Honey',
        price: 6.49,
        category: 'Pantry Staples',
      },
      {
        item_id: 'granola',
        name: 'Artisanal Granola',
        price: 4.99,
        category: 'Breakfast',
      },
      {
        item_id: 'oat_milk',
        name: 'Barista Oat Milk',
        price: 2.99,
        category: 'Dairy Alternatives',
      },
    ],
  },
  {
    receipt_id: '20201205',
    store: 'Denns Bio, Leipzig',
    date: '2020-12-05',
    items: [
      {
        item_id: 'spirulina',
        name: 'Organic Spirulina Powder',
        price: 12.99,
        category: 'Supplements',
      },
      {
        item_id: 'coconut_water',
        name: 'Raw Coconut Water',
        price: 3.99,
        category: 'Beverages',
      },
      {
        item_id: 'protein_powder',
        name: 'Plant Protein Blend',
        price: 24.99,
        category: 'Supplements',
      },
      {
        item_id: 'kombucha_kit',
        name: 'Kombucha Brewing Kit',
        price: 19.99,
        category: 'Specialty Items',
      },
    ],
  }
]

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884D8',
  '#82CA9D',
  '#FFC658',
  '#FF6B6B',
]

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const windowWidth = useWindowWidth()
  const showLabels = windowWidth >= 768 // Only show labels on tablets and larger screens

  // Calculate total spending by category
  const categoryTotals = receipts.reduce(
    (acc, receipt) => {
      receipt.items.forEach((item) => {
        acc[item.category] = (acc[item.category] || 0) + item.price
      })
      return acc
    },
    {} as Record<string, number>
  )

  // Get items for selected category
  const categoryItems = selectedCategory
    ? receipts.reduce(
        (acc, receipt) => {
          receipt.items.forEach((item) => {
            if (item.category === selectedCategory) {
              acc[item.name] = (acc[item.name] || 0) + item.price
            }
          })
          return acc
        },
        {} as Record<string, number>
      )
    : {}

  // Convert to array format for Recharts
  const chartData = Object.entries(
    selectedCategory ? categoryItems : categoryTotals
  ).map(([key, total]) => ({
    name: key,
    total: Number(total.toFixed(2)),
  }))

  // New calculations for spending trends
  const dailyTotals = receipts.map((receipt) => {
    const total = receipt.items.reduce((sum, item) => sum + item.price, 0)
    return {
      date: receipt.date,
      total: Number(total.toFixed(2)),
    }
  })

  // New calculations for store spending totals
  const storeSpending = receipts.reduce((acc, receipt) => {
    const storeTotal = receipt.items.reduce((sum, item) => sum + item.price, 0)
    acc[receipt.store] = (acc[receipt.store] || 0) + storeTotal
    return acc
  }, {} as Record<string, number>)

  // Convert to array and sort by total spent
  const storeData = Object.entries(storeSpending)
    .map(([store, total]) => ({
      store,
      total: Number(total.toFixed(2)),
    }))
    .sort((a, b) => b.total - a.total)

  const handleBarClick = (data: any) => {
    if (!selectedCategory) {
      setSelectedCategory(data.name)
    }
  }

  return (
    <div className="p-5 space-y-8 bg-white">
      {/* Category Spending Chart */}
      <div className="bg-white rounded-lg shadow-sm border p-5">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold">
            {selectedCategory
              ? `${selectedCategory} Breakdown`
              : 'Spending by Category'}
          </h1>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="ml-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 hover:cursor-pointer"
            >
              Back to Categories
            </button>
          )}
        </div>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ bottom: 35, top: 50, left: 25 }}>
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis
                label={{
                  value: 'Total Spent (€)',
                  angle: -90,
                  position: 'insideLeft',
                }}
              />
              <Tooltip formatter={(value: number) => `€${value.toFixed(2)}`} />
              <Bar
                dataKey="total"
                fill="#8884d8"
                onClick={handleBarClick}
                cursor={!selectedCategory ? 'pointer' : 'default'}
              >
                {showLabels && (
                  <LabelList
                    dataKey="total"
                    position="top"
                    formatter={(value: number) => `€${value.toFixed(2)}`}
                  />
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Spending Trends Chart */}
      <div className="bg-white rounded-lg shadow-sm border p-5">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold">Spending Trends Over Time</h1>
        </div>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dailyTotals}
              margin={{ top: 20, right: 30, left: 20, bottom: 35 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis
                label={{
                  value: 'Total Spent (€)',
                  angle: -90,
                  position: 'insideLeft',
                }}
              />
              <Tooltip formatter={(value: number) => `€${value.toFixed(2)}`} />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ fill: '#8884d8' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Store Spending Chart */}
      <div className="bg-white rounded-lg shadow-sm border p-5">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold">Top Stores by Spending</h1>
        </div>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={storeData} margin={{ bottom: 35, left: 25 }}>
              <XAxis dataKey="store" angle={-45} textAnchor="end" height={100} />
              <YAxis
                label={{
                  value: 'Total Spent (€)',
                  angle: -90,
                  position: 'insideLeft',
                }}
              />
              <Tooltip formatter={(value: number) => `€${value.toFixed(2)}`} />
              <Bar dataKey="total" fill="#8884d8">
                {showLabels && (
                  <LabelList
                    dataKey="total"
                    position="top"
                    formatter={(value: number) => `€${value.toFixed(2)}`}
                  />
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
