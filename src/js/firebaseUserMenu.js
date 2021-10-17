import userMenuTpl from '../templates/film-card_modal.hbs';
import { renderUserMarkup } from './renderUserMenu';
import { isSignin, getUserName } from './firebase';

export function renderUserMenu() {
  const userInfo = {};
  if (isSignin()) {
    // userInfo.name;
    console.log(getUserName());
  }
}
renderUserMenu();
