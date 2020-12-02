import React from 'react';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class HousePage extends React.Component{

    gotService = new GotService();
    
    state = {
        selectedItem: 10,
        error: false
    }

    onItemSelected = (id)=>{
        this.setState({
            selectedItem: id
        })
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    render(){

        if(this.state.error){
            return <ErrorMessage/>
        }

        const itemList = (<ItemList 
            onItemSelected={this.onItemSelected}
            getData={this.gotService.getAllHouses}
            renderItem ={({name}) => `${name}`}
        />);

        const charDetails = (
            <ItemDetails 
                getData = {this.gotService.getHouse}
                itemId = {this.state.selectedItem}>
                <Field field='region' label='Region' />
                <Field field='words' label='Words' />
                <Field field='title' label='Title' />
            </ItemDetails>
        );


        return (
            <RowBlock 
                left = {itemList}
                right = {charDetails}
            />
        )
    }
}

