export interface Car {
    id: string;
    brand: string;
    model: string;
    doorsNumber: number;
    luggageCapacity: number;
    engineCapacity: number;
    fuelType: number;
    productionDate: string;
    carFuelConsumption: number
    bodyType: number;
}

export enum FuelType {
    Petrol = 1,
    Hybrid = 2,
    Diesel = 3,
    LPG = 4
}

export enum BodyType {
    Hatchback = 1,
    Sedan = 2,
    Kombi = 3,
    SUV = 4,
    Roadster = 5
}