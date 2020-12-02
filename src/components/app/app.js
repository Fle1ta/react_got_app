import React from 'react';
import {Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../characterPage';
import BookPage from '../bookPage';
import HousePage from '../housePage';
import styled from 'styled-components';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import BooksItem from '../pages/';
import './app.css';



let ToggleButton = styled.button`
    margin: 0 0 20px 30px;
    padding: 10px 5 px
    width: 200px;
    height: 40px
    background: linear-gradient(to bottom, #00d4ff , #5353bd, 25%, #030316, 75%,  #020024);
    border: 1px solid #020024;
    border-radius: 8px;
    color: #f7e586;
    text-shadow: -1px -1px 0px #674013;
    :active, :focus{
        outline: none;
    }
`


export default class App extends React.Component {

    gotService = new GotService();

    state = {
        visible: true,
        error: false
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    onToggleVisible =  () => {
        let visible = this.state.visible;
        this.setState({
            visible: !visible
        })
    }


    render(){

        if(this.state.error){
            return <ErrorMessage/>
        }
        let char = this.state.visible ? <RandomChar/> : null;
        return (
            <Router>
                <div className='app'> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                            </Col>
                        </Row>
                        <Row>
                            <ToggleButton
                                className = 'toggle-btn'
                                onClick = {this.onToggleVisible}
                            >
                                Toggle random character
                            </ToggleButton>
                        </Row>

                        <Route path='/characters' component={CharacterPage}/>                       
                        <Route path='/houses' component={HousePage}/>
                        <Route path='/books' exact component={BookPage}/>
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;
                                return <BooksItem bookId={id}/>
                            }
                        }/>
                    </Container> 
                </div>
            </Router>
        );
    }
    
};
