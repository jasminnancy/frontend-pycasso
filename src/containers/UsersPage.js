import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import ProfileCard from '../components/ProfileCard'

const UsersPage = (props) => {
    return (
        <Grid container>
            <Grid.Row columns={3}>
                {props.users.map(user => 
                    <ProfileCard 
                        key={user.id} 
                        user={user} 
                    />
                )}
            </Grid.Row>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(UsersPage)