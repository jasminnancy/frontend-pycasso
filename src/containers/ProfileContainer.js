import React from 'react'
import { connect } from 'react-redux'
import FeaturedPhotos from '../components/FeaturedPhotos'
import StatusFeedContainer from './StatusFeedContainer'

const ProfileContainer = (props) => {
    if (window.location.pathname === '/profile') {
        return (
            <div>
                <FeaturedPhotos /><br/><br/>
                <StatusFeedContainer user={props.selectedUser}/>
            </div>
        )
    } else {
        return (
            <div>
                <FeaturedPhotos /><br/><br/>
                <StatusFeedContainer user={props.selectedUser}/>
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        selectedUser: state.selectedUser
    }
}

export default connect(mapStateToProps)(ProfileContainer)