import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const receipts = 
[
  {
    "receipt_id": "20200625",
    "store": "ALDI, Leipzig/Lausen",
    "date": "2020-06-25",
    "items": [
      {
        "item_id": "olive_oil",
        "name": "Organic Olive Oil",
        "price": 4.55,
        "category": "Pantry Staples"
      },
      {
        "item_id": "vital_fit",
        "name": "Vital and Fit Drink",
        "price": 0.55,
        "category": "Pantry Staples"
      },
      {
        "item_id": "balsamic_vinegar",
        "name": "Balsamic Vinegar",
        "price": 0.55,
        "category": "Pantry Staples"
      },
      {
        "item_id": "plant_cream",
        "name": "Plant Cream",
        "price": 0.85,
        "category": "Pantry Staples"
      },
      {
        "item_id": "cluster_tomatoes",
        "name": "Cluster Tomatoes",
        "price": 0.85,
        "category": "Fruits & Vegetables"
      },
      {
        "item_id": "mozzarella",
        "name": "Mozzarella Cheese",
        "price": 0.55,
        "category": "Dairy"
      },
      {
        "item_id": "cucumber",
        "name": "Salad Cucumbers",
        "price": 0.55,
        "category": "Fruits & Vegetables"
      },
      {
        "item_id": "spice_set",
        "name": "Spice Set (Grinder)",
        "price": 1.45,
        "category": "Pantry Staples"
      },
      {
        "item_id": "stuffed_peppers",
        "name": "Stuffed Cherry Peppers",
        "price": 1.65,
        "category": "Prepared Foods"
      },
      {
        "item_id": "trash_bags",
        "name": "Trash Bags (25 liters)",
        "price": 0.55,
        "category": "Household Items"
      },
      {
        "item_id": "toasties",
        "name": "Toasties (Wheat)",
        "price": 1.25,
        "category": "Breads & Baked Goods"
      },
      {
        "item_id": "bell_peppers",
        "name": "Bell Peppers (Organic)",
        "price": 2.15,
        "category": "Fruits & Vegetables"
      },
      {
        "item_id": "compostable_bags",
        "name": "Compostable Paper Bags (Organic)",
        "price": 1.55,
        "category": "Household Items"
      },
      {
        "item_id": "avocado",
        "name": "Avocado (1kg net)",
        "price": 1.55,
        "category": "Fruits & Vegetables"
      }
    ]
  },
  {
    "receipt_id": "20200717",
    "store": "ALDI, Leipzig/Lausen",
    "date": "2020-07-17",
    "items": [
      {
        "item_id": "tzatziki",
        "name": "Tzatziki Sauce",
        "price": 1.15,
        "category": "Prepared Foods"
      },
      {
        "item_id": "yogurt",
        "name": "Mild Greek-Style Yogurt",
        "price": 0.82,
        "category": "Dairy"
      },
      {
        "item_id": "hummus",
        "name": "Hummus",
        "price": 0.96,
        "category": "Prepared Foods"
      },
      {
        "item_id": "guacamole",
        "name": "Fresh Guacamole",
        "price": 1.54,
        "category": "Prepared Foods"
      },
      {
        "item_id": "eggs",
        "name": "6 Organic Eggs",
        "price": 2.12,
        "category": "Dairy"
      },
      {
        "item_id": "kiwi",
        "name": "Gold Kiwi (4 pieces)",
        "price": 2.12,
        "category": "Fruits & Vegetables"
      },
      {
        "item_id": "meatballs",
        "name": "Mini Meatballs (Quality Selection)",
        "price": 2.12,
        "category": "Prepared Foods"
      },
      {
        "item_id": "agave_syrup",
        "name": "Agave Syrup (Organic)",
        "price": 2.51,
        "category": "Pantry Staples"
      },
      {
        "item_id": "golden_sun_snack",
        "name": "Golden Sun Snack",
        "price": 1.63,
        "category": "Snacks"
      },
      {
        "item_id": "fish_specialties",
        "name": "Fish Specialties",
        "price": 2.51,
        "category": "Prepared Foods"
      },
      {
        "item_id": "cranberries",
        "name": "Cranberries (Dried)",
        "price": 1.93,
        "category": "Fruits & Vegetables"
      }
    ]
  },
  {
    "receipt_id": "20200725",
    "store": "ALDI, Leipzig/Lausen",
    "date": "2020-07-25",
    "items": [
      {
        "item_id": "mushrooms",
        "name": "Brown Mushrooms",
        "price": 0.73,
        "category": "Fruits & Vegetables"
      },
      {
        "item_id": "tzatziki",
        "name": "Tzatziki Sauce",
        "price": 1.15,
        "category": "Prepared Foods"
      },
      {
        "item_id": "yogurt",
        "name": "Greek-Style Yogurt",
        "price": 0.93,
        "category": "Dairy"
      },
      {
        "item_id": "potato_salad",
        "name": "Spreewald Potato Salad",
        "price": 1.93,
        "category": "Prepared Foods"
      },
      {
        "item_id": "olives",
        "name": "Olive Variations",
        "price": 1.54,
        "category": "Prepared Foods"
      },
      {
        "item_id": "bell_peppers",
        "name": "Bell Peppers",
        "price": 1.21,
        "category": "Fruits & Vegetables"
      },
      {
        "item_id": "flatbread",
        "name": "Flatbread",
        "price": 0.82,
        "category": "Breads & Baked Goods"
      }
    ]
  },
  {
    "receipt_id": "20200926",
    "store": "ALDI, Leipzig/Lausen",
    "date": "2020-09-26",
    "items": [
      {
        "item_id": "yogurt",
        "name": "Mild Greek-Style Yogurt",
        "price": 0.82,
        "category": "Dairy"
      },
      {
        "item_id": "tzatziki",
        "name": "Tzatziki Sauce",
        "price": 1.15,
        "category": "Prepared Foods"
      },
      {
        "item_id": "meatballs",
        "name": "Mini Meatballs (Quality Selection)",
        "price": 2.22,
        "category": "Prepared Foods"
      },
      {
        "item_id": "potato_bread",
        "name": "Pumpkin Seed Potato Bread",
        "price": 1.44,
        "category": "Breads & Baked Goods"
      },
      {
        "item_id": "soft_cheese",
        "name": "Creamy Soft Cheese",
        "price": 0.96,
        "category": "Dairy"
      },
      {
        "item_id": "cucumber",
        "name": "Salad Cucumbers",
        "price": 0.57,
        "category": "Fruits & Vegetables"
      },
      {
        "item_id": "swiss_cheese",
        "name": "Swiss Cheese Specialty",
        "price": 2.70,
        "category": "Dairy"
      },
      {
        "item_id": "bell_peppers",
        "name": "Bell Peppers",
        "price": 1.54,
        "category": "Fruits & Vegetables"
      }
    ]
  }
]

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Calculate total spending by category
  const categoryTotals = receipts.reduce((acc, receipt) => {
    receipt.items.forEach(item => {
      acc[item.category] = (acc[item.category] || 0) + item.price;
    });
    return acc;
  }, {} as Record<string, number>);

  // Get items for selected category
  const categoryItems = selectedCategory ? receipts.reduce((acc, receipt) => {
    receipt.items.forEach(item => {
      if (item.category === selectedCategory) {
        acc[item.name] = (acc[item.name] || 0) + item.price;
      }
    });
    return acc;
  }, {} as Record<string, number>) : {};

  // Convert to array format for Recharts
  const chartData = Object.entries(selectedCategory ? categoryItems : categoryTotals).map(([key, total]) => ({
    name: key,
    total: Number(total.toFixed(2)),
  }));

  const handleBarClick = (data: any) => {
    if (!selectedCategory) {
      setSelectedCategory(data.name);
    }
  };

  return (
    <div className="p-5">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">
          {selectedCategory ? `${selectedCategory} Breakdown` : 'Spending by Category'}
        </h1>
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="ml-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Back to Categories
          </button>
        )}
      </div>
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis 
              label={{ 
                value: 'Total Spent (€)', 
                angle: -90, 
                position: 'insideLeft' 
              }}
            />
            <Tooltip formatter={(value: number) => `€${value.toFixed(2)}`} />
            <Bar 
              dataKey="total" 
              fill="#8884d8" 
              onClick={handleBarClick}
              cursor={!selectedCategory ? 'pointer' : 'default'}
            >
              <LabelList 
                dataKey="total" 
                position="top" 
                formatter={(value: number) => `€${value.toFixed(2)}`} 
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
