import { Layout, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import './App.css'
import _ from 'lodash'

import { ReactComponent as Logo } from './assets/images/logo.svg'
import DateTimePicker from './components/DateTimePicker'
import Weather from './components/Weather'
import Screenshot from './components/Screenshot'
import LocationPicker from './components/LocationPicker'
import CustomFooter from './components/CustomFooter'
import Loading from './components/Loading'
const { Content } = Layout

const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss'
const formatDateTime = (dateString) => {
	// dateString format: YYYY-MM-DD HH:mm:ss
	// Replace whitespace with 'T' for API date_time format
	let dateTime = dateString.format(dateTimeFormat).split(' ').join('T')
	return dateTime
}

const App = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [date, setDate] = useState('')
	const [location, setLocation] = useState('')
	const [geoLocation, setGeolocation] = useState({})
	const [weather, setWeather] = useState('')
	const [imgSrc, setImgSrc] = useState('')

	const [trafficData, setTrafficData] = useState([])
	const [weatherData, setWeatherData] = useState([])
	const [areaData, setAreaData] = useState([])

	// Get traffic data
	useEffect(() => {
		let trafficURL = new URL(
			'https://api.data.gov.sg/v1/transport/traffic-images'
		)
		if (!_.isEmpty(date))
			trafficURL.searchParams.append('date_time', formatDateTime(date))

		fetch(trafficURL)
			.then((response) => response.json())
			.then((result) => {
				if (!_.isEmpty(result.items)) {
					// Traffic data, but does not contain mapping to location name
					const trafficData = result.items[0].cameras
					setTrafficData(trafficData)
				}
			})
			.catch((error) => console.log('error', error))
	}, [date])

	// Get area and weather data
	useEffect(() => {
		let weatherURL = new URL(
			'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast'
		)
		if (!_.isEmpty(date))
			weatherURL.searchParams.append('date_time', formatDateTime(date))

		fetch(weatherURL)
			.then((response) => response.json())
			.then((result) => {
				if (!_.isEmpty(result.area_metadata)) {
					// Area data to map longitude and latitude to actual location
					const areaData = result.area_metadata
					setAreaData(areaData)

					// Locations to display loaded, set to not loading
					setIsLoading(false)
				}

				if (!_.isEmpty(result.items)) {
					// Weather data
					const weatherData = result.items[0].forecasts
					setWeatherData(weatherData)
				}
			})
			.catch((error) => console.log('error', error))
	}, [date])

	// Map location name to geolocation (latitude, longitude)
	useEffect(() => {
		if (!_.isEmpty(location) && !_.isEmpty(areaData)) {
			areaData.forEach((area) => {
				if (area.name === location) {
					setGeolocation(area.label_location)
				}
			})
		}
	}, [location, areaData])

	// Map location name to weather
	useEffect(() => {
		if (!_.isEmpty(location)) {
			if (!_.isEmpty(weatherData)) {
				weatherData.forEach((area) => {
					if (area.area === location) {
						setWeather(area.forecast)
					}
				})
			}
		}
	}, [location, weatherData])

	// Map geolocation to traffic image
	useEffect(() => {
		if (!_.isEmpty(geoLocation) && !_.isEmpty(trafficData)) {
			const allGeoLocations = trafficData.map((camera) => {
				return {
					lat: camera.location.latitude,
					lon: camera.location.longitude,
					image: camera.image
				}
			})

			var sphereKnn = require('sphere-knn'),
				lookup = sphereKnn(allGeoLocations)

			var nearestCam = lookup(
				geoLocation.latitude,
				geoLocation.longitude,
				1
			)

			setImgSrc(nearestCam[0].image)
		}
	}, [geoLocation, trafficData])

	return (
		<Layout className="layout">
			<Logo className="logo" />
			<Content className="container">
				<Row className="description-text">
					Select date-time and location to find the current weather
					forecast and traffic conditions!
				</Row>
				<Row>
					<Col span={18}>
						<DateTimePicker setDate={setDate} />
					</Col>
				</Row>
				{isLoading ? (
					<Loading />
				) : (
					<div>
						<Row gutter={16}>
							<Col xl={8} xs={18}>
								<LocationPicker
									locations={areaData}
									setLocation={setLocation}
								/>
							</Col>
							<Col className="weather-container" xl={10} xs={18}>
								<Weather
									locationName={location}
									weather={weather}
								/>
							</Col>
						</Row>

						<Row gutter={16}>
							<Col span={18}>
								<Screenshot imgSrc={imgSrc} />
							</Col>
						</Row>
					</div>
				)}
			</Content>

			<CustomFooter />
		</Layout>
	)
}

export default App
