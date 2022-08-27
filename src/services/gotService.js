export default class GotService {
  constructor() {
    this._apiBase = 'https://anapioficeandfire.com/api';
  }

  getResourse = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`);
    }
    return await res.json();
  }

  getAllCharacters = async () => {
    const res = await this.getResourse(`/characters?page=5&pageSize=10`);
    return res.map(this._transformCharacter) // Используется метод мэп, тк работа происходит с массивом (в метод мэп всегда передается колбек функция)
  }
  getCharacter = async (id) => {
    const character = await this.getResourse(`/characters/${id}`);
    return this._transformCharacter(character); // Приходит объект, поэтому используем без методов массивов
  }

  getAllBooks = async () => {
    const res = await this.getResourse(`/books/`);
    return res.map(this._transformBook)
  }
  getBook = async (id) => {
    const book = await this.getResourse(`/books/${id}`);
    return this._transformBook(book);
  }

  getAllHouses = async () => {
    const res = await this.getResourse(`/houses/`);
    return res.map(this._transformHouse)
  }
  getHouse = async (id) => {
    const house = await this.getResourse(`/houses/${id}`);
    return this._transformHouse(house);
  }

  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)$/;
    return item.url.match(idRegExp)[1];
  }

  _transformCharacter(char) {
    if (!char.gender) {
      char.gender = 'no data'
    }
    if (!char.born) {
      char.born = 'no data'
    }
    if (!char.died) {
      char.died = 'no data'
    }
    if (!char.culture) {
      char.culture = 'no data'
    }
    return {
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture
    }
  }

  _transformHouse(house) {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons
    }
  }

  _transformBook(book) {
    return {
      name: book.name,
      numberOfPage: book.numberOfPage,
      publiser: book.publiser,
      released: book.released
    }
  }
}
