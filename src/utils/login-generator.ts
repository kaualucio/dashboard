export function loginGenerator() {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ';
  const loginLength = 10;
  let login = '';

  for (let i = 0; i < loginLength; i++) {
    let randomNumber = Math.floor(Math.random() * chars.length);
    login += chars.substring(randomNumber, randomNumber + 1);
  }
  return login;
}
