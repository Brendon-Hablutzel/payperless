import { z } from 'zod'
import {
  createReceiptReceiptsPostResponse,
  getReceiptReceiptsIdGetResponse,
  listReceiptsReceiptsGetResponse,
} from './types'

const BASE_URL = import.meta.env.VITE_API_URL

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
  })

  const data = await response.json()

  console.log(data)
  return createReceiptReceiptsPostResponse.parse(data)
}

export const getImageUrl = (receiptId: string): string => {
  return `${BASE_URL}/receipts/${receiptId}/image`
}

export const listReceipts = async (): Promise<
  z.infer<typeof listReceiptsReceiptsGetResponse>
> => {
  const response = await fetch(BASE_URL + '/receipts')

  const d = await response.json()
  console.log(d)

  return listReceiptsReceiptsGetResponse.parse(d)
}

export const getReceipt = async (
  id: string
): Promise<z.infer<typeof getReceiptReceiptsIdGetResponse>> => {
  const response = await fetch(BASE_URL + '/receipts/' + id)

  const d = await response.json()

  return getReceiptReceiptsIdGetResponse.parse(d)
}
