import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

let favouriteRecipeStore = set => ({
    favouriteRecipes: [],
    addFavouriteRecipe: recipe => set(state => ({ favouriteRecipes: [...state.favouriteRecipes, recipe] })),
    removeFavouriteRecipe: id => set(state => ({ favouriteRecipes: state.favouriteRecipes.filter(recipe => recipe.info.id !== id) })),
    resetFavouriteRecipes: () => set(state => ({ favouriteRecipes: [] }))
})
 
favouriteRecipeStore = devtools(favouriteRecipeStore)
// favouriteRecipeStore = persist(favouriteRecipeStore, { name: 'favouriteRecipes' })
export const useFavouriteRecipeStore = create(favouriteRecipeStore) 


export const useSearchRecipeStore = create(set => ({
    keyword: 'Pasta',
    setKeyword: keyword => set({ keyword }),
}));


let accessTokenStore = set => ({ 
    accessToken: '',
    setAccessToken: accessToken => set({ accessToken }),

    tokenDetails: undefined,
    setTokenDetails: tokenDetails => set({ tokenDetails }),

    userDetails: {},
    setUserDetails: userDetails => set({ userDetails }),
}) 
accessTokenStore = devtools(accessTokenStore) 
accessTokenStore = persist(accessTokenStore, { name: 'access_token' }) 
export const useAccessTokenStore = create(accessTokenStore)


export const useRecipeNutritionImageStore = create(set => ({
    nutritionImageBase64: '',
    setNutritionImageBase64: nutritionImageBase64 => set({ nutritionImageBase64 }) 
}))

export const useUserIngredientsStore = create(set => ({
    userIngredients: [],
    setUserIngredients: ingredient => set(state => ({ userIngredients: [...state.userIngredients, ingredient] })),
    removeUserIngredient: id => set(state => ({ userIngredients: state.userIngredients.filter(ingredient => ingredient.id !== id) })),
    resetUserIngredients: () => set(state => ({ userIngredients: [] }))
}))