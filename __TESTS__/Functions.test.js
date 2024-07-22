import {
  normalizeString,
  sortAlphabetically,
  sortAddedNewOld,
  sortAddedOldNew,
  sortUpdatedNewOld,
  sortUpdatedOldNew,
} from '../src/utils/functions';

const mockBooks = [
  {
    id: 5,
    title: 'Book 5',
    added: new Date('2024-07-12'),
    updated: new Date('2024-07-13'),
  },
  {
    id: 3,
    title: 'Book 3',
    added: new Date('2024-07-14'),
    updated: new Date('2024-07-20'),
  },
  {
    id: 1,
    title: 'Book 1',
    added: new Date('2024-07-15'),
    updated: new Date('2024-07-30'),
  },
  {
    id: 4,
    title: 'Book 4',
    added: new Date('2024-07-16'),
    updated: new Date('2024-07-17'),
  },
  {
    id: 2,
    title: 'Book 2',
    added: new Date('2024-07-13'),
    updated: new Date('2024-07-15'),
  },
];

test('normalizeString returns a lowercase string and removes white spaces from both ends of the string', () => {
  expect(normalizeString(' THIS IS A TEST ')).toBe('this is a test');
});

test('sortAlphabetically sorts an array by title', () => {
  const books = [...mockBooks];
  sortAlphabetically(books);
  expect(books).toEqual([
    {
      id: 1,
      title: 'Book 1',
      added: new Date('2024-07-15'),
      updated: new Date('2024-07-30'),
    },
    {
      id: 2,
      title: 'Book 2',
      added: new Date('2024-07-13'),
      updated: new Date('2024-07-15'),
    },
    {
      id: 3,
      title: 'Book 3',
      added: new Date('2024-07-14'),
      updated: new Date('2024-07-20'),
    },
    {
      id: 4,
      title: 'Book 4',
      added: new Date('2024-07-16'),
      updated: new Date('2024-07-17'),
    },
    {
      id: 5,
      title: 'Book 5',
      added: new Date('2024-07-12'),
      updated: new Date('2024-07-13'),
    },
  ]);
});

test('sortAddedNewOld sorts an array from newest to oldest in terms of date added', () => {
  const books = [...mockBooks];
  sortAddedNewOld(books);
  expect(books).toEqual([
    {
      id: 4,
      title: 'Book 4',
      added: new Date('2024-07-16'),
      updated: new Date('2024-07-17'),
    },
    {
      id: 1,
      title: 'Book 1',
      added: new Date('2024-07-15'),
      updated: new Date('2024-07-30'),
    },
    {
      id: 3,
      title: 'Book 3',
      added: new Date('2024-07-14'),
      updated: new Date('2024-07-20'),
    },
    {
      id: 2,
      title: 'Book 2',
      added: new Date('2024-07-13'),
      updated: new Date('2024-07-15'),
    },
    {
      id: 5,
      title: 'Book 5',
      added: new Date('2024-07-12'),
      updated: new Date('2024-07-13'),
    },
  ]);
});

test('sortAddedOldNew sorts an array from oldest to newest in terms of date added', () => {
  const books = [...mockBooks];
  sortAddedOldNew(books);
  expect(books).toEqual([
    {
      id: 5,
      title: 'Book 5',
      added: new Date('2024-07-12'),
      updated: new Date('2024-07-13'),
    },
    {
      id: 2,
      title: 'Book 2',
      added: new Date('2024-07-13'),
      updated: new Date('2024-07-15'),
    },
    {
      id: 3,
      title: 'Book 3',
      added: new Date('2024-07-14'),
      updated: new Date('2024-07-20'),
    },
    {
      id: 1,
      title: 'Book 1',
      added: new Date('2024-07-15'),
      updated: new Date('2024-07-30'),
    },
    {
      id: 4,
      title: 'Book 4',
      added: new Date('2024-07-16'),
      updated: new Date('2024-07-17'),
    },
  ]);
});

test('sortUpdatedOldNew sorts an array from oldest to newest in terms of date updated', () => {
  const books = [...mockBooks];
  sortUpdatedOldNew(books);
  expect(books).toEqual([
    {
      id: 5,
      title: 'Book 5',
      added: new Date('2024-07-12'),
      updated: new Date('2024-07-13'),
    },
    {
      id: 2,
      title: 'Book 2',
      added: new Date('2024-07-13'),
      updated: new Date('2024-07-15'),
    },
    {
      id: 4,
      title: 'Book 4',
      added: new Date('2024-07-16'),
      updated: new Date('2024-07-17'),
    },
    {
      id: 3,
      title: 'Book 3',
      added: new Date('2024-07-14'),
      updated: new Date('2024-07-20'),
    },
    {
      id: 1,
      title: 'Book 1',
      added: new Date('2024-07-15'),
      updated: new Date('2024-07-30'),
    },
  ]);
});

test('sortUpdatedNewOld sorts an array from newest to oldest in terms of date updated', () => {
  const books = [...mockBooks];
  sortUpdatedNewOld(books);
  expect(books).toEqual([
    {
      id: 1,
      title: 'Book 1',
      added: new Date('2024-07-15'),
      updated: new Date('2024-07-30'),
    },
    {
      id: 3,
      title: 'Book 3',
      added: new Date('2024-07-14'),
      updated: new Date('2024-07-20'),
    },
    {
      id: 4,
      title: 'Book 4',
      added: new Date('2024-07-16'),
      updated: new Date('2024-07-17'),
    },
    {
      id: 2,
      title: 'Book 2',
      added: new Date('2024-07-13'),
      updated: new Date('2024-07-15'),
    },
    {
      id: 5,
      title: 'Book 5',
      added: new Date('2024-07-12'),
      updated: new Date('2024-07-13'),
    },
  ]);
});
