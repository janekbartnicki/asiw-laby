import type { Car } from "../types/car";
import { FuelType, BodyType } from "../types/car";
import { useState } from "react";

export function CarForm({ car, submitCallbackFn }: { car?: Car, submitCallbackFn: (carData: Car) => void }) {
    const [isFormValid, setIsFormValid] = useState(!!car);

    const checkFormValidity = (form: HTMLFormElement) => {
        const formData = new FormData(form);
        const isValid = 
            Boolean(formData.get('brand')) &&
            Boolean(formData.get('model')) &&
            Boolean(formData.get('productionDate')) &&
            Boolean(formData.get('bodyType')) &&
            Boolean(formData.get('carFuelConsumption')) &&
            Boolean(formData.get('engineCapacity')) &&
            Boolean(formData.get('fuelType')) &&
            Boolean(formData.get('doorsNumber')) &&
            Boolean(formData.get('luggageCapacity'));

        setIsFormValid(isValid);
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        checkFormValidity(e.currentTarget.closest('form')!);
    }
    const handleFormSubmit = (e: Event) => {
        e.preventDefault();
        const form = e.target as HTMLButtonElement;
        const formData = new FormData(form.closest('form')!);
        const carData: Car = {
            id: car?.id || '',
            brand: formData.get('brand') as string,
            model: formData.get('model') as string,
            productionDate: new Date(formData.get('productionDate') as string).toISOString(),
            bodyType: Number(formData.get('bodyType')),
            carFuelConsumption: Number(formData.get('carFuelConsumption')),
            engineCapacity: Number(formData.get('engineCapacity')),
            fuelType: Number(formData.get('fuelType')),
            doorsNumber: Number(formData.get('doorsNumber')),
            luggageCapacity: Number(formData.get('luggageCapacity')),
        };
        
        submitCallbackFn(carData);
    }
    
    return (
        <>
            <form className="form-group" onChange={handleFormChange}>
                <div className="field">
                    <label htmlFor="brand">Brand:</label>
                    <input type="text" id="brand" name="brand" defaultValue={car?.brand || ''} required />
                </div>
                <div className="field">
                    <label htmlFor="model">Model:</label>
                    <input type="text" id="model" name="model" defaultValue={car?.model || ''} required />
                </div>
                <div className="field">
                    <label htmlFor="productionDate">Production Date:</label>
                    <input type="date" id="productionDate" name="productionDate" defaultValue={car ? new Date(car.productionDate).toISOString().split('T')[0] : ''} required />
                </div>
                <div className="field">
                    <label htmlFor="bodyType">Body Type:</label>
                    <select id="bodyType" name="bodyType" defaultValue={car?.bodyType || ''} required>
                        <option disabled value="">Select Body Type</option>
                        {Object.entries(BodyType).filter(([, v]) => typeof v === 'number').map(([key, value]) => (
                            <option key={value} value={value}>{key}</option>
                        ))}
                    </select>
                </div>
                <div className="field">
                    <label htmlFor="carFuelConsumption">Fuel Consumption (L/100km):</label>
                    <input type="number" id="carFuelConsumption" name="carFuelConsumption" step="0.1" defaultValue={car?.carFuelConsumption || ''} required />
                </div>
                <div className="field">
                    <label htmlFor="engineCapacity">Engine Capacity (cc):</label>
                    <input type="number" id="engineCapacity" name="engineCapacity" defaultValue={car?.engineCapacity || ''} required />
                </div>
                <div className="field">
                    <label htmlFor="fuelType">Fuel Type:</label>
                    <select id="fuelType" name="fuelType" defaultValue={car?.fuelType || ''} required>
                        <option disabled value="">Select Fuel Type</option>
                        {Object.entries(FuelType).filter(([, v]) => typeof v === 'number').map(([key, value]) => (
                            <option key={value} value={value}>{key}</option>
                        ))}
                    </select>
                </div>
                <div className="field">
                    <label htmlFor="doorsNumber">Doors Number:</label>
                    <input type="number" min={2} id="doorsNumber" name="doorsNumber" defaultValue={car?.doorsNumber || ''} required />
                </div>
                <div className="field">
                    <label htmlFor="luggageCapacity">Luggage Capacity (L):</label>
                    <input type="number" id="luggageCapacity" name="luggageCapacity" defaultValue={car?.luggageCapacity || ''} required />
                </div>
                <button type="submit" onClick={(e) => handleFormSubmit(e as unknown as Event)} disabled={!isFormValid}>Submit</button>
                <div className="spacer"></div>
            </form>
        </>
    )
}