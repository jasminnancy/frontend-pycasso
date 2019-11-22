import { combineReducers } from 'redux'
//initial store state
let initialState = {
    users: [],
    currentUser: [],
    searchQuery: {
        input: '',
        results: []
    },
    selectedUser: []
}

let usersReducer = (state=initialState.users, action) => {
    switch(action.type) {
        case 'ADD_USERS':
            return action.payload
        default:
            return state
    }
}

let searchQueryReducer = (state=initialState.searchQuery, action) => {
    switch (action.type) {
        case 'CHANGE_SEARCH_QUERY':
            return {
                input: action.payload,
                results: initialState.users.filter(
                    user => user.username.includes(action.payload)
                )
            }
        default:
            return state
    }
}

let currentUserReducer = (state=initialState.currentUser, action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return action.payload
        default:
            return state
    }
}

let selectedUserReducer = (state=initialState.selectedUser, action) => {
    switch (action.type) {
        case 'SELECTED_USER':
            return action.payload
        default:
            return state
    }
}

//state: reducerForState
let rootReducer = combineReducers({
    users: usersReducer,
    currentUser: currentUserReducer,
    searchQuery: searchQueryReducer,
    selectedUser: selectedUserReducer
})

export default rootReducer