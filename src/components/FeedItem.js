import React from 'react'
import { Segment, Grid, Header } from 'semantic-ui-react'

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
                <Grid.Column width={5} verticalAlign='bottom'>
                    <Grid.Row >
                        <Header as='h2'>
                            <a href={`/user/${props.item.user.username}`}>{props.item.user.username}</a>
                        </Header>
                    </Grid.Row><br/>
                    <Grid.Row>
                        {formattedDate} at {formattedTime}
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column width={10} textAlign='left'>
                    {props.item.status.content}
                </Grid.Column>
            </Grid>
        </Segment>
    )
}

export default FeedItem