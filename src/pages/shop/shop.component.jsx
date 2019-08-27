import React, { Component } from 'react';
import SHOP_DATA from './shop.data.js';
import PreviewCollection from '../../components/collection-preview/collection-preview.component'

export default class ShopPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            collections: SHOP_DATA
        }; 
    }

    render() {
        const {collections} = this.state;
        return (
            <div>
                {
                    collections.map(({id, ...collection}) => (
                        <PreviewCollection key={id} {...collection}/>
                    ))
                }
            </div>
        )
    }
}
