function isObject(item: unknown): item is Record<string, unknown> {
  return typeof item === 'object' && item !== null;
}

function isEmpty(item: unknown): boolean {
  return (
    item === null ||
    item === undefined ||
    (typeof item === 'string' && item.trim() === '')
  );
}

export function deepEquals(a: unknown, b: unknown): boolean {
  if (isObject(a) && isObject(b)) {
    const keysA = Object.keys(a);

    return keysA.every((key) => deepEquals(a[key], b[key]));
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return (
      a.length === b.length &&
      a.every((value, index) => deepEquals(value, b[index]))
    );
  }

  if (isEmpty(a) && isEmpty(b)) {
    return true;
  }

  return a === b;
}
