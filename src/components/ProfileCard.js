import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Card, Icon, Image } from 'semantic-ui-react'
import profilePic from '../photos/profilePic.png'

const ProfileCard = (props) => {
    return (
        <Grid.Column>
            <Card link style={{marginBottom: 25, padding: 10, backgroundColor: '#eeeeee'}}>
                <Link to={`/users/${props.user.username}`} style={{color: 'black'}}>
                    <Card.Content>
                        <Image className='squarePhoto'  src={props.user.profile_pic
                            ? props.user.profile_pic
                                : profilePic} />
                        <Card.Header as='h3'>
                            {props.user.verified 
                                ? <Icon color='green' name='check circle'/> 
                                    : null}
                            {props.user.username}
                        </Card.Header>
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