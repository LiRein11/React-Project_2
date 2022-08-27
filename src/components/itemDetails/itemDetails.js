import React, { Component } from 'react';
import './itemDetails.css';

const Field = ({ item, field, label }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  )
} // Используем свойство реакта, что во внутрь каждого компонента мы можем передавать что-то, и это что-то пойдет как пропс для того, чтобы использовать его во внутри этого компонента

export {
  Field
}

export default class ItemDetails extends Component {

  state = {
    item: null
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    const {itemId, getData} = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({ item })
      })
    // this.foo.bar = 0;
  }

  render() {

    if (!this.state.item) {
      return <span className='select-error'>Please, select a character</span>
    }
    const { item } = this.state;
    const { name } = item;

    return (
      <div className="char-details rounded">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {
            React.Children.map(this.props.children, (child) => {
              return React.cloneElement(child, { item })
            }) // Используем для того, чтобы получить все свойства детей (Field из CharDetails) командой this.props.children, но проблема в том, что компонент Field использует данные, которые приходят из Api, и для того, чтобы их использовать, нужно ещё раз преобразовать тех детей которые приходят во внутрь компонента, и поэтому используем React.Children.map() (этот перебирает каждого ребенка и что-то с ним делает). Мы хотим добавить каждый элемент в field того персонажа, который пришел из Api {char}, поэтому используем cloneElement потому что напрямую не можем изменять элемент. Создаётся клон каждого field и добавляется свойство char
          }
        </ul>
      </div>
    );
  }
}