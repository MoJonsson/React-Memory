import React, { Component } from 'react';
import Card from './card';

class Board extends Component {
    constructor() {
        super();
        this.state = {
            cardsToRender: []
        }
        this.selectedNumbers = [];
        this.resetValues();
    }

    resetValues() {
        this.selectedNumbers = [];
        this.valueToFind = 0;
        this.valuesFound = [];
        this.nbrOfCardsToRender = 0;
    }

    render() {
        
        return (
            <div>
                <label htmlFor="nbrOfCards" />
                <div>
                    <input type="text" name="nbrOfCards" ref="nbrOfCards" />
                    <button onClick={() => this.renderNewCards()}>Render cards</button>
                </div>
                This is the board
                {
                    this.state.cardsToRender.map((number) =>
                            <Card 
                                key={number.toString()}
                                onclick={() => this.handleOnClick(number)} 
                                isselected={this.selectedNumbers.indexOf(number) > -1 || 
                                    this.valuesFound.indexOf((number > 0 ? number : number * -1)) > -1}
                                number={number > 0 ? number : number * -1} />
                    )
                }
            </div>
        );
    }

    renderNewCards() {
        if(isNaN(this.refs.nbrOfCards.value)) {
            alert('Not a number');
            return;
        }
        this.resetValues();
        this.createCardsToRender(parseInt(this.refs.nbrOfCards.value, 10));
    }

    createCardsToRender(nbrOfCards) {
        if(this.nbrOfCardsToRender === 0) {
            this.nbrOfCardsToRender = nbrOfCards
        }
        let cardsToRender = [];
        while(nbrOfCards > 0) {
            cardsToRender.push(nbrOfCards);
            cardsToRender.push(nbrOfCards * -1);
            nbrOfCards--;
        }
        this.setState({
            cardsToRender: cardsToRender
        });
        if(this.nbrOfCardsToRender === this.valuesFound.length) {
            alert('all done!');
        }
    }

    handleOnClick(val) {
        this.selectedNumbers.push(val);
        if(this.valueToFind === 0) {
            this.valueToFind = val * -1;
            this.createCardsToRender(this.nbrOfCardsToRender);
        }
        else {
            this.createCardsToRender(this.nbrOfCardsToRender);
            setTimeout(() => {
                if(this.valueToFind === val) {
                    this.valuesFound.push(val > 0 ? val : val * -1);
                }
                this.valueToFind = 0;
                this.selectedNumbers = [];
                
                this.createCardsToRender(this.nbrOfCardsToRender);
            },1500);
        }
    }
}

export default Board;