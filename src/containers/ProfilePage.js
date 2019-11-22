import React from 'react'
import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar'
import { Grid } from 'semantic-ui-react'
import ProfileContainer from '../containers/ProfileContainer'

const ProfilePage = (props) => {
    return (
        <Grid>
            <Grid.Row floated='left'>
                <Grid.Column width={11}>
                    <ProfileContainer />
                </Grid.Column>
                <Grid.Column width={5}>
                    <Sidebar user={props.currentUser}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(ProfilePage)