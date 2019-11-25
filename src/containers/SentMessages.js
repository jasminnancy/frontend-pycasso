import React from 'react'
import { connect } from 'react-redux'
import Message from '../components/Message'

const SentMessages = (props) => {
    if (props.users) {
        return (
            <div>
                {props.messages.length > 0 
                    ? props.messages.map(message => 
                        <Message 
                            key={message.id} 
                            info={message}
                            recipient={props.users.filter(user => user.id === message.recipient_id)[0]}
                        />
                    )
                        : 'Your outbox is empty' }
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

export default connect(mapStateToProps)(SentMessages)