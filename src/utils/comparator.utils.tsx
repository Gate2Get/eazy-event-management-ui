import { type ReactNode } from 'react';
/**
 * It compares two values and returns a number
 * @param {any} a - any, b: any
 * @param {any} b - any - The second parameter to compare.
 * @returns A function that takes two arguments and returns a number.
 */
type comparatorType = number | string | object | undefined | ReactNode;
export const compare = (a: comparatorType, b: comparatorType): number => {
	if (typeof a === 'string' && typeof b === 'string') {
		return a.localeCompare(b);
	} else if (typeof a === 'number' && typeof b === 'number') {
		return a > b ? 1 : 0;
	} else if (typeof a === 'boolean' && typeof b === 'boolean') {
		return Number(b) - Number(a);
	} else {
		return 0;
	}
};
