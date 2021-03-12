import { BACKEND_API_ROOT, MODE } from '../credentials'

export interface UserCredentials {
    email: string
    password: string
}

export interface Success {
    success: boolean
}

export interface LoginSigninResult extends Success {
    jwt: string
}

export interface JWT {
    token: string
}

abstract class ApiConnector {
    constructor() {}
}

export abstract class Auth extends ApiConnector {
    protected abstract method: string
    protected abstract path: string
    private credentials: UserCredentials | null = null

    constructor() {
        super()
    }

    protected abstract parseResponse(res: Response): Promise<LoginSigninResult>

    setCredentials(credentials: UserCredentials): this {
        this.credentials = credentials
        return this
    }

    async dispatch(): Promise<LoginSigninResult> {
        if (this.credentials === null) {
            return { success: false, jwt: '' }
        }
        try {
            const res = await fetch(`${BACKEND_API_ROOT}${this.path}`, {
                method: this.method,
                body: JSON.stringify(this.credentials),
                headers: {
                    'Content-type': 'application/json',
                },
            })
            return await this.parseResponse(res)
        } catch (e) {
            console.error(e)
            return { success: false, jwt: '' }
        }
    }
}

export class LoginAuth extends Auth {
    protected method: string = 'post'
    protected path: string = '/login'
    constructor() {
        super()
    }

    protected async parseResponse(res: Response): Promise<LoginSigninResult> {
        if (res.status === 200 || res.status === 201) {
            const result: JWT = await res.json()
            if (result.token.length > 0) {
                return { success: true, jwt: result.token }
            }
        }
        return { success: false, jwt: '' }
    }
}

export class SigninAuth extends Auth {
    protected method: string = 'post'
    protected path: string = '/signin'
    constructor() {
        super()
    }

    protected async parseResponse(res: Response): Promise<LoginSigninResult> {
        if (res.status === 200 || res.status === 201) {
            return { success: true, jwt: '' }
        }
        return { success: false, jwt: '' }
    }
}

export abstract class TokenHeader {
    protected abstract method: string
    protected abstract path: string
    private jwt: JWT = { token: '' }

    constructor() {}

    setToken(jwt: JWT): this {
        this.jwt = jwt
        return this
    }

    protected abstract parseResponse(res: Response): Promise<Success>

    async dispatch(): Promise<Success> {
        if (!this.jwt.token.length) {
            return { success: false }
        }
        try {
            const res = await fetch(`${BACKEND_API_ROOT}${this.path}`, {
                method: this.method,
                headers: {
                    Authorization: `Bearer ${this.jwt.token}`,
                },
            })
            return await this.parseResponse(res)
        } catch (e) {
            console.error(e)
            return { success: false }
        }
    }
}

export class PingValidator extends TokenHeader {
    protected method: string = 'get'
    protected path: string = '/api/ping'

    constructor() {
        super()
    }

    protected async parseResponse(res: Response): Promise<Success> {
        if (res.status === 200) {
            return { success: true }
        }
        return { success: false }
    }
}
