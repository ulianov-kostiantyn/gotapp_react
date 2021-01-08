import React, {Component} from 'react';
import styled from 'styled-components';
import { ListGroup, ListGroupItem } from 'reactstrap';
import gotService from '../../services/gotService'
import Spinner from '../spinner'
import ErrorMessage from '../errorMessage'


const Field = ({item, field, label}) => {
    return (
        <ListGroupItem className="d-flex justify-content-between">
            <Term>{label} </Term>
            <span>{item[field]}</span>
         </ListGroupItem>
    )
}

export {
    Field
}

const ItemDets = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`;
const ItemViewOut = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`;
const Term = styled.span`
    font-weight: bold;
`;
const SelectError = styled.span`
    color: #fff;
    text-align: center;
    font-size: 26px;
`

export default class ItemDetails extends Component {

    gotService = new gotService();

    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        } 
    }

    onItemLoaded = (item) => {
        this.setState({
            item,
            loading: false})
    }

    updateItem() {
        const {itemId, getData} = this.props;
        if (!itemId) {
            return;
        }

        this.setState({
            loading: true
        })

        getData(itemId)
            .then(this.onItemLoaded)
            .catch( () => this.onError())
    }

    onError(){
        this.setState({
            item: null,
            error: true
        })
    }

       // this.foo.bar = 0;
    

    render() {
        if (!this.state.item && this.state.error) {
            return <ErrorMessage/>
        } else if (!this.state.item) {
            return <span className="select-error">Please select an item </span>
        }

        const {item} = this.state;
        const {name} = item;

        if (this.state.loading) {
            return (
                <ItemDets className="rounded">
                    <Spinner/>
                </ItemDets>
            )
        }


        return (
            <ItemDets className="rounded">
            <ItemViewOut>{name}</ItemViewOut>
                <ListGroup flush>
                   {
                       React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                       })
                   }
                </ListGroup>
            </ItemDets>
        );
    }

}


