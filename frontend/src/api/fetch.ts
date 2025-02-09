import { z } from 'zod'
import {
  createReceiptReceiptsPostResponse,
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
    // TODO: content type?
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

  // console.log(await response.text())
  // console.log(await response.json())
  const d = await response.json()
  console.log(d)
  // const data = await response.json()

  // console.log(data)
  return listReceiptsReceiptsGetResponse.parse(d)
  // return d as z.infer<typeof listReceiptsReceiptsGetResponse>
}
