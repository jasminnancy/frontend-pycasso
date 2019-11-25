import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Card } from 'semantic-ui-react'

const ProfileCard = (props) => {
    return (
        <Grid.Column>
            <Card link style={{marginBottom: 25, padding: 10}}>
                <Link to={`/users/${props.user.username}`}>
                    <Card.Content>
                        <Card.Header 
                            as='h3' 
                            style={{color: 'black'}} 
                            content={props.user.username} 
                        />
                        <Card.Meta>
                            {props.user.user_type} | {props.user.rating 
                                ? props.user.rating + '/5' 
                                    : 'Unrated'}
                        </Card.Meta>
                    </Card.Content>
                </Link>
            </Card>
        </Grid.Column>
    )
}

export default ProfileCard