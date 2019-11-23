import React from 'react'
import { Image, Card, Icon } from 'semantic-ui-react'
import FollowButton from './FollowButton'

const Sidebar = (props) => {
    if (props.user && props.currentUser) {
        let followerCount = props.user.followers.length

        return (
            <Card>
                <Image 
                    size='medium' 
                    rounded 
                    src='https://react.semantic-ui.com/images/avatar/large/matthew.png' 
                />
                <Card.Content >
                    <Card.Header> 
                        {props.user.verified 
                            ? <Icon color='green' name='check circle'/> 
                                : null}
                        {props.user.username}
                    </Card.Header>
                    <Card.Meta>
                        {props.user.user_type}
                    </Card.Meta><br/>

                    <Card.Description>
                        {props.user.rating
                            ? props.user.rating + '/5'
                                : 'This user is unrated' }
                        <br/><br/>
                    </Card.Description>
                    <Card.Description>
                        Followers: {followerCount} 
                        {props.user.id !== props.currentUser.id
                            ? <FollowButton 
                                currentUser={props.currentUser}
                                user={props.user} />
                                : null }
                    </Card.Description>
                </Card.Content>
                <Card.Content>
                    <Card.Description>
                        {props.user.bio}
                    </Card.Description>
                </Card.Content>
                <Card.Content>
                    <Card.Meta textAlign='left'>
                        
                    </Card.Meta>
                </Card.Content>
            </Card>
        )
    } else {
        return null
    }
}

export default Sidebar