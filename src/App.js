import { Link } from 'react-router-dom'

const App = () => {
	return (
		<div>
			<h1>Bookkeeper</h1>
			<nav
				style={{
					borderBottom: 'solid 1px',
					paddingBottom: '1rem'
				}}
			>
				<Link to="/portfolio">My Portfolio</Link> |{' '}
				<Link to="/meteor">Rain or Shine</Link>
			</nav>
		</div>
	)
}

export default App
