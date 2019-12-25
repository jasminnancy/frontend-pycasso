import React, { Component } from 'react'
import { Modal, Button, Form, Rating } from 'semantic-ui-react'

//This modal (pop-up) adds a review to a single user
class AddReviewModal extends Component {
    constructor() {
        super()

        this.state = {
            rating: null,
            content: '',
            user_id: null,
            reviewed_id: null
        }
    }

    // content === body of the review
    handleChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    // handles the 1-5 star rating and sets state
    handleRate = (e, { rating }) => {
        let user_id = this.props.currentUser.id
        let reviewed_id = this.props.user.id

        this.setState({
            rating: rating,
            user_id: user_id,
            reviewed_id: reviewed_id
        })
    }

    // posts the rating to the backend
    // makes sure that a rating is selected before sending the post request
    handleSubmit = (e, values) => {
        e.preventDefault()

        if (this.state.rating) {
            fetch('https://pycasso-backend.herokuapp.com/reviews', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.jwt}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    reviewed_id: values.reviewed_id,
                    user_id: values.user_id,
                    rating: values.rating,
                    content: values.content
                })
            })
            .then(r => r.json())
            .then(() => window.location.reload())
        } else {
            alert('You must select a rating')
        }
    }

    render() {
        return (
            <Modal 
                size='small'
                trigger={<Button >Leave a Review</Button>}
                closeIcon
            >
                <Modal.Header>
                    Leave a Review for: {this.props.user.username}
                </Modal.Header>
                <Modal.Content>
                    <Form onSubmit={(e) => this.handleSubmit(e, this.state)}>
                        <Form.TextArea 
                            onChange={(e) => this.handleChange(e)}
                        />
                        <Rating 
                            onRate={this.handleRate} 
                            defaultRating={1}
                            maxRating={5} 
                        />
                        <Button type='submit' content='Submit Rating'/>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

export default AddReviewModal