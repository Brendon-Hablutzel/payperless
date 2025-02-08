import { useParams } from 'react-router-dom'
import { getImageUrl } from '../api/fetch'
import { useState } from 'react'

const ViewReceipt = () => {
  const params = useParams()

  const [imgExists, setImgExists] = useState(true)

  const handleError = () => {
    setImgExists(false)
  }

  return params['id'] && imgExists ? (
    <div>
      <img
        src={getImageUrl(params['id'])}
        alt="Preview"
        onError={handleError}
      />
    </div>
  ) : (
    <div>not found</div>
  )
}

export default ViewReceipt
