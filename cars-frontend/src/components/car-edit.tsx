import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Car } from "../types/car";
import { CarForm } from "./car-form";

function CarEditInner() {
    const { id } = useParams<{ id: string }>();
    const [car, setCar] = useState<Car | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [callbackFn, setCallbackFn] = useState<(carData: Car) => void>(() => {});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const setErrorMessageReset = () => {
        setTimeout(() => setErrorMessage(null), 3000);
    }

    const validation = (car: Partial<Car>): boolean => {
        if (!car.doorsNumber || (car.doorsNumber && car.doorsNumber < 2)) {
            setErrorMessage('Amount of doors in a car should be higher than 2');
            setErrorMessageReset();
            return false
        }

        return true;
    }

    const carCreateCallbackFn = async (carData: Partial<Car>) => {
        console.log('Creating car:', carData);
        delete carData.id;
        setErrorMessage(null);
        
        if (!validation(carData)) return;

        try {
            const response = await fetch('http://localhost:5000/api/cars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(carData),
            });

            if (response.ok) {
                console.log('Car created successfully');
                navigate('/cars');
            } else {
                console.error('Failed to create car');
                setErrorMessage('Failed to create car');
                setErrorMessageReset();
            }
        } catch (error) {
            console.error('Error creating car:', error);
            setErrorMessage(`Error creating car: ${error}`);
            setErrorMessageReset();
        }
    }

    const carEditCallbackFn = async (carData: Partial<Car>) => {
        console.log('Editing car:', carData);
        const id = carData.id;
        delete carData.id;
        setErrorMessage(null);

        if (!validation(carData)) return;

        try {
            const response = await fetch(`http://localhost:5000/api/cars/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(carData),
            });

            if (response.ok) {
                console.log('Car updated successfully');
                navigate('/cars');
            } else {
                console.error('Failed to update car');
                setErrorMessage('Failed to update car');
                setErrorMessageReset();
            }
        } catch (error) {
            console.error('Error updating car:', error);
            setErrorMessage(`Error updating car: ${error}`);
            setErrorMessageReset();
        }
    }

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            setErrorMessage(null);
            
            if (id && id !== 'new') {
                try {
                    const response = await fetch(`http://localhost:5000/api/cars/${id}`);
                    const carData = await response.json();
                    setCar(carData);
                    setCallbackFn(() => carEditCallbackFn);
                } catch (error) {
                    console.error('Error fetching car data:', error);
                } finally {
                    setIsLoading(false);
                }
            } else if (id === 'new') {
                setCallbackFn(() => carCreateCallbackFn);
                setCar(null);
                setIsLoading(false);
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (isLoading) {
        return <div className="loader-wrapper"><div className="loader"></div></div>;
    }

    return (
        <div className="form-container">
            <CarForm car={car || undefined} submitCallbackFn={callbackFn} />

            { errorMessage && (
                <div className="error-message">
                    <p>{errorMessage}</p>
                    <img 
                        src="/x.svg"
                        alt="Close"
                        className="icon error-icon"
                        title="Close"
                        onClick={() => setErrorMessage(null)}
                    />
                </div>
            ) }
        </div>
    );
}

export function CarEdit() {
    const { id } = useParams<{ id: string }>();
    return <CarEditInner key={id} />;
}