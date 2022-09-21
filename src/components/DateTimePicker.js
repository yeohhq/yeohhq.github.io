import React, { useState } from 'react'
import { DatePicker, Space, Alert } from 'antd'
import moment from 'moment'
import './DateTimePicker.css'

const DateTimePicker = ({ setDate }) => {
	const defaultDateTime = moment(Date.now())
	const [showError, setShowError] = useState(false)

	const onChange = (value) => {
		if (value.isSameOrBefore(Date.now())) {
			setShowError(false)
		} else {
			setShowError(true)
		}
	}

	const onOk = (value) => {
		if (!showError) {
			setDate(value)
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
			<DatePicker
				showTime
				defaultValue={defaultDateTime}
				onOk={onOk}
				onChange={onChange}
			/>
		</Space>
	)
}

export default DateTimePicker
