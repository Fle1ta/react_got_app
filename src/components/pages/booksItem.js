import React from 'react';
import GotService from '../../services/gotService';
import ItemDetails, { Field } from '../itemDetails';

export default class BooksItem extends React.Component {
    gotService = new GotService();

    render(){
        return(
            <ItemDetails 
                getData = {this.gotService.getBook}
                itemId = {this.props.bookId}>
                <Field field='publiser' label='Publiser' />
                <Field field='numberOfPages' label='Number Of Pages' />
                <Field field='released' label='Released' />
            </ItemDetails>
        )
    }
}