import React, { Component, Fragment } from 'react';
import { graphql } from 'react-apollo';

import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }
  displayBooks() {
    let data = this.props.data;
    if (data.loading) {
      return (<div>Loading books...</div>)
    } else {
      return data.books.map(book => {
        return (
          <li onClick={(e) => { this.setState({ selected: book.id }) }} key={book.id}>{book.name}</li>
        )
      })
    }
  }
  render() {
    return (
      <Fragment>
        <ul id="bookList">
          {this.displayBooks()}
        </ul>
        <BookDetails bookId={this.state.selected} />
      </Fragment>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
