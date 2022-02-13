const objectifyArrayById = ({
  array,
  keyAsId = 'id',
  template = {},
}) => {
  return array.reduce((current, item) => {
    current[item[keyAsId]] = {
      id: item[keyAsId],
      ...template,
      ...item,
    };
    return current;
  }, {});
};

export default objectifyArrayById;
