const initialState = ''

const filterReducer = (state = initialState, action) => {
    switch( action.type ) {
        case 'SET_FILTER':
            return action.filter
        case 'RESET_FILTER':
            return initialState    
        default:
            return state    
    }
}

export const setFilter = (filter) => {
    return { type: 'SET_FILTER', filter}
}

export const resetFilter = () => {
    return {type: 'RESET_FILTER'}
}

export default filterReducer