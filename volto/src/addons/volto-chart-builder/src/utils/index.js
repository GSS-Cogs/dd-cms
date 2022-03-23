export const defaultText = (val, defaultText) => (val ? val : defaultText);

export const classes = (items) => {
  let classes = '';

  items.forEach(({ val, prefix }) => {
    if (val && prefix) {
      classes += ' ' + prefix + val.toLowerCase().split(' ').join('-');
    }
  });

  return classes;
};
