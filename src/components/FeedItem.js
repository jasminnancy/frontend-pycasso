import React from 'react'
import { Segment, Grid, Header, Image } from 'semantic-ui-react'
import profilePic from '../photos/profilePic.png'

const FeedItem = (props) => {
    let created = props.item.status.created_at
    let date = created.split('T')[0]
    let splitDate = date.split('-')
    let formattedDate = splitDate[1] + '-' + splitDate[2] + '-' + splitDate[0]

    let time = created.split('T')[1]
    let splitTime = time.split(':')
    let formattedTime = splitTime[0] > 12 
        ? splitTime[0] - 12 + ':' + splitTime[1] + ' PM ' 
            : splitTime[0] + ':' + splitTime[1] + ' AM '

    return (
        <Segment inverted>
            <Grid>
                <Grid.Column width={2}>
                    <Image inline src={props.item.user.profile_pic ? props.item.user.profile_pic : profilePic} />
                </Grid.Column>
                <Grid.Column width={4} textAlign='left'>
                    <Grid.Row >
                        <Header as='h2'>
                            <a href={`/user/${props.item.user.username}`}>{props.item.user.username}</a>
                        </Header>
                    </Grid.Row><br/>
                    <Grid.Row>
                        {formattedDate} at {formattedTime}
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column width={9} textAlign='left'>
                    {props.item.status.content}
                </Grid.Column>
            </Grid>
        </Segment>
    )
}

export default FeedItem