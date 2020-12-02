import React, { useState, useEffect } from 'react';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import styled from 'styled-components';
import GotService from '../../services/gotService';

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


function RandomChar ({interval = 5000}) {
    
    const [char, loadChar] = useState({});
    const [loading, updateLoading] = useState(true);
    const [error, catchError] = useState(false);
    const gotService = new GotService();
    
    useEffect(() => {
        updateChar();
        let timerId = setInterval(updateChar, interval);
        return () =>{
            clearInterval(timerId);
        }
    }, []);


    const onCharLoaded = (char) => {
        loadChar(char);
        updateLoading(false);
        catchError(false);
    }

    const onError = () => {
        updateLoading(false);
        catchError(true);
    }

    const updateChar = () => {
        const id = Math.floor(Math.random()*300 + 25);
        gotService.getCharacter(id)
            .then(onCharLoaded)
            .catch(onError);
    }


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

export default RandomChar;