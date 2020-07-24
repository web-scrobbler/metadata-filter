import chai from 'chai';
import { expect } from 'chai';
import spies from 'chai-spies';

import { createFilter } from './../src/filter';

import { testExtendedFilter, dummyFn } from './helpers';

chai.use(spies);

describe('Test `canFilterField` method', () => {
	it('should return true for supported field', () => {
		const filter = createFilter({ foo: dummyFn });
		expect(filter.canFilterField('foo')).to.be.true;
	});

	it('should return false for unsupported field', () => {
		const filter = createFilter({ foo: dummyFn });
		expect(filter.canFilterField('bar')).to.be.false;
	});
});

describe('Test `getFields` method', () => {
	it('should return a list of fields', () => {
		const filter = createFilter({ foo: dummyFn, bar: dummyFn });
		expect(filter.getFields()).to.be.deep.equal(['foo', 'bar']);
	});
});

describe('Test appending filter set', () => {
	it('should append filter set with different fields', () => {
		const fn1 = chai.spy();
		const fn2 = chai.spy();

		const filter1 = createFilter({ foo: fn1 });
		const filterSet2 = { bar: fn2 };

		const filter = filter1.append(filterSet2);

		testExtendedFilter(filter, fn1, fn2);
	});

	it('should append filter set with the same field', () => {
		const fn1 = chai.spy();
		const fn2 = chai.spy();

		const filter1 = createFilter({ foo: fn1 });
		const filterSet2 = { foo: fn2 };

		const filter = filter1.append(filterSet2);

		testExtendedFilter(filter, fn1, fn2);
	});
});

describe('Test extending filter', () => {
	it('should merge two filters with different fields', () => {
		const fn1 = chai.spy();
		const fn2 = chai.spy();

		const filter1 = createFilter({ foo: fn1 });
		const filter2 = createFilter({ bar: fn2 });

		const filter = filter1.extend(filter2);

		testExtendedFilter(filter, fn1, fn2);
	});

	it('should merge two filters with the same field', () => {
		const fn1 = chai.spy();
		const fn2 = chai.spy();

		const filter1 = createFilter({ foo: fn1 });
		const filter2 = createFilter({ foo: fn2 });

		const filter = filter1.extend(filter2);

		testExtendedFilter(filter, fn1, fn2);
	});
});

describe('Test filtering empty strings', () => {
	/**
	 * Function that should not be called.
	 * @throws {Error} if is called
	 */
	function shouldNotBeCalled() {
		throw new Error('This function should not be called');
	}

	const filter = createFilter({ artist: shouldNotBeCalled });

	it('should not call filter function is the input is an empty string', () => {
		const input = '';
		const actual = filter.filterField('artist', input);

		expect(actual).to.be.equal(input);
	});

	it('should not call filter function is the input is null', () => {
		const input = null;
		const actual = filter.filterField('artist', input);

		expect(actual).to.be.equal(input);
	});
});

describe('Test filtering invalid filter field', () => {
	it('should throw error if invalid field is filtered', () => {
		const filter = createFilter({ foo: (text) => text });

		expect(() => filter.filterField('bar', 'Field value')).to.throw();
	});
});

describe('Test invalid filter', () => {
	it('should throw error if the filter set is not specified', () => {
		expect(() => createFilter(null)).to.throw();
	});

	it('should throw error if the filter set is invalid', () => {
		expect(() => createFilter({ foo: 1 })).to.throw();
	});

	it('should throw error if the filter set as an array is invalid', () => {
		expect(() => createFilter({ foo: [1, 2] })).to.throw();
	});
});

describe('Test method chaining', () => {
	const fn1 = chai.spy();
	const fn2 = chai.spy();
	const fn3 = chai.spy();

	const filter = createFilter({ artist: fn1 })
		.extend(createFilter({ track: fn2 }))
		.append({ album: fn3 });

	testExtendedFilter(filter, fn1, fn2, fn3);
});
