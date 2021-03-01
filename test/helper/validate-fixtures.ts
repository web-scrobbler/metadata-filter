/**
 * Validate the given array of fixtures.
 *
 * @param fixtureId Fixture ID
 * @param fixtures Array of fixtures
 * @param requiredProperties Array of required properties
 *
 * @throws Throw an error if any of required properties are missing or have invalid type
 */
export function validateFixtures<T>(
	fixtureId: string,
	fixtures: ReadonlyArray<T>,
	requiredProperties: ReadonlyArray<keyof T>
): void {
	for (const fixture of fixtures) {
		for (const property of requiredProperties) {
			if (typeof fixture[property] !== 'string') {
				throw new Error(
					`Missing ${
						property as string
					} in test case for '${fixtureId}'`
				);
			}
		}
	}
}
