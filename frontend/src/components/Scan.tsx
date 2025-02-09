import { useState } from 'react'
import { createNewReceipt } from '../api/fetch'
import { useNavigate } from 'react-router-dom'
import { GridLoader } from 'react-spinners'
import { z } from 'zod'

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

const Scan = () => {
  const [name, setName] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const [missingName, setMissingName] = useState(false)

  const [uploadingStatus, setUploadingStatus] = useState<
    'waiting' | 'uploading' | 'finished'
  >('waiting')

  const [isError, setIsError] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImage(file)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (image && name) {
      try {
        setMissingName(false)
        setUploadingStatus('uploading')
        const res = await createNewReceipt(name, image)
        console.log('asedf')
        console.log(res.data)
        expectedReceiptData.parse(res.data)
        console.log('BLAH')
        setUploadingStatus('finished')
        setTimeout(() => navigate('/user-home'), 1000)
      } catch (error) {
        setUploadingStatus('waiting')
        setIsError(true)
        console.error('Failed to upload receipt:', error)
      }
    } else if (image) {
      setMissingName(true)
    }
  }

  const navigate = useNavigate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {!image ? (
            <div className="flex flex-col items-center">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
                id="camera-input"
              />
              <label
                htmlFor="camera-input"
                className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </label>
              <p className="mt-4 text-gray-600 text-center">
                Tap to take a photo
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Receipt preview"
                  className="max-h-96 w-full object-contain"
                />
                {uploadingStatus === 'waiting' ? (
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="absolute top-2 right-2 p-2 rounded-full bg-gray-800 bg-opacity-50 text-white hover:bg-opacity-75 hover:cursor-pointer"
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
                ) : null}
              </div>
              <input
                className="border-[1px] border-gray-200 rounded-md w-full h-12 p-2 px-3 text-lg"
                placeholder="Receipt Label"
                type="text"
                value={name}
                onChange={(e) => {
                  if (e.target.value.length > 0) {
                    setMissingName(false)
                  }
                  setName(e.target.value)
                }}
              />
              {!missingName ? (
                uploadingStatus === 'waiting' ? (
                  <button
                    type="submit"
                    className={`${name.length === 0 ? 'bg-gray-400 hover:cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:cursor-pointer'} w-full py-3 px-4 text-white font-medium rounded-md transition-colors`}
                    disabled={name.length === 0}
                  >
                    Upload Receipt
                  </button>
                ) : uploadingStatus === 'uploading' ? (
                  <div className="p-2 h-10 text-lg flex items-center justify-center gap-3 w-full">
                    Processing
                    <GridLoader color="black" size={5} />
                  </div>
                ) : (
                  <div className="p-2 h-10 text-lg flex items-center justify-center gap-3 w-full text-green-600">
                    Success! Redirecting...
                  </div>
                )
              ) : null}
            </div>
          )}
        </form>
        {isError ? (
          <div className="text-red-500 text-center p-4">
            Error uploading, please try again -- ensure the image is a receipt
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Scan
