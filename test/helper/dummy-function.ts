import { spy } from 'chai';

import type { FilterFunction } from '../../src';

/**
 * A dummy filter function that returns an input.
 *
 * @param text String to be filtered
 *
 * @return Unmodified input
 */
export function dummyFn(text: string): string {
	return text;
}

/**
 * Create a spyable filter function.
 *
 * @return Filter function
 */
export function createSpyFilterFunction(): FilterFunction {
	return spy(dummyFn);
}
