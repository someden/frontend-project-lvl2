import _ from 'lodash';

export const linesSeparator = '\n';

export const unchanged = 'unchanged';
export const removed = 'removed';
export const added = 'added';
export const updated = 'updated';

export const getDiffType = (obj1, obj2, key) => {
  if (!_.has(obj2, key)) {
    return removed;
  }

  if (!_.has(obj1, key)) {
    return added;
  }

  if (
    obj1[key] === obj2[key]
    || (_.isObject(obj1[key]) && _.isObject(obj2[key]))
  ) {
    return unchanged;
  }

  return updated;
};

export const getDiffTree = (obj1, obj2) => _.sortBy(Object.keys({ ...obj1, ...obj2 }))
  .reduce(
    (acc, key) => [
      ...acc,
      {
        key,
        oldValue: obj1[key],
        newValue: obj2[key],
        type: getDiffType(obj1, obj2, key),
        children: _.isObject(obj1[key]) && _.isObject(obj2[key])
          ? getDiffTree(obj1[key], obj2[key])
          : [],
      },
    ],
    [],
  );
