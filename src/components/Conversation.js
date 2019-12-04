import React from 'react'
import { connect } from 'react-redux'
import { Segment, Header, Modal, Button, Comment, Icon } from 'semantic-ui-react'
import Message from './Message'
import NewMessageForm from './NewMessageForm'

const Conversation = (props) => {
    if (props.users.length > 0) {
        const userID = props.conversation.first_user_id === props.currentUser.user.id 
            ? props.conversation.second_user_id
                : props.conversation.first_user_id

        const otherUser = props.users.filter(user => user.id === userID)[0]

        const unread = props.conversation.messages.filter(
            message => message.user_id === otherUser.id && message.read === false)

        let message = otherUser.username
        if (unread.length === 1) {
            message = otherUser.username + ' --  ' + unread.length + ' unread message'
        } else if (unread.length > 1) {
            message = otherUser.username + ' --  ' + unread.length + ' unread messages'
        }

        return (
            <Segment secondary padded='very'>
                <Header as='h2' textAlign='left'>
                    <a href={`/users/${otherUser.username}`}>{message}</a>
                    <Modal 
                        closeIcon
                        onClose={() => window.location.reload()}
                        size='small' 
                        trigger={<Button floated='right'>Open Conversation</Button>}
                    >
                        <Modal.Content>
                            <Header as='h3' dividing>
                                Conversation with {otherUser.username}
                            </Header>
                            <Segment basic>
                                <Comment.Group>
                                    <div id='commentGroup'>
                                        {props.conversation.messages.map(message => 
                                            <Message 
                                                key={message.id} 
                                                message={message} 
                                                user={otherUser}
                                                currentUser={props.currentUser}
                                            />
                                        )}
                                    </div>
                                    <NewMessageForm 
                                        conversation={props.conversation}
                                        user={otherUser}
                                        currentUser={props.currentUser}
                                    /><br/>
                                </Comment.Group>
                            </Segment>
                        </Modal.Content>
                    </Modal>
                    {unread.length > 0
                        ? <Icon color='grey' name='mail outline' size ='big'/>
                            : null}
                </Header>
            </Segment>
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

export default connect(mapStateToProps)(Conversation)