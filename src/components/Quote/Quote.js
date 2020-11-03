import React, { Component } from "react";

import classes from "./Quote.module.css";

const QUOTES_URL = "https://type.fit/api/quotes";

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

const colors = ["#5BC0EB", "#FDE74C", "#9BC53D", "#C3423F"];

class Quote extends Component {
    state = {
        currentQuote: "",
        currentAuthor: "",
    };

    componentDidMount = () => {
        this.getNewQuote();
    };

    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps);
        console.log(prevState);
        if (prevState.currentQuote !== this.state.currentQuote) {
            document.body.style.backgroundColor =
                colors[getRandomInt(colors.length)];
            document.body.style.transition = "background-color 0.5s";
        }
    }

    getNewQuote = () => {
        fetch(QUOTES_URL)
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                const quoteObject = data[getRandomInt(data.length)];
                // console.log(quoteObject);
                this.setState({
                    currentQuote: quoteObject.text,
                    currentAuthor: quoteObject.author,
                });
                // console.log("Data written");
            });
    };

    render() {
        return (
            <div className={classes.Container}>
                <div className={classes.Quote}>
                    <div className={classes.Text}>
                        {this.state.currentQuote}
                    </div>
                    <div className={classes.Author}>
                        {this.state.currentAuthor}
                    </div>
                    <button
                        className={classes.Button}
                        onClick={this.getNewQuote}
                    >
                        New quote
                    </button>
                </div>
            </div>
        );
    }
}

export default Quote;
