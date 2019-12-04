import React from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import Conversation from '../components/Conversation'

const Conversations = (props) => {
    if (props.conversations.length > 0) {
        return (
            <Segment inverted padded='very'>
                {props.conversations.map(conversation => 
                    <Conversation 
                        key ={conversation.id} 
                        conversation={conversation} 
                        currentUser={props.currentUser}
                    />
                )}
            </Segment>
        )
    } else {
        return (
            <Segment inverted padded='very'>
                You have no conversations to show. <br/>
                Message someone to get a conversation going!
            </Segment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        conversations: state.conversations
    }
}

export default connect(mapStateToProps)(Conversations)