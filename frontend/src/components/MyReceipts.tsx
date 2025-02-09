import { useEffect, useState } from 'react'
import { z } from 'zod'
import { listReceiptsReceiptsGetResponseItem } from '../api/types'
import { listReceipts } from '../api/fetch'

const expectedReceiptItem = z.object({
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
})

const expectedReceiptData = z.object({
  date: z.string(),
  total_amount: z.number(),
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

  useEffect(() => {
    ;(async () => {
      const receiptsResponse = await listReceipts()
      console.log(receiptsResponse)
      const p = receiptsResponse.map((r) => ({
        ...r,
        data: expectedReceiptData.parse(r.data),
      }))
      setReceipts(p)
    })()
  }, [])

  return (
    <div className="p-6">
      <div className="space-y-4">
        {receipts ? (
          receipts.map((receipt) => (
            <div
              key={receipt.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">{receipt.name}</h2>
                <div className="flex items-center gap-4">
                  <span className="text-green-600 font-medium">
                    ${receipt.data.total_amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() =>
                      (window.location.href = `/share-receipt/${receipt.id}`)
                    }
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
                  >
                    Share
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2">{receipt.data.date}</p>
              <div className="text-sm text-gray-700">
                <p>
                  Items:{' '}
                  {receipt.data.items.map((item) => item.name).join(', ')}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div>loading</div>
        )}
      </div>
    </div>
  )
}

export default MyReceipts
