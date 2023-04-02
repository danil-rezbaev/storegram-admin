import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";
import { Product, Store, StoreShort } from "../../types/Store";
import { Category } from "../../pages/Categories/CategoriesTypes";

// export const fetchCreateStore = createAsyncThunk('store/create', async (params: {}) => {
//   const { data } = await axios.post('/store/create', params)
//   return data
// })

export const fetchGetStore = createAsyncThunk('store/get', async (params: {id: string}) => {
  const {id} = params
  const { data } = await axios.get(`/store/${id}`)
  return data
})

const omitId = (array: StoreShort[], id: string): StoreShort[] => {
  let accum = []

  for(let i = 0; i < array.length; i++) {
    if(array[i].id !== id) {
      accum.push(array[i])
    }
  }

  return accum
}

export type StoreSlice = {
  current: StoreShort | null,
  currentStore: Store | null,
  default: StoreShort[],
  modifier: StoreShort[],
}

function isStoreShort (obj: any): obj is StoreShort {
  if (!obj) return false

  const objAsGlobalState = obj as StoreShort
  return (objAsGlobalState.id !== undefined &&
    objAsGlobalState.title !== undefined)
}

const currentDefaultFormat = isStoreShort(JSON.parse(localStorage.getItem('store') as string))
  ? JSON.parse(localStorage.getItem('store') as string)
  : null

const saveCurrentStore = (state: StoreShort | null) => {
  if (state) {
    localStorage.setItem('store', JSON.stringify(state))
  }
}

const initialState: StoreSlice = {
  current: currentDefaultFormat,
  currentStore: null,
  default: [],
  modifier: [],
}

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    initializeStores(state, action: PayloadAction<{data: StoreShort[]}>) {
      const {data} = action.payload

      if(data) {
        state.default = data
        state.modifier = data.slice(1, 100)

        if(!window.localStorage.getItem('store')) {
          state.current = data[0]
        }
      }

      saveCurrentStore(state.current)
    },
    changeStore(state, action: PayloadAction<{id: string}>) {
      const {id} = action.payload
      const getElement = state.default.find(item => item.id === id)

      if(getElement) {
        state.current = getElement
      }

      state.modifier = omitId(state.default, id)
      saveCurrentStore(state.current)
    },

    addProduct(state, action: PayloadAction<{product: Product}>) {
      const {product} = action.payload

      if (state.currentStore) {
        state.currentStore.products = [
          ...state.currentStore.products,
          product
        ]
      }
    },

    editProduct(state, action: PayloadAction<{product: Product}>) {
      const {product} = action.payload

      if (state.currentStore) {
        const newList = state.currentStore.products.map((item) => {
          if(item._id === product._id) {
            return product
          }
          return item
        })

        state.currentStore.products = newList
      }

      saveCurrentStore(state.current)
    },

    deleteProduct(state, action: PayloadAction<{id: string}>) {
      const {id} = action.payload

      if (state.currentStore) {
        const filterList = state.currentStore.products
          .filter((item) => item._id !== id)

        state.currentStore.products = filterList
      }

      saveCurrentStore(state.current)
    },

    addCategory(state, action: PayloadAction<{category: Category}>) {
      const {category} = action.payload

      if (state.currentStore) {
        state.currentStore.categories = [
          ...state.currentStore.categories,
          category
        ]
      }
    },

    editCategory(state, action: PayloadAction<{category: Category}>) {
      const {category} = action.payload

      if (state.currentStore) {
        const newList = state.currentStore.categories.map((item) => {
          if(item.id === category.id) {
            return category
          }
          return item
        })

        state.currentStore.categories = newList
      }

      saveCurrentStore(state.current)
    },

    deleteCategory(state, action: PayloadAction<{id: string}>) {
      const {id} = action.payload

      if (state.currentStore) {
        const filterList = state.currentStore.categories
          .filter((item) => item.id !== id)

        state.currentStore.categories = filterList
      }

      saveCurrentStore(state.current)
    },
  },
  extraReducers: {
    // @ts-ignore
    [fetchGetStore.fulfilled]: (state, action) => {
      state.currentStore = action.payload
      saveCurrentStore(state.current)
    },
    // @ts-ignore
    // [fetchCreateStore.fulfilled]: (state, action) => {
    //   state.current = action.payload
    //   // saveCurrentStore(state.current)
    // },
  }
})

export const { initializeStores, changeStore, addProduct, editProduct, deleteProduct, addCategory, editCategory, deleteCategory } = storeSlice.actions

export default storeSlice.reducer
