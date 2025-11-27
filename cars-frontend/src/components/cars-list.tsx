import { useEffect, useState } from "react"
import type { Car } from "../types/car";
import { Link, useNavigate } from "react-router-dom";

export default function CarsList() {
    const navigate = useNavigate();
    const [cars, setCars] = useState<Car[] | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('http://localhost:5000/api/cars');
                const data = await response.json();
                setCars(data);
                console.log('Fetched cars:', data);
            } catch (error) {
                console.error('Error fetching cars:', error);  
            }
        })();
    }, []);

    const handleCarDelete = async (e: Event, carId: string) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const response = await fetch(`http://localhost:5000/api/cars/${carId}`, {
                method: 'DELETE',
            });
            
            if (response.ok) {
                setCars(prevCars => prevCars ? prevCars.filter(car => car.id !== carId) : null);
            } else {
                console.error('Failed to delete car');
            }
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    const handleCarEdit = (e: Event, carId: string) => {
        e.preventDefault();
        e.stopPropagation();

        navigate(`/edit/${carId}`);
    }

    return (
        <div className="cars-list-container">
            {
                cars && 
                    <div className="cars-list">
                        {cars.map(car => (
                            <Link to={`/cars/${car.id}`} key={car.id} className="cars-list-element">
                                <div>{car.brand} {car.model} ({ new Date(car.productionDate).getFullYear() })</div>
                                <div className="options">
                                    <img onClick={(e) => handleCarEdit(e as unknown as Event, car.id)} className="edit-btn icon" src="/edit.svg" alt="Edit" />
                                    <img onClick={(e) => handleCarDelete(e as unknown as Event, car.id)} className="delete-btn icon" src="/bin.svg" alt="Delete" />
                                </div>
                            </Link>
                        ))}
                    </div>
            }

            {
                !cars && <div className="loader-wrapper"><div className="loader"></div></div>
            }
        </div>
    )
}