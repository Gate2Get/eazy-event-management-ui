/* eslint-disable max-lines-per-function */
import type { TableProps } from 'antd';
import { Table, theme } from 'antd';
import { type ColumnType } from 'antd/es/table';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import React, { useEffect, useRef, useState } from 'react';
import { type GridOnItemsRenderedProps, VariableSizeGrid as Grid } from 'react-window';

interface virtualTableProps extends TableProps<any> {
	isVirtualization?: boolean;
	rowHeight?: number;
	handleInfiniteScroll?: (item: GridOnItemsRenderedProps) => void;
}

export const VirtualTable = <RecordType extends object>(
	props: virtualTableProps,
): React.ReactElement => {
	const {
		columns,
		scroll,
		isVirtualization,
		handleInfiniteScroll,
		rowHeight = 96,
		rowClassName = '',
		className,
	} = props;
	const [tableWidth, setTableWidth] = useState(0);
	const { token } = theme.useToken();
	const virtualizationProps: TableProps<RecordType> = {};

	let gridWidth = tableWidth;

	const widthColumnCount =
		columns?.filter(({ width }) => {
			if (width) {
				gridWidth -= width as number;
			}
			return !width;
		}).length || 0;

	const mergedColumns =
		columns?.map(column => {
			if (column.width) {
				return column;
			}
			return {
				...column,
				width: Math.floor(gridWidth / widthColumnCount),
			};
		}) || [];

	const gridRef = useRef<any>();
	const [connectObject] = useState<any>(() => {
		const obj = {};
		Object.defineProperty(obj, 'scrollLeft', {
			get: () => {
				if (gridRef.current) {
					return gridRef.current?.state?.scrollLeft;
				}
				return null;
			},
			set: (scrollLeft: number) => {
				if (gridRef.current) {
					gridRef.current.scrollTo({ scrollLeft });
				}
			},
		});

		return obj;
	});

	const resetVirtualGrid = (): void => {
		gridRef.current?.resetAfterIndices({
			columnIndex: 0,
			shouldForceUpdate: true,
		});
	};

	useEffect(() => resetVirtualGrid, [tableWidth]);

	const renderVirtualList = (rawData: object[], { scrollbarSize, ref, onScroll }: any): any => {
		ref.current = connectObject;
		const totalHeight = rawData.length * 54;

		return (
			<Grid
				className="virtual-grid"
				columnCount={mergedColumns.length}
				height={scroll?.y as number}
				ref={gridRef}
				rowCount={rawData.length}
				rowHeight={height => rowHeight}
				width={tableWidth}
				columnWidth={(index: number) => {
					const { width } = mergedColumns[index];
					return totalHeight > (scroll?.y as number) && index === mergedColumns.length - 1
						? (width as number) - scrollbarSize - 1
						: (width as number);
				}}
				onItemsRendered={props => {
					handleInfiniteScroll?.(props);
				}}
				onScroll={props => {
					onScroll({ scrollLeft: props.scrollLeft });
				}}
			>
				{({
					columnIndex,
					rowIndex,
					style,
				}: {
					columnIndex: number;
					rowIndex: number;
					style: React.CSSProperties;
				}) => {
					const data = (rawData[rowIndex] as any)[
						(mergedColumns as any)[columnIndex]?.dataIndex
					];
					const column = mergedColumns?.[columnIndex] as ColumnType<RecordType>;
					return (
						<div
							className={classNames(
								`virtual-table-cell ${rowClassName} ${column.dataIndex}`,
								{
									'virtual-table-cell-last':
										columnIndex === mergedColumns.length - 1,
								},
							)}
							style={{
								...style,
								minHeight: rowHeight,
								boxSizing: 'border-box',
								borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
								background: token.colorBgContainer,
							}}
						>
							{column.render
								? column.render(data, rawData[rowIndex] as any, rowIndex)
								: data}
						</div>
					);
				}}
			</Grid>
		);
	};

	if (isVirtualization) {
		virtualizationProps.components = {
			body: renderVirtualList as any,
		};
	}

	return (
		<ResizeObserver
			onResize={({ width }) => {
				setTableWidth(width);
			}}
		>
			<Table
				{...props}
				className={`virtual-table ${className}`}
				columns={mergedColumns}
				pagination={false}
				{...virtualizationProps}
			/>
		</ResizeObserver>
	);
};
