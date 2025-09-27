
export interface Ride {
    rideId: string;            // unique ID for ride
    employeeId: string;        // mandatory (ride creator)
    vehicleType: 'Car' | 'Bike';
    vehicleNo: string;         // mandatory
    vacantSeats: number;       // mandatory
    time: Date;                // mandatory
    pickupPoint: string;       // mandatory
    destination: string;       // mandatory
    bookedBy: string[];        // employee IDs who booked
}
