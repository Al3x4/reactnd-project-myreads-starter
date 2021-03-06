import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from '../BooksAPI' 

class Search extends Component {
	
	state = {
				query : '', 
				foundBooks : []
			}
	
	updateQuery = (inputedQuery) => {
		this.setState({ query : inputedQuery})
	}

	render() {
		const {query} = this.state;
		if (query) {
			let result =[];
			BooksAPI.search(query.trim())
			.then(foundBooks => {

				//if a book is already shelved, get the shelf property and give to found book
				result = foundBooks.map(foundBook => {
					if (this.props.allBooks.length) {
						let sameBookShelved = this.props.allBooks.filter(book => book.id === foundBook.id)
						if (sameBookShelved.length) {
							foundBook.shelf = sameBookShelved[0].shelf
						} else {
							foundBook.shelf = 'none'
						}
					}
					return foundBook;
				})
				this.setState({foundBooks: result})
				})
		} 
		//if there is no input, do not display results
		if(query === '' && this.state.foundBooks.length) {
			this.setState({foundBooks: []})
		}
		
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link 
						to={this.props.baseUrl + '/'} 
						className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
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
									<Book 
									book={book}                   
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