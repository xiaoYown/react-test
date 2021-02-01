// https://docs.cypress.io/api/introduction/api.html
import login from '../utils/login';

describe((new Date()).toString(), () => {
  it('Elfin login', () => {
    login();
  });
});
