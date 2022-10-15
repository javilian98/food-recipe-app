import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

let favouriteRecipeStore = set => ({
    favouriteRecipes: [],
    addFavouriteRecipe: recipe => set(state => ({ favouriteRecipes: [...state.favouriteRecipes, recipe] })),
    removeFavouriteRecipe: id => set(state => ({ favouriteRecipes: state.favouriteRecipes.filter(recipe => recipe.id !== id) })),
})
 
favouriteRecipeStore = devtools(favouriteRecipeStore)
favouriteRecipeStore = persist(favouriteRecipeStore, { name: 'favouriteRecipes' })
 
export const useFavouriteRecipeStore = create(favouriteRecipeStore) 


export const useSearchRecipeStore = create(set => ({
    keyword: 'Pasta',
    setKeyword: keyword => set({ keyword }),
}));

let accessTokenStore = set => ({ 
    accessToken: '',
    setAccessToken: accessToken => set({ accessToken }) 
}) 
accessTokenStore = devtools(accessTokenStore) 
accessTokenStore = persist(accessTokenStore, { name: 'access_token' }) 
export const useAccessTokenStore = create(accessTokenStore)