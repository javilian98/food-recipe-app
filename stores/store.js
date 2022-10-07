import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

let favouriteRecipeStore = (set) => ({
    favouriteRecipes: [],
    addFavouriteRecipe: recipe => set(state => ({ favouriteRecipes: [...state.favouriteRecipes, recipe] })),
    removeFavouriteRecipe: id => set(state => ({ favouriteRecipes: state.favouriteRecipes.filter(recipe => recipe.id !== id) })),
})

favouriteRecipeStore = devtools(favouriteRecipeStore)
favouriteRecipeStore = persist(favouriteRecipeStore, { name: 'favouriteRecipes' })
 
export const useFavouriteRecipeStore = create(favouriteRecipeStore) 