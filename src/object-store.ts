import { AsyncStorage } from 'react-native'

const KEY = '@user-object'

export interface User {
    name: string
    age: number
    token: string
}

export async function save(userInformation: Settings) {
    await AsyncStorage.setItem(KEY, JSON.stringify(userInformation))
}

export async function retrieve() {
    const serialized = await AsyncStorage.getItem(KEY)
    if (!serialized) {
        return null
    }
    return JSON.parse(serialized)
}

export async function clear() {
    await AsyncStorage.removeItem(KEY)
}
