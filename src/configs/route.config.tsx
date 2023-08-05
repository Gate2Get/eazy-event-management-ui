import React from 'react';
import { App403 } from '../components/403';
import { App404 } from '../components/404';

export const ROUTES = [
	{
		path: '/forbidden',
		element: <App403 />,
	},
	{
		path: '*',
		element: <App404 />,
	},
];
