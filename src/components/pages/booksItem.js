import React, { Component } from 'react';
import ItemDetails, { Field } from '../itemDetails';
import GotService from '../../services/gotService';

export default class BooksItem extends Component {
  gotService = new GotService()

  render() {
    return (
      <ItemDetails
        itemId={this.props.bookId}
        getData={this.gotService.getBook}
      >
        <Field field='numberOfPage' label='NumberOfPage' />
        <Field field='publiser' label='Publiser' />
        <Field field='released' label='Released' />
      </ItemDetails>
    )
  }
}