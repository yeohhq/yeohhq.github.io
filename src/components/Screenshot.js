import React from 'react'
import { Image, Empty, Card } from 'antd'

const Screenshot = ({ imgSrc }) => {
	const imgContainer = imgSrc ? (
		<Image className="traffic-screenshot" src={imgSrc} />
	) : (
		<Empty
			image={Empty.PRESENTED_IMAGE_SIMPLE}
			description={<span>Select location to view Traffic Camera</span>}
		/>
	)

	return <Card title="Traffic Camera">{imgContainer}</Card>
}

export default Screenshot
