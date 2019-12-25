import React , { Component } from 'react'
import { Grid, Image, Icon } from 'semantic-ui-react'

class PortfolioPhoto extends Component {
    constructor() {
        super()

        this.state = {
            hovered: false
        }
    }

    handleMouseover = () => {
        this.setState({
            hovered: true
        })
    }

    handleMouseoff = () => {
        this.setState({
            hovered: false
        })
    }

    handleClick = (photo) => {
        fetch(`https://pycasso-backend.herokuapp.com/photos/${photo.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.jwt}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(r => r.json())
        .then(() => window.location.reload())
    }

    render() {
        return (
            <Grid.Column 
                style={{marginBottom: 30}} 
                onMouseOver={this.handleMouseover} 
                onMouseLeave={this.handleMouseoff}
            >
                <Image href='#' size='medium' src={this.props.photo.url} />
                {this.state.hovered === true 
                    ? <Icon 
                        link 
                        name='close' 
                        onClick={() => this.handleClick(this.props.photo)}
                    /> 
                        : null}
            </Grid.Column>
        )
    }
}

export default PortfolioPhoto