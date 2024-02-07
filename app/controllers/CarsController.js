import { AppState } from "../AppState.js";
import { carsService } from "../services/CarsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawCars() {
  const cars = AppState.cars

  let htmlString = ''

  cars.forEach(car => htmlString += car.CarCardHTMLTemplate)

  setHTML('carListings', htmlString)
}



export class CarsController {
  constructor () {
    // ANCHOR page load
    console.log('Cars controller loaded');
    carsService.loadCarsFromLocalStorage()
    _drawCars()


    // ANCHOR listeners
    AppState.on('cars', _drawCars)
  }

  createCar() {
    try {
      event.preventDefault() //NOTE stop the page from refreshing
      console.log('creating car');

      const form = event.target

      console.log('targeted event', form);

      // @ts-ignore
      console.log('car make', form.make.value);

      const carFormData = getFormData(form)

      // NOTE converts "on" value to boolean
      carFormData.hasSalvagedTitle = carFormData.hasSalvagedTitle == 'on'

      console.log('here is your car data object!', carFormData);

      carsService.createCar(carFormData)

      // @ts-ignore
      form.reset()

    } catch (error) {
      console.error(error);
      Pop.error(error.message)
    }
  }

  async removeCar(carId) {
    const wantsToRemove = await Pop.confirm('Are you sure you want to delete this car?')

    // const wantsToRemove = window.confirm('Are you sure you want to delete this car?')

    if (!wantsToRemove) {
      return
    }

    console.log('removing car with this id', carId);

    carsService.removeCar(carId)
  }
}