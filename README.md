# Collection Utility for TypeScript

A lightweight, fluent utility class for working with arrays in TypeScript. Inspired by Laravel's Collection API.

---

## Features

- **Add Items**: Easily add single or multiple items to the collection.
- **Filter**: Filter items by a condition.
- **Transform**: Transform items using a callback.
- **Sort**: Sort items by a key or property.
- **Aggregation**: Perform sum and count operations.
- **Utility**: Extract specific properties or retrieve the first/last items.

---

## Installation

To install the package:

npm install @charon4/collection-array

## Example

```typescript
const users: {
  id: number;
  name: string;
  age: number;
  class: string;
}[] = [
  { id: 1, name: 'Alice', age: 20, class: 'Math' },
  { id: 2, name: 'Bob', age: 22, class: 'Physics' },
  { id: 3, name: 'Charlie', age: 21, class: 'Chemistry' },
  { id: 4, name: 'Daisy', age: 23, class: 'Biology' },
  { id: 5, name: 'Edward', age: 19, class: 'History' },
  { id: 6, name: 'Fiona', age: 20, class: 'English' },
  { id: 7, name: 'George', age: 22, class: 'Art' },
  { id: 8, name: 'Hannah', age: 21, class: 'Music' },
  { id: 9, name: 'Ivy', age: 20, class: 'Geography' },
  { id: 10, name: 'Jack', age: 23, class: '5tr' },
];

const collectionUser = new Collection(users);

// 1. Find users aged 20
// Traditional approach: users.filter((user) => user.age === 20);
collectionUser.where('age', 20).all();

// 2. Count users in the 'English' class
// Traditional approach: users.filter((user) => user.class === 'English').length;
collectionUser.where('class', 'English').count();

// 3. Calculate the total age of users in the 'English' class
// Traditional approach:
// users.filter((user) => user.class === 'English').reduce((sum, user) => sum + user.age, 0);
collectionUser.where('class', 'English').sum('age');

// 4. Get the first user in the 'English' class
// Traditional approach: users.find((user) => user.class === 'English');
collectionUser.where('class', 'English').first();

// 5. Sort users by class in descending order
// Traditional approach:
// [...users].sort((a, b) => (a.class > b.class ? -1 : a.class < b.class ? 1 : 0));
collectionUser.sortBy('class', 'desc').all();

// 6. Get a list of user names
// Traditional approach: users.map((user) => user.name);
collectionUser.pluck('name').all();