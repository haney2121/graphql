import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    }
  }
  displayAuthors() {
    let data = this.props.getAuthorsQuery;
    if (data.loading) {
      return (<option>Loading authors...</option>)
    } else {
      return data.authors.map(author => {
        return (
          <option value={author.id} key={author.id}>{author.name}</option>
        )
      })
    }
  }

  submitForm = (e) => {
    e.preventDefault();
    const { name, genre, authorId } = this.state;
    this.props.addBookMutation({
      variables: {
        name: name,
        genre: genre,
        authorId: authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }

  render() {
    return (
      <form id="addBook" onSubmit={this.submitForm}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={e => this.setState({ name: e.target.value })} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={e => this.setState({ genre: e.target.value })} />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={e => this.setState({ authorId: e.target.value })}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);