import React from 'react'
import { connect } from 'react-redux'
import FeaturedPhotos from '../components/FeaturedPhotos'
import StatusFeedContainer from './StatusFeedContainer'

const ProfileContainer = (props) => {
    if (window.location.pathname === '/profile') {
        let userFix = props.user.username ? props.user : props.user.user
        return (
            <div>
                <FeaturedPhotos user={userFix} /><br/><br/>
                <StatusFeedContainer user={userFix} />
            </div>
        )
    } else if (window.location.pathname === `/users/${props.selectedUser.username}`) {
        return (
            <div>
                <FeaturedPhotos user={props.selectedUser} /><br/><br/>
                <StatusFeedContainer user={props.selectedUser}/>
            </div>
        )
    } else {
        return null
    }
    
}

const mapStateToProps = (state) => {
    return {
        user: state.currentUser.user,
        selectedUser: state.selectedUser
    }
}

export default connect(mapStateToProps)(ProfileContainer)