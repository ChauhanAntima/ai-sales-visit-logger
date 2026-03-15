import AsyncStorage from "@react-native-async-storage/async-storage"
import { Visit } from "../types/Visit"

const KEY = "VISITS"

export const getVisits = async (): Promise<Visit[]> => {
  const data = await AsyncStorage.getItem(KEY)
  return data ? JSON.parse(data) : []
}

export const saveVisits = async (visits: Visit[]) => {
  await AsyncStorage.setItem(KEY, JSON.stringify(visits))
}