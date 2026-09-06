import { getSession } from './session'

const API_BASE_URL = 'http://localhost:5110'

export class ApiError extends Error {
    constructor(message, status, data) {
        super(message)
        this.name = 'ApiError'
        this.status = status
        this.data = data
    }
}

export const apiRequest = async (path, options = {}) => {
    const token = getSession()?.token

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    })

    const isJson = response.headers.get('content-type')?.includes('application/json')
    const body = isJson ? await response.json() : null

    if (!response.ok) {
        throw new ApiError(body?.message ?? response.statusText, response.status, body)
    }

    return body
}
