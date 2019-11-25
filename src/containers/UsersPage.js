import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Dropdown } from 'semantic-ui-react'
import ProfileCard from '../components/ProfileCard'

//shows all users on the GLOBAL page
class UsersPage extends Component {
    constructor() {
        super()

        this.state = {
            users: []
        }
    }

    //handles the user filter && clears filter when cleared
    //first grid row is the filter
    //second grid row is the conditional rendering

    changeHandler = (e) => {
        if (e.currentTarget.id !== '') {
            let filtered = this.props.users.filter(
                user => user.user_type === e.currentTarget.id
            )
            this.setState({
                users: filtered
            })
        } else {
            this.setState({
                users: []
            })
        }
    }

    render() {
        return (
            <Grid container>
                <Grid.Row>
                        <Dropdown
                            clearable
                            closeOnEscape
                            options={options}
                            placeholder='Show Only:'
                            onChange={(e) => this.changeHandler(e)}
                        />
                </Grid.Row>

                <Grid.Row columns={3}>
                    {this.state.users.length > 0 
                        ? this.state.users.map(user => 
                            <ProfileCard 
                                key={user.id} 
                                user={user} 
                            />)
                            : this.props.users.map(user => 
                                <ProfileCard
                                    key={user.id}
                                    user={user}
                                />)}
                </Grid.Row>
            </Grid>
        )
    }
}

//options for filter (id === user_type)
const options = [
    { id: 'Photographer', text: 'Photographers', value: 'Photographers' },
    { id: 'Model', text: 'Models', value: 'Models' },
    { id: 'Other', text: 'Other', value: 'Other' },
]

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(UsersPage)