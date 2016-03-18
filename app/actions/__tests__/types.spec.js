import { expect } from 'chai';
import * as categories from '../types';

describe('actions/types', () => {
  it('should not be copy pasted blindly', () => {
    Object.keys(categories).forEach((category) => {
      Object.keys(categories[category]).forEach((key) => {
        expect(categories[category][key]).to.equal(`${category}/${key}`);
      });
    });
  });
});
