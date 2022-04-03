export const isObject = (value) => typeof value === 'object' && value !== null;

export const diffTypes = {
  deleted: 'deleted',
  added: 'added',
  unchanged: 'unchanged',
  changed: 'changed',
};

export const getDiffType = (obj1, obj2, key) => {
  if (!Object.hasOwn(obj2, key)) {
    return diffTypes.deleted;
  }

  if (!Object.hasOwn(obj1, key)) {
    return diffTypes.added;
  }

  if (obj1[key] === obj2[key] || (isObject(obj1[key]) && isObject(obj2[key]))) {
    return diffTypes.unchanged;
  }

  return diffTypes.changed;
};

export const getDiffTree = (obj1, obj2) =>
  Object.keys({ ...obj1, ...obj2 })
    .sort()
    .reduce(
      (acc, key) => [
        ...acc,
        {
          key,
          oldValue: obj1[key],
          newValue: obj2[key],
          type: getDiffType(obj1, obj2, key),
          children:
            isObject(obj1[key]) && isObject(obj2[key])
              ? getDiffTree(obj1[key], obj2[key])
              : [],
        },
      ],
      []
    );
