import { useState } from 'react'
import { createNewReceipt } from '../api/fetch'

const Scan = () => {
  const [image, setImage] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImage(file)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    const file = event.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setImage(file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (image) {
      try {
        await createNewReceipt('', image)
        // Show success message or redirect
      } catch (error) {
        console.error('Failed to upload receipt:', error)
      }
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer"
            >
              <div className="space-y-4">
                <div className="mx-auto h-12 w-12 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                  </svg>
                </div>
                <div className="text-sm text-gray-600">
                  Take a photo or upload an image
                </div>
              </div>
            </label>
          </div>

          {image && (
            <div className="mt-4">
              <div className="relative rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Receipt preview"
                  className="max-h-96 w-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="absolute top-2 right-2 p-1 rounded-full bg-gray-800 bg-opacity-50 text-white hover:bg-opacity-75"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={!image}
            className={`w-full py-3 px-4 rounded-md text-white font-medium ${
              image
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            } transition-colors`}
          >
            Upload Receipt
          </button>
        </form>
      </div>
    </div>
  )
}

export default Scan
