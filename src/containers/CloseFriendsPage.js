import React from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import ProfileCard from '../components/ProfileCard'

const CloseFriendsPage = (props) => {
    if (props.currentUser.user.username && props.users.length > 0) {
        return (
            <div>
                <Segment inverted padded='very'>
                            Close friends are generally people you have worked with in the past. <br/><br/>
                            <b>Note:</b> In order to add close friends, you must first start a conversation with someone and leave them a review.
                        </Segment>
                {props.currentUser.close_friends.length > 0
                    ? props.currentUser.close_friends.map(friend => {
                        let user = props.users.filter(user => 
                            user.id === friend.close_friend_id)[0]
                            return <ProfileCard key={user.id} user={user} />
                    })
                        : null}
            </div>
        )
    } else {
        return null
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        users: state.users
    }
}

export default connect(mapStateToProps)(CloseFriendsPage)