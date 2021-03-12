export interface AuthorizedFilter {
    TRUE: boolean
    FALSE: boolean
}

export const AUTHORIZED_FILTER: AuthorizedFilter = {
    TRUE: true,
    FALSE: false,
}

export enum PERSONAL_TYPES {
    SET_AUTHORIZED = 'SET_AUTHORIZED',
    SET_JWT = 'SET_JWT',
}

export interface PersonalPayload {
    authorized?: boolean
    jwt?: string
}

export interface PersonalAction {
    type: PERSONAL_TYPES
    payload: PersonalPayload
}

export interface PersonalState extends PersonalPayload {}

const initialState: PersonalState = {
    authorized: AUTHORIZED_FILTER.FALSE,
    jwt: '',
}

const personal = (state = initialState, action: PersonalAction) => {
    switch (action.type) {
        case PERSONAL_TYPES.SET_AUTHORIZED: {
            return { ...state, ...{ authorized: action.payload.authorized } }
        }
        case PERSONAL_TYPES.SET_JWT: {
            return { ...state, ...{ jwt: action.payload.jwt } }
        }
        default: {
            return state
        }
    }
}

export default personal
