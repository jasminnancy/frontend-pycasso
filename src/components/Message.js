import React from 'react'
import { Comment, Divider } from 'semantic-ui-react'
import profilePic from '../photos/profilePic.png'

const Message = (props) => {
    let created = props.message.created_at
    let date = created.split('T')[0]
    let splitDate = date.split('-')
    let formattedDate = splitDate[1] + '-' + splitDate[2] + '-' + splitDate[0]

    let time = created.split('T')[1].split('.')[0]
    let splitTime = time.split(':')
    let hour
    let meridiem

    if (parseInt(splitTime[0]) > 12 ) {
        hour = parseInt(splitTime[0]) - 12 
        meridiem = ' PM'
    } else if (parseInt(splitTime[0]) === 0) {
        hour = 12
        meridiem = ' AM'
    } else {
        hour = parseInt(splitTime[0])
        meridiem = ' AM'
    }
    let formattedTime = hour + ':' + splitTime[1] + meridiem

    let sender = props.message.user_id === props.user.id
        ? props.user
            : props.currentUser.user

    let url = sender.username === props.currentUser.user.username 
        ? '/profile'
            : `/users/${sender.username}`

            console.log(props)
    if (props.message.user_id !== props.currentUser.user.id && props.message.read === false) {
        fetch(`https://pycasso-backend.herokuapp.com/messages/${props.message.id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.jwt}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                read: true
            })
        })
        .then(r => r.json())
        .then(console.log)
    }

    return (
        <Comment>
            <Comment.Avatar src={sender.profile_pic ? sender.profile_pic : profilePic} />
            <Comment.Content>
                <Comment.Author 
                    as='a' 
                    onClick={() => window.location.href = url}>
                    {sender.username === props.currentUser.user.username
                        ? sender.username + ' (you)'
                            : sender.username}
                </Comment.Author>
                <Comment.Metadata style={{color: 'grey'}}>
                    <div>{formattedDate} at {formattedTime}</div>
                </Comment.Metadata>
                <Comment.Text style={{color: 'black'}}>
                    {props.message.body}
                </Comment.Text>
                {props.message.user_id === props.currentUser.user.id && props.message.read === false
                    ? <Comment.Metadata style={{color: 'red'}} content='message unread'/>
                        : null}
            </Comment.Content>
            <Divider />
        </Comment>
    )
}

export default Message