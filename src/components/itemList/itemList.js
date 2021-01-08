import React, {Component} from 'react';
import styled from 'styled-components';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


const StyledListGroup = styled(ListGroup)`
    cursor: pointer;    
`;

const StyledListGroupItem = styled(ListGroupItem)`
    cursor: pointer;    
`;

export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false
    }

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then((itemList) => {
                this.setState({
                    itemList
                })
            })
            .catch(() => {this.onError()});
    }

    componentDidCatch(){
        this.setState({
            itemList: null,
            error: true
        })
    }

    onError(status){
        this.setState({
            itemList: null,
            error: true
        })
    }

    renderItems(arr) { 
        return arr.map((item) => {
            const {id} = item;

            const label = this.props.renderItem(item);
            
            return (
                <StyledListGroupItem
                    key={id}
                    onClick={() => this.props.onItemSelected(id)}
                    >
                    {label}
                </StyledListGroupItem>
            )
        })
    }

    render() {

        const {itemList, error} = this.state;


        if(error){
            return <ErrorMessage/>
        }

        if (!itemList) {
            return <Spinner/>
        }

        const items = this.renderItems(itemList);

        return (
            <StyledListGroup>
                {items}
            </StyledListGroup>
        );
    }
}