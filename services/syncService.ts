import { Visit } from "../types/Visit"

export const syncVisit = async (visit: Visit): Promise<Visit> => {

 return new Promise((resolve) => {

  setTimeout(() => {

   const success = Math.random() > 0.3

   if (success) {
    resolve({ ...visit, syncStatus: "synced" })
   } else {
    resolve({ ...visit, syncStatus: "failed" })
   }

  }, 1500)

 })

}