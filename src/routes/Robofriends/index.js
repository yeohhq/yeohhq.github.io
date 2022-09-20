import React, { useEffect, useState } from 'react'
import CardList from './components/CardList'
import SearchBox from './components/SearchBox'
import Scroll from './components/Scroll'
import _ from 'lodash'
import './index.css'

const Robofriends = () => {
	const [robots, setRobots] = useState([])
	const [searchField, setSearchField] = useState('')
	const [filteredRobots, setFilteredRobots] = useState([])

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((users) => setRobots(users))
	}, [])

	useEffect(() => {
		console.log('====================================')
		console.log('robots', robots)
		console.log('====================================')
		let filtered = robots
		if (!_.isEmpty(searchField) && !_.isEmpty(robots)) {
			filtered = robots.filter((robot) => {
				return robot.name
					.toLowerCase()
					.includes(searchField.toLowerCase())
			})
		}

		setFilteredRobots(filtered)
	}, [robots, searchField])

	const onSearchChange = (event) => {
		setSearchField(event.target.value)
	}

	return _.isEmpty(robots) ? (
		<h1>Loading</h1>
	) : (
		<div className="tc">
			<h1 className="f1">RoboFriends</h1>
			<SearchBox
				searchField={searchField}
				searchChange={(e) => onSearchChange(e)}
			/>
			<Scroll>
				<CardList robots={filteredRobots} />
			</Scroll>
		</div>
	)
}

export default Robofriends
