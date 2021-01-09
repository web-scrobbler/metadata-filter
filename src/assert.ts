import type { FilterSet, FilterFunction } from './filter';

/**
 * Assert the given fields are valid.
 *
 * @param fields Fields to filter
 *
 * @throws Throw an error if the assertion is failed
 */
export function assertFieldsAreValid(fields: string[]): void {
	if (!Array.isArray(fields)) {
		throw new TypeError(
			`Invalid 'fields' argument: expected 'string[]', got '${typeof fields}'`
		);
	}

	if (fields.length === 0) {
		throw new Error("Invalid 'fields' argument: received an empty array");
	}

	for (const field of fields) {
		if (typeof field !== 'string') {
			throw new TypeError(
				`Invalid field: expected 'string', got '${typeof field}'`
			);
		}

		if (!field) {
			throw new TypeError(
				"Invalid field: expected 'string', got an empty string"
			);
		}
	}
}

/**
 * Assert the given object is a valid filter set.
 *
 * @param filterSet Filter set
 *
 * @throws Throw an error if the assertion is failed
 */
export function assertFilterSetIsValid(filterSet: FilterSet): void {
	if (!filterSet) {
		throw new TypeError('No filter set is specified!');
	}

	if (typeof filterSet !== 'object') {
		throw new TypeError(
			`Invalid filter set: expected 'object', got '${typeof filterSet}'`
		);
	}

	for (const field in filterSet) {
		assertFilterSetFiltersAreValid(filterSet[field]);
	}
}

/**
 * Assert the given filter function or the array of filter functions are valid.
 *
 * @param filterFn Filter function or array of filter functions
 *
 * @throws Throw an error if the assertion is failed
 */
export function assertFilterSetFiltersAreValid(
	filterFn: FilterFunction | FilterFunction[]
): void {
	if (Array.isArray(filterFn)) {
		assertArrayOfFilterFunctionsIsValid(filterFn);
	} else {
		assertFilterFunctionIsValid(filterFn);
	}
}

/**
 * Assert each function in the given array of filter functions is valid.
 *
 * @param filterFnArr Array of filter functions
 *
 * @throws Throw an error if the assertion is failed
 */
function assertArrayOfFilterFunctionsIsValid(
	filterFnArr: FilterFunction[]
): void {
	filterFnArr.forEach(assertFilterFunctionIsValid);
}

/**
 * Assert the given filter function is valid.
 *
 * @param filterFn Filter function
 *
 * @throws Throw an error if the assertion is failed
 */
function assertFilterFunctionIsValid(filterFn: FilterFunction): void {
	if (typeof filterFn !== 'function') {
		throw new TypeError(
			`Invalid filter function: expected 'function', got '${typeof filterFn}'`
		);
	}
}
