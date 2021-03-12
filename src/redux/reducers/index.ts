import { combineReducers } from 'redux'
import personal from './personal'
import forex from './forex'
import {PersonalState} from './personal'
import {ForexState} from './forex'

export interface AppState {
    personal: PersonalState
    forex: ForexState
}

export default combineReducers({ personal, forex })
