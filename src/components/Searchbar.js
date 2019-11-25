import React from 'react'
import { connect } from 'react-redux'
import { Search, Segment, Header } from 'semantic-ui-react'

const Searchbar = (props) => {
    return (
        <div>
            <Search
                size='mini'
                type='text'
                aligned='right'
                placeholder='Search'
                value={props.searchQuery.input}
                results={props.searchQuery.results}
                resultRenderer={resultRenderer}
                onSearchChange={(e) => props.onChange(e.target.value)}
                onResultSelect={null}
            />
        </div>
    )
}

const resultRenderer = (user) => {
    return(
        <Segment size='small'>
            <Header as='h3' content={user.username} />
            {user.first_name + ' ' + user.last_name}
        </Segment>
    )
}

//sets the value of the searchbar to state's default searchQuery: ''
const mapStateToProps = (state) => {
    return {
        searchQuery: state.searchQuery
    }
}

//creates dispatch functions to use as props
const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (input) => { 
            dispatch({
                type: 'CHANGE_SEARCH_QUERY',
                payload: input
            }) 
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar)