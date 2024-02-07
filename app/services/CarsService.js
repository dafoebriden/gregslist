import { AppState } from "../AppState.js";
import { Car } from "../models/Car.js";
import { loadState, saveState } from "../utils/Store.js";

function _saveCarsInLocalStorage() {
  saveState('cars', AppState.cars)
}


class CarsService {

  createCar(carFormData) {
    // TODO do crazy stuff

    const newCarModel = new Car(carFormData)

    console.log('pojo', carFormData);
    console.log('NEW CAR', newCarModel);

    AppState.cars.push(newCarModel)

    _saveCarsInLocalStorage()
  }

  loadCarsFromLocalStorage() {
    const carsFromLocalStorage = loadState('cars', [Car])
    AppState.cars = carsFromLocalStorage
  }

  removeCar(carId) {
    const carIndex = AppState.cars.findIndex(car => car.id == carId)
    console.log('found car index', carIndex);

    if (carIndex == -1) {
      throw new Error('Car index was -1, you messed something up bud, check your conditional for findIndex')
    }

    AppState.cars.splice(carIndex, 1)
    _saveCarsInLocalStorage()
  }

}

export const carsService = new CarsService()