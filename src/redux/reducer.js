import { combineReducers } from 'redux'
//initial store state
let initialState = {
    users: [],
    currentUser: {
        user: [],
        statuses: []
    },
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

//reducer for the search bar
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

//reducer for the user that's logged in
let currentUserReducer = (state=initialState.currentUser, action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return {
                user: action.payload,
                statuses: action.payload.statuses,
                following: action.payload.following
            }
        case 'ADDED_STATUS':
            return {
                user: action.payload,
                statuses: action.payload.statuses.reverse(),
                following: action.payload.following
            }
        default:
            return state
    }
}

//reducer for the selected user (the user who's profile you click on)
let selectedUserReducer = (state=initialState.selectedUser, action) => {
    switch (action.type) {
        case 'SELECTED_USER':
            return action.payload
        default:
            return state
    }
}

//combines all reducers into the root reducer
let rootReducer = combineReducers({
    users: usersReducer,
    currentUser: currentUserReducer,
    searchQuery: searchQueryReducer,
    selectedUser: selectedUserReducer
})

export default rootReducer