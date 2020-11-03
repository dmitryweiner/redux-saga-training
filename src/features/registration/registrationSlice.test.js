import store from '../../app/store';
import { actions, registrationInit } from './registrationSlice';
import MockAdapter from 'axios-mock-adapter';
import { wait } from '@testing-library/dom'
import { instance } from '../../apiService';
import { act } from '@testing-library/react';
const mockAxios = new MockAdapter(instance);

test('creating user should call API and add user to store', async () => {
    const user = {
        id: '123',
        nickname: 'nickname',
        password: 'password'
    };
    mockAxios.onPost('/user').reply(200, {
        id: user.id,
        nickname: user.nickname
    });
    await store.dispatch(registrationInit(user));
    await new Promise(resolve => setTimeout(resolve, 2000));
    expect(store.getState().registration.apiState.isSuccess).toBe(true);
    expect(store.getState().registration.apiState.isLoading).toBe(false);
    expect(store.getState().registration.user.nickname).toBe(user.nickname);
});
