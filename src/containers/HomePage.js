import React from 'react'
import { connect } from 'react-redux'
import FeedItem from '../components/FeedItem'

const HomePage = (props) => {
    if (props.users.length > 0 && props.reviews.length > 0) {
        let masterFeed = []
        props.users.map(user => 
            user.statuses.map(status => 
                masterFeed.push({status, user})))
                
        masterFeed = masterFeed.sort((a, b) => b.status.id - a.status.id)

        return (
            <div>
                {masterFeed.map(item => <FeedItem key={item.id} item={item} />)}
            </div>
        )
    } else {
        return null
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        reviews: state.reviews
    }
}

export default connect(mapStateToProps)(HomePage)