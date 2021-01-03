import chai from 'chai';
import { expect } from 'chai';
import spies from 'chai-spies';

import { createFilter, createFilterSetForFields } from '../src/filter';

import { dummyFn } from './helper/util';
import { testExtendedFilter } from './helper/test-filter';

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
		const fn1 = chai.spy(dummyFn);
		const fn2 = chai.spy(dummyFn);

		const filter1 = createFilter({ foo: fn1 });
		const filterSet2 = { bar: fn2 };

		const filter = filter1.append(filterSet2);

		testExtendedFilter(filter, fn1, fn2);
	});

	it('should append filter set with the same field', () => {
		const fn1 = chai.spy(dummyFn);
		const fn2 = chai.spy(dummyFn);

		const filter1 = createFilter({ foo: fn1 });
		const filterSet2 = { foo: fn2 };

		const filter = filter1.append(filterSet2);

		testExtendedFilter(filter, fn1, fn2);
	});
});

describe('Test appending invalid filter set to filter', () => {
	it('should throw error if filter set is not specified', () => {
		const baseFilter = createFilter({ foo: dummyFn });
		// @ts-expect-error
		expect(() => baseFilter.append(null)).to.throw(
			'No filter set is specified!'
		);
	});

	it('should throw error if filter set is not an object', () => {
		const baseFilter = createFilter({ foo: dummyFn });
		// @ts-expect-error
		expect(() => baseFilter.append(2)).to.throw(
			"Invalid filter set: expected 'object', got 'number'"
		);
	});

	it('should throw error if filter set is invalid', () => {
		const baseFilter = createFilter({ foo: dummyFn });
		// @ts-expect-error
		expect(() => baseFilter.append({ foo: 2 })).to.throw(
			"Invalid filter function: expected 'function', got 'number'"
		);
	});
});

describe('Test extending filter', () => {
	it('should merge two filters with different fields', () => {
		const fn1 = chai.spy(dummyFn);
		const fn2 = chai.spy(dummyFn);

		const filter1 = createFilter({ foo: fn1 });
		const filter2 = createFilter({ bar: fn2 });

		const filter = filter1.extend(filter2);

		testExtendedFilter(filter, fn1, fn2);
	});

	it('should merge two filters with the same field', () => {
		const fn1 = chai.spy(dummyFn);
		const fn2 = chai.spy(dummyFn);

		const filter1 = createFilter({ foo: fn1 });
		const filter2 = createFilter({ foo: fn2 });

		const filter = filter1.extend(filter2);

		testExtendedFilter(filter, fn1, fn2);
	});
});

describe('Test extending filter with invalid filter', () => {
	it('should throw error if filter set is nullable', () => {
		const baseFilter = createFilter({ foo: dummyFn });
		// @ts-expect-error
		expect(() => baseFilter.extend(null)).to.throw(
			'No filter is specified!'
		);
	});

	it('should throw error if filter set is invalid', () => {
		const baseFilter = createFilter({ foo: dummyFn });
		// @ts-expect-error
		expect(() => baseFilter.extend(2)).to.throw(
			"Invalid filter: expected 'MetadataFilter', got 'number'"
		);
	});
});

describe('Test filtering strings', () => {
	it('should filter string', () => {
		const filter = createFilter({
			artist: [(text) => `${text}1`, (text) => `${text}2`],
		});

		expect(filter.filterField('artist', 'Text')).to.be.equal('Text12');
	});
});

describe('Test filtering empty strings', () => {
	const fn1 = chai.spy(dummyFn);

	const filter = createFilter({ artist: fn1 });

	it('should not call filter function is the input is an empty string', () => {
		const input = '';
		const actual = filter.filterField('artist', input);

		expect(actual).to.be.equal(input);
		expect(fn1).to.have.not.been.called();
	});

	it('should not call filter function is the input is null', () => {
		const input = null;
		// @ts-expect-error
		const actual = filter.filterField('artist', input);

		expect(actual).to.be.equal(input);
		expect(fn1).to.have.not.been.called();
	});
});

describe('Test filtering invalid filter field', () => {
	it('should throw error if invalid field is filtered', () => {
		const filter = createFilter({ foo: (text) => text });

		expect(() => filter.filterField('bar', 'Field value')).to.throw(
			'Invalid filter field: bar'
		);
	});
});

describe('Test invalid filter', () => {
	it('should throw error if the filter set is not specified', () => {
		// @ts-expect-error
		expect(() => createFilter(null)).to.throw(
			'No filter set is specified!'
		);
	});

	it('should throw error if the filter set is invalid', () => {
		// @ts-expect-error
		expect(() => createFilter({ foo: 1 })).to.throw(
			"Invalid filter function: expected 'function', got 'number'"
		);
	});

	it('should throw error if the filter set as an array is invalid', () => {
		// @ts-expect-error
		expect(() => createFilter({ foo: [1, 2] })).to.throw(
			"Invalid filter function: expected 'function', got 'number'"
		);
	});
});

describe('Test method chaining', () => {
	it('should call all filter functions', () => {
		const fn1 = chai.spy(dummyFn);
		const fn2 = chai.spy(dummyFn);
		const fn3 = chai.spy(dummyFn);

		const filter = createFilter({ artist: fn1 })
			.extend(createFilter({ track: fn2 }))
			.append({ album: fn3 });

		testExtendedFilter(filter, fn1, fn2, fn3);
	});
});

describe('Test creating filter set for fields', () => {
	const fn1 = dummyFn;
	const fn2 = dummyFn;

	it('should throw error when received invalid argument', () => {
		// @ts-expect-error
		expect(() => createFilterSetForFields(null, fn1)).to.throw(
			"Invalid 'fields' argument: expected 'string[]', got 'object'"
		);
	});

	it('should throw error when received empty fields array', () => {
		expect(() => createFilterSetForFields([], fn1)).to.throw(
			"Invalid 'fields' argument: received an empty array"
		);
	});

	it('should throw error when received invalid filter function', () => {
		// @ts-expect-error
		expect(() => createFilterSetForFields(['foo'], 2)).to.throw(
			"Invalid filter function: expected 'function', got 'number'"
		);
	});

	it('should throw error when received array of invalid filter function', () => {
		// @ts-expect-error
		expect(() => createFilterSetForFields(['foo'], [2, 3])).to.throw(
			"Invalid filter function: expected 'function', got 'number'"
		);
	});

	it('should throw error when received array of invalid fields', () => {
		// @ts-expect-error
		expect(() => createFilterSetForFields(['foo', 2], fn1)).to.throw(
			"Invalid field: expected 'string', got 'number'"
		);
	});

	it('should throw error when received array with empty field', () => {
		expect(() => createFilterSetForFields(['foo', ''], fn1)).to.throw(
			"Invalid field: expected 'string', got an empty string"
		);
	});

	it('should create filter set with single functions', () => {
		const filterSet = createFilterSetForFields(['foo', 'bar', 'baz'], fn1);
		const expectedResult = {
			foo: fn1,
			bar: fn1,
			baz: fn1,
		};

		expect(filterSet).to.be.deep.equal(expectedResult);
	});

	it('should create filter set with multiple filter functions', () => {
		const filterSet = createFilterSetForFields(
			['foo', 'bar', 'baz'],
			[fn1, fn2]
		);
		const expectedResult = {
			foo: [fn1, fn2],
			bar: [fn1, fn2],
			baz: [fn1, fn2],
		};

		expect(filterSet).to.be.deep.equal(expectedResult);
	});
});
