import { AsyncStorage } from 'react-native'
import { User } from './object-store'

const KEY = '@user-object'

export async function save(key: string, value: string) {
    await AsyncStorage.setItem(key, value)
}
export async function get(key: string) {
    return AsyncStorage.getItem(key)
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
