import React, { Component } from 'react';
import './randomChar.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class RandomChar extends Component {

  constructor() {
    super();
    this.updateChar();
  }

  gotService = new GotService();
  state = {
    char: {},
    loading: true
  }

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false,
      error: false
    })
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  }

  updateChar() {
    const id = Math.floor(Math.random() * 140 + 25); // Получаем рандомного персонажа начиная с 25 и заканчивая 140 
    this.gotService.getCharacter(id) // Возвращает промис, поэтому нужно обработать
      .then(this.onCharLoaded)
      .catch(this.onError)
  } // Можем работать со стейтом напрямую, тк изначально он без данных

  render() {
    const { char, loading, error } = this.state;

    const errorMessage = error ? <ErrorMessage /> : null; // Вывод ошибки на страницу
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;

    return (
      <div className="random-block rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  } // Реализация того, чтобы спиннер загрузки был не за контентом, а внутри блока
}

const View = ({ char }) => {
  const { name, gender, born, died, culture } = char;
  return (
    <>
      <h4>Random Character: {name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Gender </span>
          <span>{gender}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Born </span>
          <span>{born}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Died </span>
          <span>{died}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Culture </span>
          <span>{culture}</span>
        </li>
      </ul>
    </>
  )
}
