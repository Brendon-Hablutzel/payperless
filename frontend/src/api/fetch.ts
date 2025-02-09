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

export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  image: string;
  description: string;
  instructions?: string[];
}

export interface RecipeSuggestions {
  recipes: Recipe[];
}

export interface RecipeDetails {
  details: string;
}

export const getRecipeSuggestions = async (): Promise<RecipeSuggestions> => {
  const response = await fetch(`${BASE_URL}/recipes/suggestions`);
  const data = await response.json();
  return data;
};

export interface RecipeInput {
  name: string;
  ingredients: string[];
  description?: string;
}

export const getRecipeDetails = async (recipe: RecipeInput): Promise<RecipeDetails> => {
  const params = new URLSearchParams({
    ingredients: recipe.ingredients.join(',')
  });
  if (recipe.description) {
    params.append('description', recipe.description);
  }
  
  const response = await fetch(
    `${BASE_URL}/recipes/${encodeURIComponent(recipe.name)}/details?${params.toString()}`
  );
  const data = await response.json();
  return data;
};

export interface ImageSearchResponse {
  images: string[];
}

export const searchImages = async (query: string): Promise<ImageSearchResponse> => {
  const response = await fetch(`${BASE_URL}/images/search/${encodeURIComponent(query)}`);
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data.error || 'Failed to search images');
};
