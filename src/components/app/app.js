import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../pages/characterPage';
import BooksPage from '../pages/booksPage';
import ItemList from '../itemList'; 
import ItemDetails from '../itemDetails';
import gotService from '../../services/gotService'
import HousesPage from '../pages/housesPage/housesPage';


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
            <> 
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
                    <CharacterPage/>
                    <BooksPage/>
                    <HousesPage/>
                </Container>
            </>
        );
};

}