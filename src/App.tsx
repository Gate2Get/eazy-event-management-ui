import React from 'react';
import './App.scss';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ROUTES } from './configs/route.config';
import { AppLayout } from './layout';

function App(): React.ReactElement {
	return (
		<div>
			<BrowserRouter>
				<AppLayout>
					<Routes>
						{ROUTES.map(route => (
							<Route element={route.element} key={route.path} path={route.path} />
						))}
					</Routes>
				</AppLayout>
			</BrowserRouter>
		</div>
	);
}

export default App;
