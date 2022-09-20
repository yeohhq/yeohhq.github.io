import { render } from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import RainOrShine from './routes/RainOrShine'
import Portfolio from './routes/Portfolio'

const root = document.getElementById('root')
render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="portfolio" element={<Portfolio />} />
			<Route path="rain-or-shine" element={<RainOrShine />} />
		</Routes>
	</BrowserRouter>,
	root
)
