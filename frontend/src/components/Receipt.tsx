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
      <div className="flex items-center mb-6 bg-white">
        {!isError && imgExists ? (
          <div>
            <div>Receipt: {id}</div>
            <div>{JSON.stringify(receipt)}</div>
            <div>
              <img
                className="h-[20rem]"
                src={getImageUrl(id)}
                alt="Preview"
                onError={handleError}
              />
            </div>
          </div>
        ) : (
          <div className="text-red-500">Error, please try again</div>
        )}
      </div>
    </div>
  )
}

export default Receipt
