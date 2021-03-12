export enum FOREX_TYPES {
    SET_DATA_POINTS = 'SET_DATA_POINTS',
    SET_NAME = 'SET_NAME',
}

export interface DataPoints {
    close: number
    open: number
    low: number
    high: number
    date: Date
}

export interface ForexPayload {
    currencyName: string
    currencyData: DataPoints[]
}

export interface ForexAction {
    type: FOREX_TYPES
    payload: ForexPayload
}

export interface ForexState extends ForexPayload {}

const initialState: ForexState = {
    currencyName: '',
    currencyData: [],
}

const forex = (state = initialState, action: ForexAction) => {
    switch (action.type) {
        case FOREX_TYPES.SET_DATA_POINTS: {
            return {
                ...state,
                ...{ currencyData: action.payload.currencyData },
            }
        }
        case FOREX_TYPES.SET_NAME: {
            return {
                ...state,
                ...{ currencyName: action.payload.currencyName },
            }
        }
        default: {
            return state
        }
    }
}

export default forex
