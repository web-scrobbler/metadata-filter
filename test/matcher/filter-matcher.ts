/* eslint-disable @typescript-eslint/no-namespace */

import { Assertion } from 'chai';

import { FilterFunction, MetadataFilter } from '../../src';

export function filterMatcher(chai: Chai.ChaiStatic): void {
	chai.Assertion.addMethod('filterWith', filterWith);
}

function filterWith(
	this: Chai.AssertionStatic,
	...filterFunctions: FilterFunction[]
) {
	const filter = this._obj as unknown;
	if (!(filter instanceof MetadataFilter)) {
		throw new Error(
			"'filterWith' method must be used for MetadataFilter objects"
		);
	}

	for (const field of filter.getFields()) {
		filter.filterField(field, 'Test');
	}

	for (const f of filterFunctions) {
		new Assertion(f).to.have.been.called();
	}
}

declare global {
	export namespace Chai {
		interface Assertion {
			filterWith(...fn: FilterFunction[]): Assertion;
		}
	}
}
