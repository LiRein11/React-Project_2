import React, { Component } from 'react';
import ItemDetails, { Field } from '../itemDetails';
import ItemList from '../itemList';
import './housePage.css';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class HousePage extends Component {
  gotService = new GotService();

  state = {
    selectedHouse: 130,
    error: false
  }

  onItemSelected = (id) => {
    this.setState({
      selectedHouse: id
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
        getData={this.gotService.getAllHouses}
        renderItem={({ name }) => `${name}`} />
    ) // Выносим для удобства, чтобы не было копипаста в будущем

    const houseDetails = (
      <ItemDetails
        itemId={this.state.selectedHouse}
        getData={this.gotService.getHouse}
      >
        <Field field='region' label='Region' />
        <Field field='words' label='Words' />
        <Field field='titles' label='Titles' />
        <Field field='overlord' label='Overlord' />
        <Field field='ancestralWeapons' label='AncestralWeapons' />
      </ItemDetails>
    ) // Выносим для удобства, чтобы не было копипаста в будущем

    return (
      <RowBlock left={itemList} right={houseDetails} />
    )
  }
}

