import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    })

    it('should stor the token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS, token: 'action.token',
            userId: 'action.userId',
            loading: false
        })).toEqual({
            token: 'action.token',
            userId: 'action.userId',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    })
});