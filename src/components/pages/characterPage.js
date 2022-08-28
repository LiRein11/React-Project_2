import React, { Component } from 'react';
import ItemDetails, { Field } from '../itemDetails';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class CharacterPage extends Component {
  gotService = new GotService();

  state = {
    selectedChar: 130,
    error: false
  }

  onItemSelected = (id) => {
    this.setState({
      selectedChar: id
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
        onItemSelected={console.log(this.onItemSelected)}
        getData={this.gotService.getAllCharacters}
        renderItem={({ gender, name }) => `${name} (${gender})`} />
    ) // Выносим для удобства, чтобы не было копипаста в будущем

    const itemDetails = (
      <ItemDetails
        itemId={this.state.selectedChar}
        getData={this.gotService.getCharacter}
      >
        <Field field='gender' label='Gender' />
        <Field field='born' label='Born' />
        <Field field='died' label='Died' />
        <Field field='culture' label='Culture' />
      </ItemDetails>
    ) // Выносим для удобства, чтобы не было копипаста в будущем

    return (
      <RowBlock left={itemList} right={itemDetails} />
    )
  }
}

