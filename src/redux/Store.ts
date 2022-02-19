import { applyMiddleware, createStore, Store } from "redux"
import { createEpicMiddleware } from "redux-observable"
import { Persistor, persistReducer, persistStore } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import RootEpic from "./RootEpic"
import RootReducer from "./RootReducer"

const epicEffect = createEpicMiddleware()
const persitConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['account']
}

const presitReducer = persistReducer(persitConfig, RootReducer)
const store: Store = createStore(presitReducer, applyMiddleware(epicEffect))
epicEffect.run(RootEpic)

const persistor: Persistor = persistStore(store)
const rdx =  { store, persistor }

export default rdx