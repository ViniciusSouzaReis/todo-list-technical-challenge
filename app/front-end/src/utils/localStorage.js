const USER_STORAGE_KEY = 'user';

function readStorage() {
  return JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || '{}');
}

function writeStorage(data) {
  localStorage.setItem('user', JSON.stringify(data));
}

function removeKey() {
  localStorage.clear();
}

export {
  readStorage,
  writeStorage,
  removeKey,
};
