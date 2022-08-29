import React, { Component } from 'react';
import './itemList.css';
import Spinner from '../spinner';
import PropTypes from 'prop-types';
import GotService from '../../services/gotService';

class ItemList extends Component {

  static defaultProps = {
    onItemSelected: () => { }
  }

  static propTypes = {
    onItemSelected: PropTypes.func // Должен быть функцией
    // getData: PropTypes.arrayOf(PropTypes.object) // Должен быть массивом, состоящим из объектов (для примера)
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
    const { data } = this.props;
    const items = this.renderItems(data);

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}



const withData = (View, getData) => {
  return class extends Component {
    state = {
      data: null
    }

    componentDidMount() {
      // const { getData } = this.props // Для того, чтобы не копипастить код для создания книг или домов, а превратить это в создание данных на основе создания персонажей

      getData()
        .then((data) => {
          this.setState({
            data
          })
        })
    }

    render() {
      const { data } = this.state;

      if (!data) {
        return <Spinner />
      }

      return <View {...this.props} data={data} />
    }
  }
}

const { getAllCharacters } = new GotService(); 

export default withData(ItemList, getAllCharacters);

