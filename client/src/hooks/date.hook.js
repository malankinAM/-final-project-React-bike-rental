//Get slice of table to mutate dates to general visual
import {useCallback} from "react";

export const useRefactor = () => {
    const refactoredArray = useCallback(array => {
        const tableSlice = array.slice()
        const newSlice = []
        tableSlice.map(item => {
            if (item.date) {
                let newDate = new Date(item.date).toDateString()
                item = {...item, date: newDate}
            }
            if (item.createdAt) {
                let newDate = new Date(item.createdAt).toUTCString()
                item = {...item, createdAt: newDate}
            }
            if (item.updatedAt) {
                let newDate = new Date(item.updatedAt).toUTCString()
                item = {...item, updatedAt: newDate}
            }

            newSlice.push(item)
        })
        return newSlice
    })
    const refactoredObject = useCallback(obj => {
        Object.keys(obj).forEach(key => {
            key === "createdAt" && (
                obj[key] = new Date(obj[key]).toUTCString()
            )
            key === "updatedAt" && (
                obj[key] = new Date(obj[key]).toUTCString()
            )
            key === "date" && (
                obj[key] = new Date(obj[key]).toUTCString()
            )
        })
        return obj
    })
    return {refactoredArray, refactoredObject}
}