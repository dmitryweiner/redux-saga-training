import store from '../../app/store';
import { userInit } from './userSlice';

test('Getting user should call API and add user info to store', () => {
    store.dispatch(userInit());

});
