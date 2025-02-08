import { z } from 'zod'
import { createReceiptReceiptsPostResponse } from './types'

const BASE_URL = 'http://localhost:8000'

export const createNewReceipt = async (
  name: string,
  image: File
): Promise<z.infer<typeof createReceiptReceiptsPostResponse>> => {
  const formData = new FormData()
  formData.append('name', name)
  formData.append('image', image)

  const response = await fetch(BASE_URL + '/receipts', {
    method: 'POST',
    body: formData,
    // TODO: content type?
  })

  const data = await response.json()

  console.log(data)
  // :|
  data['timestamp'] = data['timestamp'] + 'Z'
  return createReceiptReceiptsPostResponse.parse(data)
}

export const getImageUrl = (receiptId: string): string => {
  return `${BASE_URL}/receipts/${receiptId}/image`
}
