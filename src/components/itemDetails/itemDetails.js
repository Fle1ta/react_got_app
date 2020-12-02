import React, { useState, useEffect } from 'react';


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

function ItemDetails (props){

    const {getData, itemId} = props;
    const [item, changeItem] = useState(null);

    useEffect(() => {
        updateItem();
    }, [itemId]);

    function updateItem(){

        if(!itemId) return
        
        getData(itemId)
            .then((item) => {
                changeItem(item);
            });
    }

    if(!item){
        return <SelectErrorMessage>Please select a record</SelectErrorMessage>
    }

    const {name} = item;

    return (
        <ItemDetailsDiv className="rounded">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(props.children, (child) => {
                        return  React.cloneElement(child, {item})
                    })
                }
            </ul>
        </ItemDetailsDiv>
    );
}

export default ItemDetails;