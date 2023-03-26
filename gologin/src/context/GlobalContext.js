import { createContext, useReducer } from 'react'

export const GlobalContext = createContext(null)

export const globalReducer = (state, action) => {
    switch (action.type) {
        case 'SET-TABLE':
            let newTable = state.table.splice()
            newTable.push(action.payload)
            return {
                table: newTable,
                data: state.data
            }
        case 'SET-DATA':
            return {
                table: state.table,
                data: action.payload
            }
        case 'DROP':
            return {
                table: [],
                data: ''
            }
        default:
            return state
    }
}

export const GlobalContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, {
        table: [],
        data: ""
    })

    return (
        <GlobalContext.Provider value={{...state, dispatch}}>
            { children }
        </GlobalContext.Provider>
    )
}
