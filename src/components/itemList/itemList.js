import React, { Component } from 'react';
import './itemList.css';
import Spinner from '../spinner';
export default class ItemList extends Component {
  
  state = {
    itemList: null
  }
  
  componentDidMount() {
    const { getData } = this.props // Для того, чтобы не копипастить код для создания книг или домов, а превратить это в создание данных на основе создания персонажей

    getData()
      .then((itemList) => {
        this.setState({
          itemList
        })
      })
  }

  renderItems(arr) {
    return arr.map((item) => {
      const { id } = item;
      const label = this.props.renderItem(item);

      return (
        <li
          key={id}
          className="list-group-item"
          onClick={(id) => this.props.onItemSelected(id)}> 
          {label}
        </li>
      )
    })
  } // Проблема

  render() {
    const { itemList } = this.state;

    if (!itemList) {
      return <Spinner />
    }

    const items = this.renderItems(itemList);

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}