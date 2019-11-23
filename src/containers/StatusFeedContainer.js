import React from 'react'
import { connect } from 'react-redux'
import StatusForm from '../components/StatusForm'
import StatusList from '../components/StatusList'

const StatusFeedContainer = (props) => {
    if (props.user.id === props.currentUser.id) {
        return (
            <div>
                <StatusForm />
                <StatusList user={props.currentUser}/>
            </div>
        )
    } else {
        return (
            <div>
                <StatusList user={props.user}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user
    }
}

export default connect(mapStateToProps)(StatusFeedContainer)