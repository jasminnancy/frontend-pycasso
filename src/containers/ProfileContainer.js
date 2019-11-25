import React from 'react'
import { connect } from 'react-redux'
import FeaturedPhotos from '../components/FeaturedPhotos'
import StatusFeedContainer from './StatusFeedContainer'

const ProfileContainer = (props) => {
    if (window.location.pathname === '/profile') {
        return (
            <div>
                <FeaturedPhotos /><br/><br/>
                <StatusFeedContainer user={props.user}/>
            </div>
        )
    } else if (window.location.pathname === `/users/${props.selectedUser.username}`) {
        return (
            <div>
                <FeaturedPhotos /><br/><br/>
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