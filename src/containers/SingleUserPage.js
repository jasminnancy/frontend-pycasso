import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import Sidebar from '../components/Sidebar'
import ProfileContainer from './ProfileContainer'

const SingleUserPage = (props) => {
    let username = window.location.pathname.split('/')[2]
    let clickedUser = props.users.filter(user => user.username === username)[0]

    if (clickedUser) {
        props.selectedUser(clickedUser)
    }

    return (
        <Grid>
            <Grid.Row floated='left'>
                <Grid.Column width={11}>
                    <ProfileContainer />
                </Grid.Column>
                <Grid.Column width={5}>
                    <Sidebar 
                        user={clickedUser}
                        currentUser={props.currentUser}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        currentUser: state.currentUser.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectedUser: (user) => {
            dispatch({
                type: 'SELECTED_USER',
                payload: user
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUserPage)