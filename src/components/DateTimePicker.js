import React, { useState } from 'react'
import { DatePicker, Space, Alert } from 'antd'
import moment from 'moment'
import './DateTimePicker.css'

const DateTimePicker = ({ setDate }) => {
	const defaultDateTime = moment(new Date())
	const [showError, setShowError] = useState(false)

	const onOk = (value) => {
		if (value.isBefore(new Date())) {
			setDate(value)
		} else {
			setShowError(true)
		}
	}

	return (
		<Space direction="vertical" size={18}>
			{showError ? (
				<Alert
					banner
					message="Please select a date-time before current time."
					type="error"
					closable
				/>
			) : null}
			<DatePicker showTime defaultValue={defaultDateTime} onOk={onOk} />
		</Space>
	)
}

export default DateTimePicker
