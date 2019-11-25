import React from 'react'
import { connect } from 'react-redux'
import { Segment, Header } from 'semantic-ui-react'
import EditProfileForm from '../components/EditProfileForm'

const EditProfilePage = (props) => {
    return (
        <Segment tertiary padded='very'>
            <Header content='Edit Profile' /><br/>
                <Segment padded='very'>
                    <EditProfileForm currentUser={props.currentUser}/>
                </Segment>
        </Segment>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user
    }
}

export default connect(mapStateToProps)(EditProfilePage)