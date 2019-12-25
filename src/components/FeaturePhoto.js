import React from 'react'
import { Segment, Grid, Image } from 'semantic-ui-react'
import placeholder from '../photos/placeholder.png'

const FeaturePhoto = (props) => {
    let photo
    if (props.featureNumber === 'feature_one') {
        photo = props.currentUser.feature_one
    } if (props.featureNumber === 'feature_two') {
        photo = props.currentUser.feature_two
    } if (props.featureNumber === 'feature_three') {
        photo = props.currentUser.feature_three
    }

    const previewFile = () => {
        var file    = document.querySelector('input[type=file]').files[0];
        var reader  = new FileReader();

        reader.addEventListener("load", function () {
            let base64 = reader.result

            fetch('http://localhost:3000/featured', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.jwt}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    photo: base64,
                    user: props.currentUser,
                    feature: props.featureNumber
                })
            })
            .then(r => r.json())
            .then()
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    if (props.currentUser.username) {
        return (
            <Segment basic style={{margin: 'auto'}}>
                <Grid columns={2}>
                    <Grid.Column width='4'>
                        <Image size='small' src={photo ? photo : placeholder}/>
                    </Grid.Column>
                    <Grid.Column width='12'>
                        <div style={{color: 'black'}}><b>Upload Feature Photo</b></div>
                        <input type="file" onChange={previewFile} />
                    </Grid.Column>
                </Grid>
            </Segment>
        )
    } else {
        return null
    }
}

export default FeaturePhoto