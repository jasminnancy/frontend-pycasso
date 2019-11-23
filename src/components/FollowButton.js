import React from 'react'
import { Button } from 'semantic-ui-react'

const FollowButton = (props) => {
    let user = props.user
    let currentUser = props.currentUser
    return (
        <div>
            {currentUser.following.filter(u => u.id === user.id).length < 1
                ?  <Follow 
                        user={user} 
                        currentUser={currentUser} 
                    />
                    :  <Unfollow 
                            user={user} 
                            currentUser={currentUser} 
                        />}
        </div>
    )
}

const Follow = (props) => {
    const followFetch = () => {
        fetch('http://localhost:3000/follows', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.jwt}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: props.currentUser.id,
                following_id: props.user.id
            })
        })
        .then(r => r.json())
        .then(console.log)
    }

    if (props.user && props.currentUser) {
        return (
            <div>
                <br/><br/>
                <Button onClick={followFetch} content='Follow' />
                <br/><br/>
                {props.currentUser.following.filter(user => user.id === props.currentUser.id).length > 0 
                        ? `(${props.user.username} follows you!)`
                            : null }
            </div>
        ) 
    } else {
        return null
    }
}

const Unfollow = (props) => {
    const unfollowFetch = () => {
        fetch('http://localhost:3000/find', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.jwt}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: props.currentUser.id,
                following_id: props.user.id
            })
        })
        .then(r => r.json())
        .then(console.log)
    }

    if (props.user && props.currentUser) {
        return (
            <div>
                <br/><br/>
                <Button onClick={unfollowFetch} content='Unfollow' />
                <br/><br/>
                {props.currentUser.following.filter(user => user.id === props.currentUser.id).length > 0 
                        ? `(You're mutual followers!)`
                            : null }
            </div>
        )
    } else {
        return null
    }
}

export default FollowButton