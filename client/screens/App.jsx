import React, {Component} from 'react';
import Book from '../components/Book.jsx'
import ZoomFAB from '../components/ZoomFAB.jsx';
import SnackBar from '../components/SnackBar.jsx';
import AddBookForm from '../components/AddBookForm.jsx';
import SearchBook from '../components/SearchBook.jsx'
import Request from 'superagent';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addBookForm: false,
      snackbar: false,
      snackbarMessage: '',
      searchText: '',
      allBooks: [],
      searchedBooks: []
    };
  }

  componentWillMount() {
    this.getBooks();
  }

  getBooks() {
    Request
    .get('/api/books')
    .end((err, res) => {
      if(err) {
        console.log(err);
      } else {
        this.setState({ allBooks: res.body.books });
      }
    });
  }

  render() {
    let { allBooks, searchedBooks, addBookForm, snackbar, snackbarMessage, searchText } = this.state;
    return (
      <div className='App'>
        <SearchBook searchText={searchText}
          changeSearchText={(newSearch) => this.setState({ searchText: newSearch })}
          updateSearchedBooks={(searchResults) => this.setState({ searchedBooks: searchResults})}
          />
        <div>
          {
            (searchedBooks.length ? searchedBooks : allBooks)
            .map(book => (
              <Book key={book.id} book={book}
                openSnackbar={(message) => this.setState({ snackbar: true, snackbarMessage: message })}
              />
            ))
          }
        </div>
        <AddBookForm open={addBookForm}
          onClose={() => this.setState({ addBookForm: false })}
          openSnackbar={(message) => this.setState({ snackbar: true, snackbarMessage: message })}
        />
        <ZoomFAB onClick={() => this.setState({ addBookForm: true })} />
        <SnackBar className='snack' open={snackbar} message={snackbarMessage}
          onClose={() => this.setState({ snackbar: false, snackbarMessage: '' })}
        />
      </div>
    );
  }
}
