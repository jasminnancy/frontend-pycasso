import React from 'react'
import { Segment, Grid } from 'semantic-ui-react'
import PortfolioPhoto from '../components/PortfolioPhoto'

const PhotoContainer = (props) => {
    if (props.photos && props.photos.length > 0) {
        return (
            <Grid>
                <Grid.Row columns={3}>
                    {props.photos.map(photo =>
                        <PortfolioPhoto key={photo.id} photo={photo} />
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