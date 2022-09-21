import { Card, Row, Empty } from 'antd'
import {
	WiDaySunny,
	WiNightClear,
	WiDayCloudy,
	WiNightCloudy,
	WiRainMix,
	WiThunderstorm
} from 'weather-icons-react'
import './Weather.css'
import React from 'react'

const getWeatherIcon = (key, weather, size, color) => {
	switch (weather) {
		case 'Fair (Day)':
			return <WiDaySunny key={key} size={size} color={color} />
		case 'Fair (Night)':
			return <WiNightClear key={key} size={size} color={color} />
		case 'Partly Cloudy (Day)':
		case 'Cloudy':
			return <WiDayCloudy key={key} size={size} color={color} />
		case 'Partly Cloudy (Night)':
			return <WiNightCloudy key={key} size={size} color={color} />
		case 'Light Showers':
		case 'Light Rain':
		case 'Showers':
			return <WiRainMix key={key} size={size} color={color} />
		case 'Thundery Showers':
			return <WiThunderstorm key={key} size={size} color={color} />
		default:
			return (
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description={
						<span>Select location to view Weather Forecast</span>
					}
				/>
			)
	}
}

const Weather = ({ locationName, weather }) => {
	const icon = getWeatherIcon('weather-icon', weather, 160, 'black')
	return (
		<Card
			className="weather-card"
			title={locationName || 'Weather Forecast'}
			extra={<span className="weather-status">{weather}</span>}
		>
			<Row>
				<div className="weather-icon">{icon}</div>
			</Row>
		</Card>
	)
}

export default Weather
