import React, { Component } from 'react'
import { connect } from 'react-redux'
import PhotoContainer from './PhotoContainer'

class PhotosPage extends Component {
    constructor() {
        super()

        this.state = {
            photos: null
        }
    }

    render() {
        if (this.props.currentUser.user.username && this.state.photos === null) {
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
    
        if (this.state.photos !== null) {
            return (
                <PhotoContainer photos={this.state.photos} />
            )
        } else {
            return null
        }
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(PhotosPage)