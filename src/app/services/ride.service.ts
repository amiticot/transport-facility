
import { Injectable } from '@angular/core';
import { Ride } from '../models/ride.model';

@Injectable({
    providedIn: 'root'
})
export class RideService {

    private rides: Ride[] = [];

    // Custom function to generate a unique rideId
    generateRideId(): string {
        return `ride-${new Date().getTime()}-${Math.floor(Math.random() * 1000)}`;
    }

    // Function to get all rides
    getRides(): Ride[] {
        return [...this.rides];
    }

    // Function to add a new ride
    addRide(ride: Omit<Ride, 'rideId' | 'bookedBy'>): void {
        const newRide: Ride = {
            ...ride,
            rideId: this.generateRideId(),
            bookedBy: []
        };
        this.rides.push(newRide);
    }

    // Function to book a ride
    bookRide(rideId: string, employeeId: string): string {
        const ride = this.rides.find(r => r.rideId === rideId);
        if (!ride) return 'Ride not found';

        if (ride.employeeId === employeeId) {
            return 'Creator cannot book own ride';
        }

        if (ride.bookedBy.includes(employeeId)) {
            return 'Employee already booked this ride';
        }

        if (ride.vacantSeats <= 0) {
            return 'No seats available';
        }

        ride.bookedBy.push(employeeId);
        ride.vacantSeats--;
        return 'Booking successful';
    }

    // Function to filter rides based on vehicle type and time
    filterRides(vehicleType?: string, time?: Date): Ride[] {
        let filtered = [...this.rides];

        if (vehicleType) {
            filtered = filtered.filter(r => r.vehicleType === vehicleType);
        }

        if (time) {
            const targetTime = time.getTime();
            filtered = filtered.filter(r => {
                const rideTime = new Date(r.time).getTime();
                return Math.abs(rideTime - targetTime) <= 60 * 60 * 1000; // ±60 minutes
            });
        }

        return filtered;
    }
}
