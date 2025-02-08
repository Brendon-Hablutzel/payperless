import { useState } from 'react'
import { createNewReceipt } from '../api/fetch'

const Scan = () => {
  const [image, setImage] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImage(file)
    }
  }

  const [name, setName] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (image && name) {
      await createNewReceipt(name, image)
    } else {
      console.error('image upload failed')
    }

    // if (image) {
    //   const formData = new FormData()
    //   formData.append('image', image)

    //   // Send the image to the server for processing (or process it directly)
    //   const response = await fetch('/process-image', {
    //     method: 'POST',
    //     body: formData,
    //   })

    //   if (response.ok) {
    //     console.log('Image uploaded successfully!')
    //   } else {
    //     console.error('Image upload failed')
    //   }
    // }
  }

  return (
    <div className="p-5">
      <h1 className="text-6xl text-center">Scan your Receipt</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          capture="environment" // use rear camera
          onChange={handleFileChange}
        />
        <input type="submit" value="Submit" />
      </form>
      {image && (
        <div>
          <h2>Preview:</h2>
          <img src={URL.createObjectURL(image)} alt="Preview" width="200" />
        </div>
      )}
    </div>
  )
}

export default Scan
