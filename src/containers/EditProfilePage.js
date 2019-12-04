import React from 'react'
import { connect } from 'react-redux'
import { Segment, Header, Button } from 'semantic-ui-react'
import EditProfileForm from '../components/EditProfileForm'

const EditProfilePage = (props) => {
    return (
        <Segment tertiary padded='very'>
            <Header as='h1'>
                <Button 
                        basic 
                        floated='left' 
                        content='Back to Profile' 
                        onClick={() => window.location.href='/profile'}
                    />
                <div style={{marginRight: 140}}>Edit Profile</div> 
            </Header><br/>
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