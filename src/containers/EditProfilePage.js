import React from 'react'
import { connect } from 'react-redux'
import { Segment, Header } from 'semantic-ui-react'
import EditProfileForm from '../components/EditProfileForm'

const EditProfilePage = (props) => {
    return (
        <Segment tertiary>
            <Header content='Edit Profile' /><br/>
                <EditProfileForm currentUser={props.currentUser}/>
        </Segment>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user
    }
}

export default connect(mapStateToProps)(EditProfilePage)