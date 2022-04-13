import _ from 'lodash';

export const linesSeparator = '\n';

export const unchanged = 'unchanged';
export const removed = 'removed';
export const added = 'added';
export const updated = 'updated';

const getDiffType = (data1, data2, key) => {
  if (!_.has(data2, key)) {
    return removed;
  }

  if (!_.has(data1, key)) {
    return added;
  }

  if (
    data1[key] === data2[key]
    || (_.isObject(data1[key]) && _.isObject(data2[key]))
  ) {
    return unchanged;
  }

  return updated;
};

export const getDiffTree = (data1, data2) => _.sortBy(Object.keys({ ...data1, ...data2 }))
  .reduce(
    (acc, key) => [
      ...acc,
      {
        key,
        oldValue: data1[key],
        newValue: data2[key],
        type: getDiffType(data1, data2, key),
        children: _.isObject(data1[key]) && _.isObject(data2[key])
          ? getDiffTree(data1[key], data2[key])
          : [],
      },
    ],
    [],
  );
