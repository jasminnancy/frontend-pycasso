import React from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import Status from './Status'

const StatusList = (props) => {
    if (props.user.statuses && props.user.statuses.length !== 0) {
        return(
            <div>
                {props.user.statuses.reverse().map(status => 
                    <Status 
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
        selectedUser: state.selectedUser
    }
}

export default connect(mapStateToProps)(StatusList)