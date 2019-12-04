import React from 'react'
import { Grid, Image, Modal } from 'semantic-ui-react'
import placeholder from '../photos/placeholder.png'


const FeaturedPhotos = (props) => {
    if (props.user) {
        return (
            <Grid centered>
                <Grid.Column width={5}>
                    <Modal size='mini' trigger={
                        <Image href='#' src={props.user.feature_one 
                            ? props.user.feature_one 
                                : placeholder} />}>
                        <Modal.Header>Upload a Feature Photo</Modal.Header>
                        <Modal.Content>
                            
                        </Modal.Content>
                    </Modal>
                </Grid.Column>
                <Grid.Column width={5}>
                    <Modal size='mini' trigger={
                        <Image href='#' src={props.user.feature_one 
                            ? props.user.feature_one 
                                : placeholder} />}>
                        <Modal.Header>Upload a Feature Photo</Modal.Header>
                        <Modal.Content>
                            
                        </Modal.Content>
                    </Modal>
                </Grid.Column>
                <Grid.Column width={5}>
                    <Modal size='mini' trigger={
                        <Image href='#' src={props.user.feature_one 
                            ? props.user.feature_one 
                                : placeholder} />}>
                        <Modal.Header>Upload a Feature Photo</Modal.Header>
                        <Modal.Content>
                            
                        </Modal.Content>
                    </Modal>
                </Grid.Column>
            </Grid>
        )
    } else {
        return null
    }
}

export default FeaturedPhotos