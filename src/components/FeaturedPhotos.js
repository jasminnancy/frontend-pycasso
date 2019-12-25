import React from 'react'
import { Grid, Image, Modal } from 'semantic-ui-react'
import placeholder from '../photos/placeholder.png'
import FeaturePhoto from './FeaturePhoto'


const FeaturedPhotos = (props) => {
    if (props.user) {
        if (window.location.pathname === '/profile') {
            return (
                <Grid centered columns={3}>
                    <Grid.Column>
                        <Modal onClose={() => window.location.reload()} closeIcon size='small' trigger={
                            <Image href='#' src={props.user.feature_one 
                                ? props.user.feature_one 
                                    : placeholder} />}>
                            <Modal.Header>Upload a New Photo</Modal.Header>
                            <Modal.Content>
                                <FeaturePhoto currentUser={props.user} featureNumber='feature_one'/>
                            </Modal.Content>
                        </Modal>
                    </Grid.Column>
                    <Grid.Column>
                        <Modal onClose={() => window.location.reload()} closeIcon size='mini' trigger={
                            <Image href='#' src={props.user.feature_two
                                ? props.user.feature_two 
                                    : placeholder} />}>
                            <Modal.Header>Upload a New Photo</Modal.Header>
                            <Modal.Content>
                                <FeaturePhoto currentUser={props.user} featureNumber='feature_two'/>
                            </Modal.Content>
                        </Modal>
                    </Grid.Column>
                    <Grid.Column>
                        <Modal onClose={() => window.location.reload()} closeIcon size='mini' trigger={
                            <Image href='#' src={props.user.feature_three
                                ? props.user.feature_three 
                                    : placeholder} />}>
                            <Modal.Header>Upload a New Photo</Modal.Header>
                            <Modal.Content>
                                <FeaturePhoto currentUser={props.user} featureNumber='feature_three'/>
                            </Modal.Content>
                        </Modal>
                    </Grid.Column>
                </Grid>
            )
        } else {
            return (
                <Grid centered columns={3}>
                    <Grid.Column>
                        <Image src={props.user.feature_one
                            ? props.user.feature_one
                                : placeholder} />
                    </Grid.Column>
                    <Grid.Column>
                        <Image src={props.user.feature_two
                            ? props.user.feature_two
                                : placeholder} />
                    </Grid.Column>
                    <Grid.Column>
                        <Image src={props.user.feature_three
                            ? props.user.feature_three
                                : placeholder} />
                    </Grid.Column>
                </Grid>
            )
        }
    } else {
        return null
    }
}

export default FeaturedPhotos