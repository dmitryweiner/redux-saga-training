import store from '../../app/store';
import MockAdapter from 'axios-mock-adapter';
import { instance } from '../../apiService';
import { authInit } from './authSlice';
const axiosMock = new MockAdapter(instance);

test('user can login', async () => {
    const user = {
        id: '123',
        nickname: 'nick',
        password: '123'
    };

    axiosMock
        .onPost('/auth')
        .reply(200, {
            token: '123'
        });

    await store.dispatch(authInit(user));
    expect(store.getState().auth.isLogged).toBe(true);
});
