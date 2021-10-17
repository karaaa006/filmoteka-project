import refs from './refs.js';

const { userMenu } = refs;

export const renderUserMarkup = (template, info) => {
  const userMenuMarkup = template(info);
  return (userMenu.innerHTML = userMenuMarkup);
};
