import React from 'react';
import { Layout } from 'antd';
import './styles.scss';
import { useWindowSize } from '../hooks/useWindowSize';

const { Header, Content } = Layout;

export const AppLayout: React.FC<any> = (props): React.ReactElement => {
	/* A custom hook that returns the width and height of the window. */
	const { height } = useWindowSize();

	const { children } = props;

	return (
		<Layout>
			<Header style={{ background: '#041F41', padding: '0 26px' }}></Header>
			<Layout>

				<Content
					style={{
						margin: '10px 10px',
						padding: 10,
						height: height - 90,
						background: '#FFFFFF',
					}}
				>
					{children}
				</Content>
			</Layout>
		</Layout>
	);
};
