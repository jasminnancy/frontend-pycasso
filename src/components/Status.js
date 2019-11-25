import React from 'react'
import { Segment, Grid } from 'semantic-ui-react'

const Status = (props) => {
    let created = props.status.created_at
    let date = created.split('T')[0]
    let splitDate = date.split('-')
    let formattedDate = splitDate[1] + '-' + splitDate[2] + '-' + splitDate[0]

    let time = created.split('T')[1]
    let splitTime = time.split(':')
    let formattedTime = splitTime[0] > 12 
        ? splitTime[0] - 12 + ':' + splitTime[1] + ' PM' 
            : splitTime[0] + ':' + splitTime[1] + ' AM' 

    return (
        <Segment.Group size='small'>
            <Segment inverted>
                <Grid>
                    <Grid.Column width={10} textAlign='left'>
                        {props.user.username 
                            ? props.user.username 
                                : props.user.user.username} posted:
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='right'>
                        {formattedDate} at {formattedTime}
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment inverted>
                <Grid>
                    <Grid.Column textAlign='left'>
                        {props.status.content}
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
}

export default Status