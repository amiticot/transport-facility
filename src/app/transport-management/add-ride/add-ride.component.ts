import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.css']
})
export class AddRideComponent {

  minDateTime: any;

  ngOnInit() {
    const now = new Date();
    this.minDateTime = this.formatDateToDatetimeLocal(now);
  }

  formatDateToDatetimeLocal(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Months are 0-based
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  constructor(private fb: FormBuilder, private rideService: RideService) { }

  rideForm = this.fb.group({
    employeeId: ['', Validators.required],
    vehicleType: ['Car', Validators.required],
    vehicleNo: ['', Validators.required],
    vacantSeats: [1, [Validators.required, Validators.min(1)]],
    time: ['', Validators.required],
    pickupPoint: ['', Validators.required],
    destination: ['', Validators.required]
  });

  onSubmit() {
    if (this.rideForm.valid) {
      debugger
      console.log(this.rideForm.value);
      this.rideService.addRide(this.rideForm.value as any);
      this.rideForm.reset({ vehicleType: 'Car', vacantSeats: 1 });
      alert('Ride added successfully!');
    }
  }
}
