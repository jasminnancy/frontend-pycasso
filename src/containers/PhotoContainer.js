import React from 'react'
import { Image, Segment, Grid } from 'semantic-ui-react'

const PhotoContainer = (props) => {
    if (props.photos && props.photos.length > 0) {
        return (
            <Grid>
                <Grid.Row columns={3}>
                    {props.photos.map(photo =>
                        <Grid.Column style={{marginBottom: 30}}>
                            <Image size='medium' src={photo.url} />
                        </Grid.Column>
                    )}
                </Grid.Row>
            </Grid>
        )
    } else {
        return (
            <Segment inverted padded='very'>
                You haven't posted any photos yet. <br/><br/>
                Your profile's profile pictures and featured photos will be added to your portfolio automatically.
            </Segment>
        )
    }
}

export default PhotoContainer