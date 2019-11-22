import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Card } from 'semantic-ui-react'

const ProfileCard = (props) => {
    return (
        <Grid.Column>
            <Card link>
                <Link to={`/users/${props.user.username}`}>
                    <Card.Content>
                        <Card.Header 
                            as='h3' 
                            style={{color: 'black'}} 
                            content={props.user.username} 
                        />
                    </Card.Content>
                </Link>
            </Card>
        </Grid.Column>
    )
}

export default ProfileCard