import React from 'react'
import { appState , appReducer } from './Reducer.js'
import { createContext, useReducer } from 'react';

function ContextStore(props) {

    const [appData, dispatch] = useReducer(appReducer, appState);

    return (
        <AppContext.Provider value={[appData,dispatch]}>
           {props.children}
       </AppContext.Provider>
    )
}

export default ContextStore
export const AppContext = createContext();
