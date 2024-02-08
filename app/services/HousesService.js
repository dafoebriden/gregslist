import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { loadState, saveState } from "../utils/Store.js"



function _saveHousesInLocalStorage() {
    saveState('houses', AppState.houses)
}

class HousesService {
    createHouse(houseFormData) {
        const newHouseAddress = new HousesService(houseFormData)
        AppState.houses.push(newHouseAddress)
        _saveHousesInLocalStorage()
    }

    loadHousesFromLocalStorage() {
        const housesFromLocalStorage = loadState('houses', [House])
        AppState.cars = housesFromLocalStorage
    }

    removeHouse(houseId) {
        const houseIndex = AppState.houses.findIndex(house => house.id == houseId)

        if (houseIndex == -1) {
            throw new Error('House index was -1, you need to check your code')

        }
        AppState.houses.splice(houseIndex, 1)
        _saveHousesInLocalStorage()
    }
}

export const housesService = new HousesService()