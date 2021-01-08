import fs from 'fs';
import path from 'path';

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

const fixturesBasePath = path.normalize(path.join(__dirname, '../fixtures'));

/**
 * Loads a JSON fixture file out of the fixtures directory.
 *
 * @param name The filename of the fixture to be loaded.
 *
 * @return T[]
 */
export function loadFixtureFile<T>(name: string): T[] {
	const fixturesPath = path.join(fixturesBasePath, `${name}.json`);
	const fixturesData = fs.readFileSync(fixturesPath, 'utf8');
	return JSON.parse(fixturesData) as T[];
}
