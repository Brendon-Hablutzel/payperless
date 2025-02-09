import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getImageUrl, getReceipt } from '../api/fetch'
import { getReceiptReceiptsIdGetResponse } from '../api/types'
import { z } from 'zod'
import { GridLoader } from 'react-spinners'
import MealPlanner from './MealPlanner'

const Receipt = () => {
  const params = useParams()
  const navigate = useNavigate()
  const id = params['id']

  const [showMealPlanner, setShowMealPlanner] = useState(false)
  const [showBudgetTips, setShowBudgetTips] = useState(false)
  const [showEcoTips, setShowEcoTips] = useState(false)
  const [generatedBudgetTips, setGeneratedBudgetTips] = useState<
    Array<{ tip: string; impact?: string; savings?: number }>
  >([])
  const [generatedEcoTips, setGeneratedEcoTips] = useState<
    Array<{ tip: string; impact: string; co2_saved?: number }>
  >([])

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

  const handleGenerateBudgetTips = () => {
    // Mock budget tips generation
    const tips = [
      {
        tip: 'Consider buying in bulk for frequently purchased items',
        impact: 'Long-term savings on groceries',
        savings: 25.5,
      },
      {
        tip: 'Look for seasonal alternatives for expensive produce',
        impact: 'Reduce produce expenses',
        savings: 15.75,
      },
      {
        tip: 'Compare prices across different stores',
        impact: 'Better deals on regular purchases',
        savings: 35.9,
      },
    ]
    setGeneratedBudgetTips(tips)
    setShowBudgetTips(true)
  }

  const handleGenerateEcoTips = () => {
    // Mock eco tips generation
    const tips = [
      {
        tip: 'Choose local produce over imported items',
        impact: 'Reduces transportation emissions',
        co2_saved: 2.5,
      },
      {
        tip: 'Opt for products with minimal packaging',
        impact: 'Reduces plastic waste and packaging emissions',
        co2_saved: 1.8,
      },
      {
        tip: 'Buy seasonal produce',
        impact: 'Reduces energy used in greenhouse cultivation',
        co2_saved: 3.2,
      },
    ]
    setGeneratedEcoTips(tips)
    setShowEcoTips(true)
  }

  const chatUrl = receipt ? `https://hackduke.streamlit.app/?reclist=${encodeURIComponent(JSON.stringify([receipt.data]))}&embed=true` : '';

  const Modal = ({
    show,
    onClose,
    title,
    children,
  }: {
    show: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
  }) => {
    if (!show) return null

    return (
      <div
        className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center p-4 z-50"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-5 bg-white">
      <div className="flex items-start mb-6 bg-white justify-center">
        {receipt === undefined && !isError ? (
          <div className="flex justify-center">
            <GridLoader />
          </div>
        ) : receipt && !isError && imgExists ? (
          <div className="w-full max-w-6xl mx-auto lg:flex lg:gap-8">
            {/* Receipt Details Section */}
            <div className="w-full lg:w-2/3">
              <h2 className="text-2xl font-bold mb-4">{receipt?.data.store_name || 'Receipt Details'}</h2>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={handleGenerateBudgetTips}
                  className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  Budget Tips
                </button>
                {/* test */}
                <button
                  onClick={handleGenerateEcoTips}
                  className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.382 4.317C8.056 2.242 11.356 1.5 15 1.5c1.941 0 3.384.196 4.596.598a1 1 0 01.71 1.212l-2.067 7.23a1 1 0 01-.572.642l-3.83 1.914a1 1 0 01-.892 0l-3.83-1.914a1 1 0 01-.572-.642L6.477 3.31a1 1 0 01.71-1.212C8.615 1.696 10.878 1.5 15 1.5zM15 0C11.097 0 7.557.779 3.621 3.004a2.5 2.5 0 00-1.176 3.031l2.066 7.23a2.5 2.5 0 001.429 1.607l3.83 1.914a2.5 2.5 0 002.23 0l3.83-1.914a2.5 2.5 0 001.429-1.607l2.066-7.23a2.5 2.5 0 00-1.176-3.031C16.443.779 12.903 0 9 0z" clipRule="evenodd" />
                  </svg>
                  Eco Tips
                </button>
                <button
                  onClick={() => setShowMealPlanner(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  Recipe Ideas
                </button>
                <button
                  onClick={() => navigate(`/share-receipt/${id}`)}
                  className="inline-flex items-center px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  Share
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-4">
                {receipt?.data.store_name || 'Receipt Details'}
              </h2>

              <div className="mb-4">
                <p className="text-gray-600">Date: {receipt.data.date}</p>
                {receipt.data.address && (
                  <p className="text-gray-600">
                    Address: {receipt.data.address}
                  </p>
                )}
                {receipt.data.phone_number && (
                  <p className="text-gray-600">
                    Phone: {receipt.data.phone_number}
                  </p>
                )}
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
                    {receipt.data.items.map((item: any, index: any) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 last:border-0"
                      >
                        <td className="py-2">{item?.name ?? ''}</td>
                        <td className="py-2">{item?.quantity ?? ''}</td>
                        <td className="py-2 text-right">
                          ${item?.price ? item.price.toFixed(2) : ''}
                        </td>
                        <td className="py-2 text-right">
                          {item?.price && item?.quantity
                            ? `$${(item.quantity * item.price).toFixed(2)}`
                            : ''}
                        </td>
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
                  <span>
                    $
                    {(
                      receipt?.data.total_amount +
                      (receipt?.data.tax || 0) +
                      (receipt?.data.tip || 0)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="mt-6 lg:mt-0 lg:w-1/3">
              <div className="sticky top-6">
                <img
                  className="w-full max-h-[32rem] object-contain mx-auto rounded-lg shadow-lg"
                  src={getImageUrl(id)}
                  alt="Receipt Image"
                  onError={handleError}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-red-500">Error, please try again</div>
        )}
      </div>

      {/* Chat Section */}
      {receipt && !isError && imgExists && (
        <div className="mt-8 w-full max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Chat with your Receipt</h2>
          <div className="w-full h-[600px] rounded-lg border border-gray-200 shadow-lg overflow-hidden">
            <iframe
              src={chatUrl}
              className="w-full h-full"
              title="Receipt Chat"
            />
          </div>
        </div>
      )}

      {/* Budget Tips Modal */}
      <Modal
        show={showBudgetTips}
        onClose={() => setShowBudgetTips(false)}
        title="Budget Tips"
      >
        <div className="space-y-4">
          {generatedBudgetTips.map((tip, index) => (
            <div
              key={index}
              className="bg-emerald-50/50 backdrop-blur-sm rounded-lg p-4 border border-emerald-100"
            >
              <div className="flex items-start gap-3">
                <svg
                  className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <div>
                  <p className="font-medium text-emerald-900">{tip.tip}</p>
                  {tip.impact && (
                    <p className="text-sm text-emerald-700 mt-1">
                      {tip.impact}
                    </p>
                  )}
                  {tip.savings && (
                    <p className="text-sm font-medium text-emerald-700 mt-1">
                      Potential savings: ${tip.savings.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Eco Tips Modal */}
      <Modal
        show={showEcoTips}
        onClose={() => setShowEcoTips(false)}
        title="Sustainability Tips"
      >
        <div className="space-y-4">
          {generatedEcoTips.map((tip, index) => (
            <div
              key={index}
              className="bg-green-50/50 backdrop-blur-sm rounded-lg p-4 border border-green-100"
            >
              <div className="flex items-start gap-3">
                <svg
                  className="h-6 w-6 text-green-600 mt-1 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
                <div>
                  <p className="font-medium text-green-900">{tip.tip}</p>
                  <p className="text-sm text-green-700 mt-1">{tip.impact}</p>
                  {tip.co2_saved && (
                    <p className="text-sm font-medium text-green-700 mt-1">
                      CO₂ reduction: {tip.co2_saved.toFixed(1)} kg/month
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Meal Planner Modal */}
      {showMealPlanner && (
        <MealPlanner onClose={() => setShowMealPlanner(false)} />
      )}
    </div>
  )
}

export default Receipt
