import React, {Component} from 'react';
import GotService from '../../services/gotService';


import styled from 'styled-components';

const ItemDetailsDiv = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4{
        margin-bottom: 20px;
        text-align: center;
    }
`;

const SelectErrorMessage = styled.span`
    color: #fff;
    text-align: center;
    font-size: 26px;
`

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field} 

export default class ItemDetails extends Component {

    gotService = new GotService();

    state ={
        item: null,
        error: false
    }

    componentDidMount(){
        this.updateItem();
    }

    componentDidUpdate(prevProps){
        if(this.props.itemId !== prevProps.itemId){
            this.updateItem();
        }
    }

    updateItem(){
        const {getData} = this.props;
        const {itemId} = this.props;
        if(!itemId) return
        
        getData(itemId)
            .then((item) => {
                this.setState({item})
            })
        // this.foo.bar = 0
    }

    render() {


        if(!this.state.item){
            return <SelectErrorMessage>Please select a record</SelectErrorMessage>
        }
        const {item} = this.state;
        const {name} = this.state.item

        return (
            <ItemDetailsDiv className="rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return  React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </ItemDetailsDiv>
        );
    }
}