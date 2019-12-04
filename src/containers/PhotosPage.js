import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Segment } from 'semantic-ui-react'

class PhotosPage extends Component {
    constructor() {
        super()
        this.state = {
            photos: []
        }
    }

    render() {
        if (this.state.photos.length < 1 && this.props.currentUser.user.username) {
            fetch('http://localhost:3000/photos', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.jwt}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: this.props.currentUser.user.id
            })
        })
        .then(r => r.json())
        .then(data => this.setState({
            photos: data
        }))
        }

        return (
            <div>
                {this.state.photos.length > 0
                    ? this.state.photos.map(photo => <Image size='medium' src={photo.url} />)
                        : <Segment>You haven't posted any photos yet</Segment>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(PhotosPage)