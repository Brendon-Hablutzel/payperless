import { useEffect, useState } from 'react'
import { z } from 'zod'
import { listReceiptsReceiptsGetResponseItem } from '../api/types'
import { listReceipts } from '../api/fetch'
import { GridLoader } from 'react-spinners'
import { Link } from 'react-router-dom'

const expectedReceiptItem = z.object({
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
})

const expectedReceiptData = z.object({
  date: z.string(),
  total_amount: z.number(),
  store_name: z.string(),
  items: z.array(expectedReceiptItem),
})

const s = z.array(
  listReceiptsReceiptsGetResponseItem.omit({ data: true }).extend({
    data: expectedReceiptData,
  })
)

const MyReceipts = () => {
  const [receipts, setReceipts] = useState<undefined | z.infer<typeof s>>(
    undefined
  )

  const [isError, setIsError] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const receiptsResponse = await listReceipts()
        console.log(receiptsResponse)
        const p = receiptsResponse
          .filter((r) => expectedReceiptData.safeParse(r.data).success)
          .map((r) => ({
            ...r,
            data: expectedReceiptData.parse(r.data),
          }))

        p.reverse()
        setReceipts(p)
      } catch (e) {
        setIsError(true)
        console.error(e)
      }
    })()
  }, [])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Receipts</h1>
        <Link
          to="/scan"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add Receipt
        </Link>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {receipts ? (
            receipts.map((receipt) => (
              <div
                key={receipt.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {receipt.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {receipt.data.date}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      ${receipt.data.total_amount.toFixed(2)}
                    </span>
                  </div>

                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Items
                    </h4>
                    <div className="space-y-2">
                      {receipt.data.items.slice(0, 3).map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center text-sm"
                        >
                          <span className="text-gray-800">{item.name}</span>
                          <span className="text-gray-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                      {receipt.data.items.length > 3 && (
                        <p className="text-sm text-gray-500">
                          +{receipt.data.items.length - 3} more items
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end space-x-2">
                    <Link
                      to={`/receipts/${receipt.id}`}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors flex items-center gap-1"
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/share-receipt/${receipt.id}`}
                      className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      Share
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : isError ? (
            <div className="text-red-500">
              Error loading receipts, please try again
            </div>
          ) : (
            <div className="flex justify-center">
              <GridLoader />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyReceipts
