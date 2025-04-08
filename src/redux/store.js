
import { configureStore, combineReducers, legacy_createStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 
import {reducer as authreducer} from "./auth/reducer"; 
import {reducer as productreducer} from "./product/reducer"




const persistConfig = {
  key: "root", 
  storage, 
 
};


const rootReducer = combineReducers({  auth: authreducer, product:productreducer});
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store =legacy_createStore(persistedReducer)

export const persistor = persistStore(store);


