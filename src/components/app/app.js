import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import { CharacterPage, HousePage, BookPage } from '../pages';
// import HousePage from '../pages';
// import BookPage from '../pages';
// import ItemDetails from '../charDetails';
// import ItemList from '../itemList';
import GotService from '../../services/gotService';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

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
      <Router>
        <div className='app'>
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
            <Routes>
              <Route path='/' element={ <h1>Welcome to GOT DB</h1>} />
              <Route path='/characters' element={<CharacterPage />} />
              <Route path='/houses' element={<HousePage />} />
              <Route path='/books' element={<BookPage />} />
              {/* <Route path='/books/:id' element={
                () => {
                  let params = useParams();
                   return <BooksItem bookId={params.id} />
                }
              } /> */}
            </Routes>

          </Container>
        </div>
      </Router>
    )
  };
};
