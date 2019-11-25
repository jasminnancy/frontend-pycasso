import React from 'react'
import { connect } from 'react-redux'
import Message from '../components/Message'

const ReceivedMessages = (props) => {
    if (props.users) {
        return (
            <div>
                {props.messages.length > 0
                    ? props.messages.map(message => <Message 
                        key={message.id} 
                        info={message}
                        sender={props.users.filter(user => user.id === message.sender_id)[0]}
                    />)
                        : "Your inbox is empty"}
            </div>
        )
    } else {
        return null
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(ReceivedMessages)