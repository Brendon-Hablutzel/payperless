import { useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const receipts = [
  {
    receipt_id: '20200625',
    store: 'ALDI, Leipzig/Lausen',
    date: '2020-06-25',
    items: [
      // ... items will be calculated from the existing data
    ],
  },
  {
    receipt_id: '20200717',
    store: 'ALDI, Leipzig/Lausen',
    date: '2020-07-17',
    items: [],
  },
  {
    receipt_id: '20200725',
    store: 'ALDI, Leipzig/Lausen',
    date: '2020-07-25',
    items: [],
  },
  {
    receipt_id: '20200926',
    store: 'ALDI, Leipzig/Lausen',
    date: '2020-09-26',
    items: [],
  },
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

const ReceiptBreakdown = () => {
  const [selectedReceipt, setSelectedReceipt] = useState(receipts[0])

  // Calculate item distribution for the selected receipt
  const itemDistribution = selectedReceipt.items.reduce((acc, item) => {
    acc[item.name] = item.price
    return acc
  }, {} as Record<string, number>)

  const pieData = Object.entries(itemDistribution).map(([name, value]) => ({
    name,
    value: Number(value.toFixed(2)),
  }))

  return (
    <div className="p-5 bg-white">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">Receipt Item Breakdown</h1>
        <select
          className="ml-4 p-2 border rounded"
          value={selectedReceipt.receipt_id}
          onChange={(e) => {
            const receipt = receipts.find((r) => r.receipt_id === e.target.value)
            if (receipt) setSelectedReceipt(receipt)
          }}
        >
          {receipts.map((receipt) => (
            <option key={receipt.receipt_id} value={receipt.receipt_id}>
              {receipt.date} - {receipt.store}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
              }) => {
                const RADIAN = Math.PI / 180
                const radius = 25 + innerRadius + (outerRadius - innerRadius)
                const x = cx + radius * Math.cos(-midAngle * RADIAN)
                const y = cy + radius * Math.sin(-midAngle * RADIAN)
                return (
                  <text
                    x={x}
                    y={y}
                    fill="#000"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                  >
                    {`€${value}`}
                  </text>
                )
              }}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `€${value.toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ReceiptBreakdown 