import React, { Component } from 'react';
import ItemDetails, { Field } from '../itemDetails';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class BookPage extends Component {
  gotService = new GotService();

  state = {
    selectedBook: 2,
    error: false
  }

  onItemSelected = (id) => {
    this.setState({
      selectedBook: id
    })
  }

  componentDidCatch() {
    this.setState({
      error: true
    })
  }

  render() {

    if (this.state.error) {
      return <ErrorMessage />
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllBooks}
        renderItem={({ name }) => `${name}`} />
    ) // Выносим для удобства, чтобы не было копипаста в будущем

    const itemDetails = (
      <ItemDetails
        itemId={this.state.selectedBook}
        getData={this.gotService.getBook}
      >
        <Field field='numberOfPage' label='NumberOfPage' />
        <Field field='publiser' label='Publiser' />
        <Field field='released' label='Released' />
      </ItemDetails>
    ) // Выносим для удобства, чтобы не было копипаста в будущем

    return (
      <RowBlock left={itemList} right={itemDetails} />
    )
  }
}

