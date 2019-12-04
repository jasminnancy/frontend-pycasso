import { combineReducers } from 'redux'
//initial store state
let initialState = {
    users: [],
    currentUser: {
        user: [],
        statuses: [],
        following: [],
        reviews: [],
        closeFriends: []
    },
    searchQuery: {
        input: '',
        results: []
    },
    selectedUser: [],
    verifications: [],
    conversations: []
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
                following: action.payload.following,
                reviews: action.payload.reviews,
                close_friends: action.payload.close_friends
            }
        case 'ADDED_STATUS':
            return {
                user: action.payload,
                statuses: action.payload.statuses.reverse(),
                following: action.payload.following,
                reviews: action.payload.reviews,
                close_friends: action.payload.close_friends
            }
        case 'DELETED_STATUS':
            return {
                user: action.payload,
                statuses: action.payload.statuses.reverse(),
                following: action.payload.following,
                reviews: action.payload.reviews,
                close_friends: action.payload.close_friends
            }
        case 'FOLLOW':
            return {
                user: action.payload,
                statuses: action.payload.statuses,
                following: action.payload.following,
                reviews: action.payload.reviews,
                close_friends: action.payload.close_friends
            }
        case 'UNFOLLOW':
            return {
                user: action.payload,
                statuses: action.payload.statuses,
                following: action.payload.following,
                reviews: action.payload.reviews,
                close_friends: action.payload.close_friends
            }
        case 'FRIEND':
            return {
                user: action.payload,
                statuses: action.payload.statuses,
                following: action.payload.following,
                reviews: action.payload.reviews,
                close_friends: action.payload.close_friends
            }
        case 'UNFRIEND':
            return {
                user: action.payload,
                statuses: action.payload.statuses,
                following: action.payload.following,
                reviews: action.payload.reviews,
                close_friends: action.payload.close_friends
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
        case 'ADD_HEART':
            debugger
            return action.payload
        default:
            return state
    }
}

//reducer for the account verification request
let verificationsReducer = (state=initialState.verifications, action) => {
    switch(action.type) {
        case 'SEND_VERIFICATION_REQUEST':
            return action.payload
        default:
            return state
    }
}

let conversationsReducer = (state=initialState.conversations, action) => {
    switch(action.type) {
        case 'GET_CONVOS':
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
    selectedUser: selectedUserReducer,
    verifications: verificationsReducer,
    conversations: conversationsReducer
})

export default rootReducer