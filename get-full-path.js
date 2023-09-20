function getFullPath(obj, path, step) {
  if (!obj.children.length) return obj.name;
  const newObj = obj.children.find((el) => el.id === +path[step]);
  return `${obj.name} / ${getFullPath(newObj, path, step + 1)}`;
}

export default getFullPath;
