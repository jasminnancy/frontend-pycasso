import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
import placeholder from '../photos/placeholder.jpg'

const FeaturedPhotos = () => {
    return (
        <Grid centered>
            <Grid.Column width={5}>
                <Image src={placeholder} />
            </Grid.Column>
            <Grid.Column width={5}>
                <Image src={placeholder} />
            </Grid.Column>
            <Grid.Column width={5}>
                <Image src={placeholder} />
            </Grid.Column>
        </Grid>
    )
}

export default FeaturedPhotos