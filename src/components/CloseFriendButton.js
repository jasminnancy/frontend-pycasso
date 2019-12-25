import React from 'react'
import { Button } from 'semantic-ui-react'

// A button to add a user as a close friend
// Conditionally renders whether you're close friends already or not
const CloseFriendButton = (props) => {
    let user = props.user
    let currentUser = props.currentUser

    // checks to make sure that all props have been passed
    if (user && currentUser) {
        return (
            <div>
                {currentUser.close_friends.filter(u => u.id === user.id).length < 1
                    ?  <AddFriend 
                            user={user} 
                            currentUser={currentUser} 
                            handleFriend={props.handleFriend}
                        />
                        :  <RemoveFriend 
                                user={user} 
                                currentUser={currentUser} 
                                handleUnfriend={props.handleUnfriend}
                            />}
            </div>
        )
    } else {
        return null
    }
}

// Add friend button
const AddFriend = (props) => {
    const addFriendFetch = () => {
        fetch('https://pycasso-backend.herokuapp.com/close_friends', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.jwt}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: props.currentUser.id,
                close_friend_id: props.user.id
            })
        })
        .then(r => r.json())
        .then(data => {
            props.handleFriend(props.user, props.currentUser)
        })
    }

    if (props.user && props.currentUser) {
        return (
            <Button 
                color='green' 
                inverted 
                onClick={addFriendFetch} 
                content='Add Close Friend' 
            />
        )
    } else {
        return null
    }
}

// remove friend button
const RemoveFriend = (props) => {
    const removeFriendFetch = () => {
        fetch('https://pycasso-backend.herokuapp.com/remove', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.jwt}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: props.currentUser.id,
                close_friend_id: props.user.id
            })
        })
        .then(r => r.json())
        .then(data => {
            props.handleUnfriend(data, props.currentUser)
        })
    }

    if (props.user && props.currentUser) {
        return (
            <Button 
                color='red'
                inverted 
                onClick={removeFriendFetch} 
                content='Remove Close Friend' 
            />
        )
    } else {
        return null
    }
}

export default CloseFriendButton