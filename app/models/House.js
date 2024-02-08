import { generateId } from "../utils/GenerateId.js"


export class House {

    constructor(data) {
        this.id = generateId()
        this.address = { street: data.street, city: data.city, state: data.state, zip: data.zip }
        this.isForSale = data.isForSale
        this.price = data.price
        this.year = data.year
        this.builder = data.builder
        this.acreage = data.acreage
        this.squareFeet = data.squareFeet
        this.rooms = { bedrooms: data.bedrooms, bathrooms: data.bathrooms }
        this.totalCarSpaces = data.totalCarSpaces
        this.isFurnished = data.isFurnished
        this.isRemodeled = data.isRemodeled
        this.isForClosed = data.isForClosed
        this.garageSpaces = data.garageSpaces
        this.description = data.description
        this.imgUrl = data.imgUrl
        this.listedAt = data.listedAt == undefined ? new Date() : new Date(data.listedAt)
    }
    get HouseCardHTMLTemplate() {
        return `
        
        `
    }

    get ListedAtTime() {
        return this.listedAt.toLocaleTimeString()
    }
    get ListedAtDate() {
        return this.listedAt.toLocaleDateString()
    }
}