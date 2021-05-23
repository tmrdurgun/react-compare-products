const helpers = require('./helpers');

describe('Helpers TESTS', () => {
    it('should sort object keys', () => {
        const obj = {
            'Kayseri': 0,
            'Istanbul': 1,
            'Adana': 2
        }

        const result = helpers.sortKeyAlphabetic(obj);

        expect(result.sortedKeys).toBeDefined();
        expect(result.sortedKeys).toStrictEqual(['Adana', 'Istanbul', 'Kayseri']);
    })
})