import React from 'react'
import './SearchBox.css'

const SearchBox = ({ searchField, searchChange }) => {
	return (
		<div className="pa2">
			<input
				className="pa3 ba b--green bg-lightest-blue"
				type="search"
				placeholder="Search Robots"
				value={searchField}
				onChange={searchChange}
			/>
		</div>
	)
}

export default SearchBox
