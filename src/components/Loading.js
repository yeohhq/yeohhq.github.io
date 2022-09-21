import { Spin } from 'antd'
import React from 'react'
import './Loading.css'

const Loading = () => (
	<div className="loading">
		<Spin size="large" />
	</div>
)

export default Loading
