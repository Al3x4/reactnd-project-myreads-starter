import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import camelCase from 'camelcase'
import Book from './Book'
import * as BooksAPI from '../BooksAPI' 

class Search extends Component {
	state = {
				query : '', 
				foundBooks : []
			}
	
	updateQuery = (inputedQuery) => {
		this.setState({ query : inputedQuery.trim() })
	}


	render() {
		const {query} = this.state;

		if (query) {
			BooksAPI.search(query)
			.then(foundBooks => (
				this.setState({foundBooks})
				))
		}

		
		return(
			<div className="search-books">
              <div className="search-books-bar">
                <Link 
                	to='/' 
                	className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input 
	                  type="text" 
	                  placeholder="Search by title or author"
	                  value = {query} 
										onChange = {(event) => this.updateQuery(event.target.value)}
										/>

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                	{this.state.foundBooks.map(book => {
                		
                		return (
											<li key={book.id}>
                        <Book book={book}                   
						moveBook={this.props.moveBook}/>
                      </li>		
             				)

                	})}
                </ol>
              </div>
            </div>
			)
	}
}

export default Search