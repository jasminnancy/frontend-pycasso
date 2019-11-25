import React from 'react'
import { connect } from 'react-redux'
import { Image, Card, Icon } from 'semantic-ui-react'
import FollowButton from './FollowButton'

const Sidebar = (props) => {
    if (props.user && props.currentUser) {

        return (
            <Card>
                <Image 
                    size='medium' 
                    rounded 
                    src='https://react.semantic-ui.com/images/avatar/large/matthew.png' 
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
                        {props.user.rating
                            ? props.user.rating + '/5'
                                : 'This user is unrated' }
                        <br/><br/>
                    </Card.Description>
                    <Card.Description>
                        {props.user.id !== props.currentUser.id
                            ? <FollowButton 
                                currentUser={props.currentUser}
                                following={props.following}
                                handleFollow={props.handleFollow}
                                handleUnfollow={props.handleUnfollow}
                                user={props.user} />
                                : <a href='/profile/edit'>Edit Profile</a> }
                    </Card.Description>
                </Card.Content>
                <Card.Content>
                    <Card.Description>
                        {props.user.bio}
                    </Card.Description>
                </Card.Content>
                <Card.Content>
                    <Card.Meta textAlign='left'>
                        {/* ?????? */}
                    </Card.Meta>
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
        following: state.currentUser.following
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
        },
        handleUnfollow: (user, currentUser) => {
            currentUser.following = [...currentUser.following.filter(u => u.id !== user.message)]
            dispatch({
                type: 'UNFOLLOW',
                payload: currentUser
            })
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)