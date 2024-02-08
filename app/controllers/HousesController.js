import { AppState } from "../AppState.js"
import { getFormData } from "../utils/FormHandler.js"
import { setHTML } from "../utils/Writer.js"
import { Pop } from "../utils/Pop.js";


function _drawHouses() {
    const houses = AppState.houses
    let htmlString = ''
    houses.forEach(house => htmlString += house.HouseCardHTMLTemplate)
    setHTML('houseListings', htmlString)
}


export class HousesController {
    constructor() {
        housesService.loadHousesFromLocalStorage()
        _drawHouses()

        AppState.on('houses', _drawHouses)
    }
    createHouse() {
        try {
            event.preventDefault()
            const form = event.target
            const houseFormData = getFormData(form)
            houseFormData.isForclosed = houseFormData.isForclosed == 'on'
            houseService.createHouse(houseFormData)
            form.reset()

        } catch (error) {
            Pop.error(error.message)
        }
    }

    async removeHouse(houseId) {
        const wantsToRemove = await Pop.confirm('Are you sure you want to delete this listing?')
        if (!wantsToRemove) {
            return
        }
        housesService.removeHouse(houseId)
    }

}