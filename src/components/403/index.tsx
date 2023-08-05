import React from 'react';
import { Button, Result } from 'antd';

export const App403: React.FC = () => {
	return (
		<Result
			status="403"
			subTitle="Sorry, you are not authorized to access this page."
			title="403"
			extra={
				<Button type="default" onClick={() => { window.location.replace('/'); }}>
					Back Home
				</Button>
			}
		/>
	);
};
