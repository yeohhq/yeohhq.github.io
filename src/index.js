import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'tachyons'
import App from './App'
import RainOrShine from './routes/RainOrShine'
import Robofriends from './routes/Robofriends'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="rain-or-shine" element={<RainOrShine />} />
			<Route path="robofriends" element={<Robofriends />} />
		</Routes>
	</BrowserRouter>
)
