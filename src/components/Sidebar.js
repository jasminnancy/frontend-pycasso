import React from 'react'
import { connect } from 'react-redux'
import { Image, Card, Icon, Modal, Button, Rating } from 'semantic-ui-react'
import FollowButton from './FollowButton'
import CloseFriendButton from './CloseFriendButton'
import Review from './Review'
import AddReviewModal from './AddReviewModal'
import profilePic from '../photos/profilePic.png'

const Sidebar = (props) => {
    if (props.user && props.currentUser && props.conversations) {
        //fixes issues with user/currentUser when re-rendering
        let userFix = props.currentUser.user
            ? props.currentUser.user
                : props.currentUser

        let conversations = props.conversations.filter(convo => 
            convo.first_user_id === props.user.id 
                || convo.second_user_id === props.user.id)

        let reviews = props.user.reviews.filter(review => 
            review.user_id === props.currentUser.id)
        return (
            <Card>
                <Image 
                    size='medium' 
                    rounded 
                    src={props.user.profile_pic
                        ? props.user.profile_pic
                            : profilePic} 
                />
                <Card.Content >
                    <Card.Header> 
                        {props.user.verified 
                            ? <Icon color='green' name='check circle'/> 
                                : null}
                        {props.user.username}
                    </Card.Header>
                    <Card.Meta>
                        {props.user.user_type}
                    </Card.Meta><br/>

                    <Card.Description>
                        {window.location.pathname !== '/profile' 
                            && props.user.id !== userFix.id
                            ? <FollowButton 
                                currentUser={userFix}
                                following={props.following}
                                handleFollow={props.handleFollow}
                                handleUnfollow={props.handleUnfollow}
                                user={props.user} />
                                : <a href='/profile/edit'>Edit Profile</a> }
                    </Card.Description>
                </Card.Content>
                <Card.Content>
                    <Card.Description>
                        {props.user.bio
                            ? props.user.bio
                                : "This user hasn't written a bio yet."}
                    </Card.Description>
                </Card.Content>
                {conversations.length > 0 && reviews.length > 0
                    ? <Card.Content>
                        <CloseFriendButton 
                            currentUser={userFix}
                            user={props.user}
                            handleFriend={props.handleFriend}
                            handleUnfriend={props.handleUnfriend}
                        />
                    </Card.Content>
                        : null}
                <Card.Content style={{color: 'black'}}>
                    {props.user.rating
                        ? <Rating 
                            icon='star' 
                            defaultRating={props.user.rating} 
                            maxRating={5} 
                            disabled
                        />
                            : null }<br/>
                    {props.user.rating
                        ? props.user.rating + '/5'
                            : 'This user is unrated' }<br/><br/>
                    <Modal 
                        trigger={<Button basic content='See All Reviews'/>} 
                        closeIcon
                    >
                        <Modal.Header content={`Reviews for ${props.user.username}`} />
                        <Modal.Content>
                            {props.user.reviews.length < 1 
                                ? <p style={{color: 'black'}}>This user has no reviews</p>
                                    : null}
                            {props.user.reviews.reverse().map(review => 
                                    <Review key={review.id} review={review} />
                                )}
                        </Modal.Content>
                    </Modal><br/><br/>
                    {conversations.length > 0 && props.user.id !== userFix.id
                        ? <AddReviewModal 
                            user={props.user}
                            currentUser={props.currentUser}
                        />
                            : null}
                </Card.Content>
            </Card>
        )
    } else {
        return null
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user,
        following: state.currentUser.following,
        conversations: state.conversations
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleFollow: (user, currentUser) => { 
            currentUser.following = [...currentUser.following, user]
            dispatch({
                type: 'FOLLOW',
                payload: currentUser
            })

            let number = parseInt(document.querySelector('#followerCount').innerText.split(' ')[1]) + 1
            document.querySelector('#followerCount').innerText = `Followers: ${number}`
        },
        handleUnfollow: (user, currentUser) => {
            currentUser.following = [...currentUser.following.filter(u => u.id !== user.message)]
            dispatch({
                type: 'UNFOLLOW',
                payload: currentUser
            })


            let number = parseInt(document.querySelector('#followerCount').innerText.split(' ')[1]) - 1
            document.querySelector('#followerCount').innerText = `Followers: ${number}`
        },
        handleFriend: (user, currentUser) => {
            currentUser.close_friends = [...currentUser.close_friends, user]
            dispatch({
                type: 'FRIEND',
                payload: currentUser
            })
        },
        handleUnfriend: (user, currentUser) => {
            currentUser.close_friends = [...currentUser.close_friends.filter(u => u.id !== user.message)]
            dispatch({
                type: 'UNFRIEND',
                payload: currentUser
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)