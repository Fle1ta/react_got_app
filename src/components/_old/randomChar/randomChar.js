import React, {Component} from 'react';
import Spinner from '../spinner'
import ErrorMessage from '../errorMessage'
// import './randomChar.css';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import GotService from '../../services/gotService'

const DivRandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        height: 56px;
        margin-bottom: 20px;
        text-align: center;
    }
    img {
        width: 100%;
    }
`
const Term = styled.span`
    font-weight: bold;
`


export default class RandomChar extends Component {
    
    gotService = new GotService();
    
    state = {
        char: {},
        loading: true
    }

    componentDidMount(){
        this.updateChar();
        this.timerId = setInterval(this.updateChar, this.props.interval);
    }

    componentWillUnmount(){
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        });
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random()*300 + 25);
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const{ char, loading, error } = this.state;
        const spinner = loading ? <Spinner/> : null
        const errorMeassage = error ? <ErrorMessage/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;
        return (
            <DivRandomBlock className="rounded">
                {errorMeassage}
                {spinner}
                {content}
            </DivRandomBlock>
        );
    }
}

RandomChar.defaultProps ={
    interval: 10000
}

RandomChar.propTypes = {
    interval: PropTypes.number
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <Term>Gender </Term>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born </span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died </span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture </span>
                        <span>{culture}</span>
                    </li>
                </ul>
        </>
    )
}
