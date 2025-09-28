
import { Injectable } from '@angular/core';
import { Ride } from '../models/ride.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RideService {

    private rides: Ride[] = [
        {
            rideId: 'RIDE001',
            employeeId: 'EMP1001',
            vehicleType: 'Car',
            vehicleNo: 'KA01AB1234',
            vacantSeats: 3,
            time: new Date('2025-10-01T09:00:00'),
            pickupPoint: 'Whitefield',
            destination: 'Electronic City',
            bookedBy: ['EMP1002', 'EMP1003']
        },
        {
            rideId: 'RIDE002',
            employeeId: 'EMP1004',
            vehicleType: 'Bike',
            vehicleNo: 'KA03CD5678',
            vacantSeats: 1,
            time: new Date('2025-10-01T08:30:00'),
            pickupPoint: 'Indiranagar',
            destination: 'Koramangala',
            bookedBy: []
        },
        {
            rideId: 'RIDE003',
            employeeId: 'EMP1005',
            vehicleType: 'Car',
            vehicleNo: 'KA05EF9012',
            vacantSeats: 2,
            time: new Date('2025-10-01T10:00:00'),
            pickupPoint: 'Hebbal',
            destination: 'MG Road',
            bookedBy: ['EMP1006']
        },
        {
            rideId: 'RIDE004',
            employeeId: 'EMP1007',
            vehicleType: 'Car',
            vehicleNo: 'KA07GH3456',
            vacantSeats: 4,
            time: new Date('2025-10-01T09:15:00'),
            pickupPoint: 'Marathahalli',
            destination: 'BTM Layout',
            bookedBy: ['EMP1008', 'EMP1009', 'EMP1010']
        },
        {
            rideId: 'RIDE005',
            employeeId: 'EMP1011',
            vehicleType: 'Bike',
            vehicleNo: 'KA09IJ7890',
            vacantSeats: 1,
            time: new Date('2025-10-01T07:45:00'),
            pickupPoint: 'Jayanagar',
            destination: 'HSR Layout',
            bookedBy: []
        }
    ];

    private ridesSubject = new BehaviorSubject<Ride[]>([]); // Create BehaviorSubject

    constructor() {
        // Initialize the observable with the current rides array
        this.ridesSubject.next(this.rides);
    }


    // Custom function to generate a unique rideId
    generateRideId(): string {
        return `ride-${new Date().getTime()}-${Math.floor(Math.random() * 1000)}`;
    }


    // Ensure this method returns an observable
    getRides() {
        return this.ridesSubject.asObservable();  // Return observable rides list
    }

    // Function to add a new ride
    addRide(ride: Omit<Ride, 'rideId' | 'bookedBy'>): void {
        const newRide: Ride = {
            ...ride,
            rideId: this.generateRideId(),
            bookedBy: []
        };
        this.rides.push(newRide);
        this.ridesSubject.next(this.rides);  // Emit the new rides list to subscribers
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

    // Formats a Date object into a string compatible with the HTML 'datetime-local' input. 
    // Output format: 'YYYY-MM-DDTHH:mm
    formatDateToDatetimeLocal(date: Date): string {
        const pad = (n: number) => n.toString().padStart(2, '0');

        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1); // Months are 0-based
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

}
