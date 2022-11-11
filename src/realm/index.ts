import {createRealmContext} from '@realm/react';
import {Buddy, PhoneNo} from './Schema';

export const BuddyRealmContext = createRealmContext({
  schema: [Buddy.schema, PhoneNo.schema],
});
