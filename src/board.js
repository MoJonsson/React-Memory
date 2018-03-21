import React, { Component } from 'react';
import Card from './card';

class Board extends Component {
    constructor() {
        super();
        this.state = {
            cards: []
        }
        this.selectedNumbers = [];
        this.resetValues();
    }

    resetValues() {
        this.selectedNumbers = [];
        this.valueToFind = 0;
        this.valuesFound = [];
        this.cardsToRender = 0;
    }

    render() {
        
        return (
            <div>
                <label htmlFor="nbrOfCards" />
                <div>
                    <input type="text" name="nbrOfCards" ref="nbrOfCards" />
                    <button onClick={this.renderNewCards.bind(this)}>Render cards</button>
                </div>
                This is the board
                {this.state.cards}
            </div>
        );
    }

    renderNewCards() {
        if(isNaN(this.refs.nbrOfCards.value)) {
            alert('Not a number');
            return;
        }
        this.resetValues();
        this.renderCards(parseInt(this.refs.nbrOfCards.value, 10));
    }

    renderCards(nbrOfCards) {
        if(this.cardsToRender === 0) {
            this.cardsToRender = nbrOfCards
        }
        let cards=[];
        while(nbrOfCards > 0) {
            if(this.valuesFound.indexOf(nbrOfCards) === -1) {
                cards.push(
                    <Card key={nbrOfCards} 
                        number={nbrOfCards} 
                        onclick={this.handleOnClick.bind(this, nbrOfCards)} 
                        isselected={this.selectedNumbers.indexOf(nbrOfCards) > -1} />
                );
                cards.push(
                    <Card key={nbrOfCards + this.refs.nbrOfCards.value} 
                        number={nbrOfCards} 
                        onclick={this.handleOnClick.bind(this, nbrOfCards + this.cardsToRender)}
                        isselected={this.selectedNumbers.indexOf(nbrOfCards + this.cardsToRender) > -1} />
                );
            }
            nbrOfCards--;
        }
        this.setState({
            cards: cards
        });
        if(cards.length === 0) {
            alert('all done!');
        }
    }

    handleOnClick(val) {
        this.selectedNumbers.push(val);
        if(this.valueToFind === 0) {
            if(val > this.cardsToRender) {
                this.valueToFind = val - this.cardsToRender;
            }
            else {
                this.valueToFind = val + this.cardsToRender;
            }
        }

        this.renderCards(this.cardsToRender);

        if(this.selectedNumbers.length > 1) {
            setTimeout(() => {
                if(this.valueToFind === val) {
                    if(val > this.cardsToRender) {
                        val -= this.cardsToRender;
                    }
                    this.valuesFound.push(val);
                }
                this.valueToFind = 0;
                this.selectedNumbers = [];
                this.renderCards(this.cardsToRender);
            },1500);
        }
    }
}

export default Board;