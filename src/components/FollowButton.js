import React from 'react'
import { Button } from 'semantic-ui-react'

const FollowButton = (props) => {
    let user = props.user
    let currentUser = props.currentUser

    if (user && currentUser) {
        return (
            <div>
                {currentUser.following.filter(u => u.id === user.id).length < 1
                    ?  <Follow 
                            user={user} 
                            currentUser={currentUser} 
                            handleFollow={props.handleFollow}
                        />
                        :  <Unfollow 
                                user={user} 
                                currentUser={currentUser} 
                                handleUnfollow={props.handleUnfollow}
                            />}
            </div>
        )
    } else {
        return null
    }
}

const Follow = (props) => {
    let followerCount = props.user.followers.length

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
        .then(data => {
            props.handleFollow(props.user, props.currentUser)
        })
    }

    if (props.user && props.currentUser) {
        let userFix = props.currentUser.user
            ? props.currentUser.user
                : props.currentUser
                debugger
        return (
            <div>
                Followers: {followerCount} 
                <br/><br/>
                <Button onClick={followFetch} content='Follow' />
                <br/><br/>
                {userFix.followers.filter(user => user.id === userFix.id).length > 0 
                        ? `(${props.user.username} follows you!)`
                            : null }
            </div>
        ) 
    } else {
        return null
    }
}

const Unfollow = (props) => {
    let followerCount = props.user.followers.length

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
        .then(data => {
            props.handleUnfollow(data, props.currentUser)
        })
    }

    if (props.user && props.currentUser) {
        return (
            <div>
                Followers: {followerCount} 
                <br/><br/>
                <Button onClick={unfollowFetch} content='Unfollow' />
                <br/><br/>
                {props.currentUser.followers.filter(user => user.id === props.currentUser.id).length > 0 
                        ? `(You're mutual followers!)`
                            : null }
            </div>
        )
    } else {
        return null
    }
}

export default FollowButton