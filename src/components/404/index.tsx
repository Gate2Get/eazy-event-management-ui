import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';

export const App404: React.FC = () => {
	const navigate = useNavigate();

	/* Redirecting to the 404 page. */
	React.useEffect(() => {
		navigate('/404');
	}, []);

	return (
		<Result
			status="404"
			subTitle="Sorry, the page you visited does not exist."
			title="404"
			extra={
				<Button type="default" onClick={() => { window.location.replace('/'); }}>
					Back Home
				</Button>
			}
		/>
	);
};
