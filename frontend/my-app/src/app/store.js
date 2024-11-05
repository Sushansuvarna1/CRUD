import {configureStore} from "@reduxjs/toolkit"
import  listSlice  from "../features/list/listSlice"
import validationReducer from "../features/list/validationSlice"
export const store=configureStore({
    reducer:{
        app:listSlice,
        validation:validationReducer
    }
})