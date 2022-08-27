import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';
import HousePage from '../housePage';
import BookPage from '../bookPage';
// import CharDetails from '../charDetails';
// import ItemList from '../itemList';
import GotService from '../../services/gotService';

import './app.css';


export default class App extends Component {
  gotService = new GotService();

  state = {
    showRandomChar: true,
    error: false
  }

  componentDidCatch() {
    console.log('error');
    this.setState({
      error: true
    })
  }

  toggleRandomChar = () => {
    this.setState((state) => {
      return {
        showRandomChar: !state.showRandomChar
      }
    });
  };

  render() {
    const char = this.state.showRandomChar ? <RandomChar /> : null;

    if (this.state.error) {
      return <ErrorMessage />
    }

    return (
      <>
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg={{ size: 5, offset: 0 }}>
              {char}
              <button
                className='btn-toggle'
                onClick={this.toggleRandomChar}>Toggle char</button>
            </Col>
          </Row>
          <CharacterPage />
          <HousePage/>
          <BookPage/>
          {/* <Row>
            <Col md='6'>
              <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={(item) => item.name} />
            </Col>
            <Col md='6'>
              <CharDetails charId={this.state.selectedChar} />
            </Col>
          </Row>
          <Row>
            <Col md='6'>
              <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
                renderItem={(item) => item.name} />
            </Col>
            <Col md='6'>
              <CharDetails charId={this.state.selectedChar} />
            </Col>
          </Row> */}
        </Container>
      </>
    )
  };
};
