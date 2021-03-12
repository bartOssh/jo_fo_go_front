import { PERSONAL_TYPES, PersonalAction } from './reducers/personal'

export const setAuthorized = (value: boolean): PersonalAction => ({
    type: PERSONAL_TYPES.SET_AUTHORIZED,
    payload: { authorized: value },
})

export const setJWT = (value: string): PersonalAction => ({
    type: PERSONAL_TYPES.SET_JWT,
    payload: { jwt: value },
})
