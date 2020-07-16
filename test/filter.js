import chai from 'chai';
import { expect } from 'chai';
import spies from 'chai-spies';

import { MetadataFilter } from './../src/filter';

import { testExtendedFilter } from './helpers';

chai.use(spies);

describe('Test appending filter set', () => {
	const fn1 = chai.spy();
	const fn2 = chai.spy();

	const filter1 = new MetadataFilter({ all: fn1 });
	const filterSet2 = { all: fn2 };

	const filter = filter1.append(filterSet2);

	testExtendedFilter(filter, fn1, fn2);
});

describe('Test extending filter', () => {
	const fn1 = chai.spy();
	const fn2 = chai.spy();

	const filter1 = new MetadataFilter({ all: fn1 });
	const filter2 = new MetadataFilter({ all: fn2 });

	const filter = filter1.extend(filter2);

	testExtendedFilter(filter, fn1, fn2);
});

describe('Test filtering empty strings', () => {
	/**
	 * Function that should not be called.
	 * @throws {Error} if is called
	 */
	function shouldNotBeCalled() {
		throw new Error('This function should not be called');
	}

	const filter = new MetadataFilter({ artist: shouldNotBeCalled });

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

describe('Test invalid filter', () => {
	it('should throw error if the filter set is not specified', () => {
		expect(() => new MetadataFilter(null)).to.throw();
	});

	it('should throw error if the filter set is invalid', () => {
		expect(() => new MetadataFilter({ all: 1 })).to.throw();
	});

	it('should throw error if the filter set as an array is invalid', () => {
		expect(() => new MetadataFilter({ all: [1, 2] })).to.throw();
	});

	it('should throw error if the filter set constains invalid field', () => {
		expect(() => new MetadataFilter({ foo: () => 'bar' })).to.throw();
	});
});

describe('Test method chaining', () => {
	const fn1 = chai.spy();
	const fn2 = chai.spy();
	const fn3 = chai.spy();

	const filter = new MetadataFilter({ artist: fn1 })
		.extend(new MetadataFilter({ track: fn2 }))
		.append({ album: fn3 });

	testExtendedFilter(filter, fn1, fn2, fn3);
});
