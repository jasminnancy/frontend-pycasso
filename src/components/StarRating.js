import React, { Component } from 'react'
import { Rating } from 'semantic-ui-react'

export default class RatingExampleOnRate extends Component {
  constructor() {
    super()

    this.setState({
      rating: 0
    })
  }

  handleRate = (e, { rating }) =>{
    this.setState({ 
      rating 
    })
    debugger
  }

  render() {
    return (
      <div>
        <Rating maxRating={5} onRate={this.handleRate} />
      </div>
    )
  }
}