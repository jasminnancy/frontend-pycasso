import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Card, Icon, Image } from 'semantic-ui-react'
import profilePic from '../photos/profilePic.png'

const ProfileCard = (props) => {
    return (
        <Grid.Column>
            <Card link style={{marginBottom: 25, padding: 10, background: '#1b1c1d'}}>
                <Link to={`/users/${props.user.username}`}>
                    <Card.Content>
                        <Image size='small' src={props.user.profile_pic
                            ? props.user.profile_pic
                                : profilePic} />
                        <Card.Header as='h3' style={{color: 'white'}}>
                            {props.user.verified 
                                ? <Icon color='green' name='check circle'/> 
                                    : null}
                            {props.user.username}
                        </Card.Header>
                        <Card.Meta style={{color: 'white'}}>
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