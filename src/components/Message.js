import React from 'react'
import { Segment, Icon } from 'semantic-ui-react'

const Message = (props) => {
    let created = props.info.created_at
    let date = created.split('T')[0]
    let splitDate = date.split('-')
    let formattedDate = splitDate[1] + '-' + splitDate[2] + '-' + splitDate[0]

    let time = created.split('T')[1]
    let splitTime = time.split(':')
    let formattedTime = splitTime[0] > 12 
        ? splitTime[0] - 12 + ':' + splitTime[1] + ' PM' 
            : splitTime[0] + ':' + splitTime[1] + ' AM' 

    const handleClick = (message) => {
        fetch(`http://localhost:3000/messages/${message.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.jwt}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(r => r.json())
        .then(console.log)
    }

    if (props.recipient || props.sender) {
        return (
            <Segment padded='very' size='large' inverted textAlign='left'>
                {props.recipient 
                    ? 'To: ' + props.recipient.username 
                        : 'From: ' + props.sender.username} 
                {props.sender 
                    ? <Icon 
                        link
                        float='right' 
                        name='x'
                        onClick={() => handleClick(props.info)}
                    />
                        : null }
                <br/> <br/>
                {formattedTime} {formattedDate} 
                <br/><br/>
                {props.info.body}
            </Segment>
        )
    } else {
        return null
    }
}

export default Message