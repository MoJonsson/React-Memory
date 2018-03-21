import React, { Component } from 'react';

class Card extends Component {

    render() {
        return (
            <div className="card" 
                onClick={this.props.onclick}>Card {this.props.isselected ? this.props.number : ''}</div>
        );
    }
}

export default Card;