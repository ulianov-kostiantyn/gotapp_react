import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import ErrorMessage from '../errorMessage';
import ItemList from '../itemList'; 
import ItemDetails from '../itemDetails';
import gotService from '../../services/gotService'
import {HousesPage, BooksPage, CharacterPage, BooksItem} from '../pages/';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './app.css';


const HoverButton = styled(Button)`
    margin-bottom: 40px !important;
`

export default class App extends Component {
    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch() {
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
    }


    

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const char = this.state.showRandomChar ? <RandomChar/> : null;


        return (
            <Router>
                <div className='app'> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row> 
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                                <HoverButton color="primary" className="mt-400"
                                        onClick={this.toggleRandomChar}>Toggle random character
                                </HoverButton>
                            </Col>        
                                
                        </Row>     


                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={HousesPage}/>
                        <Route path='/books' exact component={BooksPage}/>
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;
                                return  <BooksItem bookId={id}/>}}/>
                    </Container>
                </div>
            </Router>
        );
};

}