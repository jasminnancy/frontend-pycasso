import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Header } from 'semantic-ui-react'

class EditProfileForm extends Component {
    constructor() {
        super()

        this.state = {
            bio: '',
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            confirmpass: ''
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/verifications', {
            headers: {
                'Authorization': `Bearer ${localStorage.jwt}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(r => r.json())
        .then(data => this.props.getRequests(data))
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    submitHandler = (e, values, user) => {
        e.preventDefault()

        let updatedValues = {}
        for (let [key, value] of Object.entries(values)) {
            if (values[key] !== '') {
                updatedValues[key] = value
            }
        }

        if (values.password === values.confirmpass) {
            fetch(`http://localhost:3000/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.jwt}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(updatedValues)
            })
            .then(r => r.json())
            .then(window.location.href = "/profile")
        }
    }

    handleVerification = (e, user, verifications) => {
        e.preventDefault()

        let userVerif = verifications.filter(u => u.user_id === user.id)
        let pendingRequest = userVerif.filter(v => v.finished === false && v.approved === false)

        if (pendingRequest.length > 0) {
            alert("Your prior request is still pending.")
        } else {
            fetch('http://localhost:3000/verifications', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.jwt}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user.id
                })
            })
            .then(r => r.json())
            .then(console.log)
        }
    }

    handleDelete = (user) => {
        fetch(`http://localhost:3000/users/${user.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.jwt}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(r => r.json())
        .then(data => {
            localStorage.jwt = ''
            window.location.href = "/login"
        })
    }

    render() {
        return (
            <Form 
                size='small' 
                onChange={(e) => this.changeHandler(e)}
                onSubmit={(e) => this.submitHandler(e, this.state, this.props.currentUser)}
            >                
                <Form.Group widths='equal'>
                    <Form.Input
                        id='first_name'
                        label='First Name' 
                        placeholder={this.props.currentUser.first_name}
                    />
                    <Form.Input
                        id='last_name'
                        label='Last Name' 
                        placeholder={this.props.currentUser.last_name}
                    />
                </Form.Group>  

                <Form.TextArea 
                    id='bio'
                    label='Bio'
                    placeholder={this.props.currentUser.bio}
                />

                <Form.Input
                    id='email'
                    label='Email' 
                    placeholder={this.props.currentUser.email}
                /> 

                <Form.Group widths='equal'>
                    <Form.Input
                        id='password'
                        label='Password' 
                        placeholder='Password'
                    />
                    <Form.Input
                        id='confirmpass'
                        label='Confirm Password' 
                        placeholder='Confirm Password'
                    />
                </Form.Group><br/>    
                <Button basic type='submit' content='Update'/>
                <br/><br/>
                {this.props.currentUser.verified 
                    ? <Header 
                        size='small'
                        floated='left'
                        color='blue'
                        content='Congrats! Your account is already verified.'
                    />
                        : <Header 
                            href='#'
                            size='small'
                            floated='left'
                            color='blue'
                            onClick={(e) => this.handleVerification(e, this.props.currentUser, this.props.verifications)}
                            content='Request Account Verification'
                        />}
                
                <Header 
                    href='#'
                    size='small'
                    floated='right'
                    color='blue'
                    onClick={() => this.handleDelete(this.props.currentUser)}
                    content='Delete Account'
                />
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        verifications: state.verifications
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRequests: (verifications) => { 
            dispatch({
                type: 'SEND_VERIFICATION_REQUEST',
                payload: verifications
            }) 
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileForm)