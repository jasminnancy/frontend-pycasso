import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Dropdown, Search, Header } from 'semantic-ui-react'
import ProfileCard from '../components/ProfileCard'

//shows all users on the SEARCH page by default

class UsersPage extends Component {
    constructor() {
        super()

        this.state = {
            search: '',
            filter: '',
            filteredUsers: []
        }
    }

    // handles user input and filter change
    // if user is typing, it sets state.search to input and passes current state.filter value
    // if user is filtering, it sets state.filter to input and passes current state.search value

    changeHandler = (e, values) => {
        if (e.target.id === 'search') {
            this.setState({
                [e.target.id]: e.target.value
            })
            this.searchHandler(e.target.value, values.filter)
        } else {
            this.setState({
                filter: e.currentTarget.id
            })
            this.searchHandler(values.search, e.currentTarget.id)
        }
    }

    // every possible search scenario has an if statement
    // if there are no filter or search terms, show all users
    // if there are only search terms, show all users that match those search terms
    // if there is only a filter, show all users that match that filter
    // if both are present, first search by filter and then by search terms

    searchHandler = (search, filter) => {
        let users = this.props.users.filter(user => user.id !== this.props.currentUser.user.id)
        
        if (search === '' && filter === '') {
            this.setState({
                filteredUsers: []
            })
        } if (search !== '' && filter === '') {
            let filtered = users.filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
            this.setState({
                filteredUsers: filtered
            })
        } if (search === '' && filter !== '') {
            let filtered = users.filter(user => user.user_type === filter)
            this.setState({
                filteredUsers: filtered
            })
        } if (search !== '' && filter !== '') {
            let filtered = users.filter(user => user.user_type === filter)
            let doubleFiltered = filtered.filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
            this.setState({
                filteredUsers: doubleFiltered
            })
        }
    }

    render() {
        if (this.props.users) {
            let users = this.props.users.filter(user => user.id !== this.props.currentUser.user.id)
            let noResults = this.state.filter !== '' || this.state.search !== ''
            
            return (
                <Grid container>
                    <Grid.Row>
                        <Grid.Column width={4} verticalAlign='middle'>
                            <Dropdown
                                id='filter'
                                floating
                                clearable
                                closeOnEscape
                                options={options}
                                placeholder='Show Only:'
                                onChange={(e) => this.changeHandler(e, this.state)}
                            />
                        </Grid.Column>
                        <Grid.Column width={8}/>
                        <Grid.Column width={4}>
                            <Search
                                id='search'
                                showNoResults={false}
                                onSearchChange={(e) => this.changeHandler(e, this.state)}
                                placeholder='Search users'  
                            />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row columns={3}>
                        {this.state.search !== '' || this.state.filter !== ''
                            ? this.state.filteredUsers.map(user =>
                                <ProfileCard 
                                    key={user.id} 
                                    user={user} 
                                />)
                                : users.map(user => 
                                    <ProfileCard
                                        key={user.id}
                                        user={user}
                                    />)}
                        {this.state.filteredUsers.length < 1 && noResults
                            ? <Header style={{color: 'white'}} content='No Results Found' /> 
                                : null}
                    </Grid.Row>
                </Grid>
            )
        }
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
        users: state.users,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(UsersPage)