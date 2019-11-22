import React from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'

const StatusList = (props) => {
    return (
        <Segment>

        </Segment>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedUser: state.selectedUser
    }
}

export default connect(mapStateToProps)(StatusList)