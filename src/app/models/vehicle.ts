import { VehicleAvailability } from "./vehicle-availability";



export interface Vehicle {

    vehicleId: number,
    make: string,
    model: string,
    year: string,
    vehicleType: string,
    mileage: number,
    pricePerDay: number,
    status: VehicleAvailability
}
