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

  constructor(private fb: FormBuilder, private rideService: RideService) { }

  ngOnInit() {
    const now = new Date();
    this.minDateTime = this.rideService.formatDateToDatetimeLocal(now);
  }

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
