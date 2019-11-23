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
                    <ProfileContainer user={props.user}/>
                </Grid.Column>
                <Grid.Column width={5}>
                    <Sidebar user={
                        props.user.username 
                            ? props.user 
                                : props.user.user }
                        currentUser={
                            props.user.username 
                            ? props.user 
                                : props.user.user }
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.currentUser.user
    }
}

export default connect(mapStateToProps)(ProfilePage)