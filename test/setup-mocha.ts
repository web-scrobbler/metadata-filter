import chai from 'chai';
import spies from 'chai-spies';

import { filterMatcher } from './matcher/filter-matcher';

chai.use(spies);
chai.use(filterMatcher);
