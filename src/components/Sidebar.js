import React from 'react'
import { Image, Card, Icon, Rating } from 'semantic-ui-react'

const Sidebar = (props) => {
    let user = props.user 
        ? props.user 
            : {username: '', rating: 0, followerCount: 0, bio: ''}

    return (
        <Card>
            <Image 
                size='medium' 
                rounded 
                src='https://react.semantic-ui.com/images/avatar/large/matthew.png' 
            />
            <Card.Content >
                <Card.Header> 
                    {user.verified 
                        ? <Icon color='green' name='check circle'/> 
                            : null}
                    {user.username}
                </Card.Header><br/>
                <Rating maxRating={5} onRate={console.log}/>
                <Card.Description 
                    content={user.rating 
                        ? user.rating 
                            : 'Unrated'} 
                /><br/>
                <Card.Description>
                    Followers: { user.followerCount
                        ? user.followerCount
                            : 0 }
                </Card.Description>
            </Card.Content>
            <Card.Content>
                <Card.Description>
                    {user.bio}
                </Card.Description>
            </Card.Content>
            <Card.Content>
                <Card.Meta textAlign='left'>
                    
                </Card.Meta>
            </Card.Content>
        </Card>
    )
}

export default Sidebar