import React, { useState, useEffect } from 'react';
import Spinner from '../spinner/spinner'
// import './itemList.css';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const Li = styled.li`
    cursor: pointer;
`

function ItemList({getData, onItemSelected, renderItem}) {

    const [itemList, updateList] = useState([]);

   
    useEffect(() => {
        getData()
            .then((data) => {
                updateList(data);
            });
    }, []);

    function renderItems(arr){
        
        return arr.map((item) => {

            const {id} = item;
            const label = renderItem(item);
            return (
                <Li 
                    key = {id}
                    className="list-group-item"
                    onClick = {() => onItemSelected(id)}
                >
                    {label}
                </Li>
            )
        })
    }

    if(!itemList){
        return <Spinner/>
    }

    const items = renderItems(itemList);

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );

}

export default ItemList;


