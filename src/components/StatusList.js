import React from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import Status from './Status'

const StatusList = (props) => {
    if (props.user.statuses && props.user.statuses.length !== 0) {
        let user = props.selectedUser.length > 0 ? props.selectedUser : props.user
        let statuses = user.statuses.sort((a, b) => b.id - a.id)

        return(
            <div>
                {statuses.map(status => 
                    <Status 
                        selectedUser={props.selectedUser}
                        currentUser={props.currentUser.user}
                        user={props.user}
                        status={status} 
                        key={status.id}/>)
                }
            </div>
        )
    } else {
        return (
            <Segment inverted>
                <p>This user has no posts to show</p>
            </Segment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        selectedUser: state.selectedUser
    }
}

export default connect(mapStateToProps)(StatusList)