import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BodyType, FuelType, type Car } from "../types/car";
import { useAuth } from "../hooks/useAuth";
import { useApiCall } from "../utils/api";

export default function CarDetails() {
    const { id } = useParams<{ id: string }>();
    const [car, setCar] = useState<Car | null>(null);
    const { token } = useAuth();
    const { fetchWithAuth } = useApiCall();

    useEffect(() => {
        (async () => {
            try {
                const response = await fetchWithAuth(`http://localhost:5000/api/cars/${id}`, token);
                const data = await response.json();
                setCar(data);
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        })();
    }, [id, token, fetchWithAuth]);

    return (
        <div className="car-details-container">
            { 
                car && 
                    <>
                        <div className="car-title">
                            <h1 className="title">{ car.brand } { car.model }</h1>
                            <h3 className="year">{ new Date(car.productionDate).getFullYear() }</h3>
                        </div>

                        <div className="car-info-container">
                            <div className="car-photo">
                                <img
                                    src='/car.png'
                                    alt={`${car.brand} ${car.model}`} />
                            </div>

                            <div className="car-info">
                                <h1 className="title">{ car.brand } { car.model }</h1>
                                <p className="list-header">Car details: </p>
                                <ul>
                                    <li><span>Body type:</span> {BodyType[car.bodyType]}</li>
                                    <li><span>Fuel consumption:</span> {car.carFuelConsumption} L/100km</li>
                                    <li><span>Engine capacity:</span> {car.engineCapacity} cc</li>
                                    <li><span>Fuel type:</span> {FuelType[car.fuelType]}</li>
                                    <li><span>Doors number:</span> {car.doorsNumber}</li>
                                    <li><span>Luggage capacity:</span> {car.luggageCapacity} L</li>
                                    <li><span>Production date:</span> {new Date(car.productionDate).toLocaleDateString()}</li>
                                </ul>
                            </div>
                        </div>
                    </>
            }

            {
                !car && <div className="loader-wrapper"><div className="loader"></div></div>
            }
        </div>
    )
}