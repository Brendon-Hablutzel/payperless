import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getImageUrl, getReceipt } from '../api/fetch'
import { getReceiptReceiptsIdGetResponse } from '../api/types'
import { z } from 'zod'

const Receipt = () => {
  const params = useParams()

  const id = params['id']

  if (!id) {
    return (
      <div className="p-5 bg-white">
        <div className="flex items-center mb-6 bg-white">
          <div className="text-red-500">Error</div>
        </div>
      </div>
    )
  }

  const [imgExists, setImgExists] = useState(true)

  const handleError = () => {
    setImgExists(false)
  }

  const [isError, setIsError] = useState(false)

  const [receipt, setReceipt] = useState<
    undefined | z.infer<typeof getReceiptReceiptsIdGetResponse>
  >(undefined)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await getReceipt(id)
        setReceipt(res)
      } catch (e) {
        console.error(e)
        setIsError(true)
      }
    })()
  }, [])

  return (
    <div className="p-5 bg-white">
      <div className="flex items-start mb-6 bg-white">
        {!isError && imgExists ? (
          <div className="w-full max-w-6xl mx-auto lg:flex lg:gap-8">
            {/* Receipt Details Section */}
            <div className="w-full lg:w-2/3">
              <h2 className="text-2xl font-bold mb-4">{receipt?.data.store_name || 'Receipt Details'}</h2>
              
              <div className="mb-4">
                <p className="text-gray-600">Date: {receipt?.data.date}</p>
                {receipt?.data.address && <p className="text-gray-600">Address: {receipt.data.address}</p>}
                {receipt?.data.phone_number && <p className="text-gray-600">Phone: {receipt.data.phone_number}</p>}
              </div>

              <div className="border-t border-b border-gray-200 py-4 mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-600">
                      <th className="pb-2">Item</th>
                      <th className="pb-2">Qty</th>
                      <th className="pb-2 text-right">Price</th>
                      <th className="pb-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receipt?.data.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100 last:border-0">
                        <td className="py-2">{item.name}</td>
                        <td className="py-2">{item.quantity}</td>
                        <td className="py-2 text-right">${item.price.toFixed(2)}</td>
                        <td className="py-2 text-right">${(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <div className="flex justify-between w-48">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>${receipt?.data.total_amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between w-48">
                  <span className="text-gray-600">Tax:</span>
                  <span>${receipt?.data.tax.toFixed(2)}</span>
                </div>
                {receipt?.data.tip > 0 && (
                  <div className="flex justify-between w-48">
                    <span className="text-gray-600">Tip:</span>
                    <span>${receipt?.data.tip.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between w-48 font-bold pt-2 border-t border-gray-200">
                  <span>Total:</span>
                  <span>${(receipt?.data.total_amount + (receipt?.data.tax || 0) + (receipt?.data.tip || 0)).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="mt-6 lg:mt-0 lg:w-1/3">
              <div className="sticky top-6">
                <img
                  className="w-full max-h-[32rem] object-contain mx-auto"
                  src={getImageUrl(id)}
                  alt="Receipt Image"
                  onError={handleError}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-red-500">
            Error, please try again -- ensure the image is a receipt
          </div>
        )}
      </div>
    </div>
  )
}

export default Receipt
