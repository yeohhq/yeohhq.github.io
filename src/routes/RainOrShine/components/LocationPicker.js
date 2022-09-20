import { Table, Button } from 'antd'
import React from 'react'
import _ from 'lodash'

const LocationPicker = ({ locations, setLocation }) => {
	const onClick = (value) => {
		setLocation(value)
	}

	const columns = [
		{
			title: 'Location',
			dataIndex: 'name',
			key: 'location',
			render: (value) => {
				return (
					<Button
						type="text"
						block
						value={value}
						onClick={() => onClick(value)}
					>
						{value}
					</Button>
				)
			}
		}
	]

	return (
		<Table
			size="small"
			scroll={{ y: 300 }}
			pagination={{ position: [], pageSize: locations.length }}
			dataSource={locations}
			columns={columns}
		/>
	)
}

export default LocationPicker
