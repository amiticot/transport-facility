import { Component } from '@angular/core';
import { Ride } from 'src/app/models/ride.model';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.css']
})
export class RideListComponent {
  rides: Ride[] = [];
  vehicleType: string = '';
  filterTime: string = '';

  constructor(private rideService: RideService) {
    this.loadRides();
  }


  ngOnInit() {
    this.rideService.getRides().subscribe((rides: any) => {
      this.rides = rides;
    });
  }

  loadRides() {
    this.rides = this.rideService.filterRides(
      this.vehicleType || undefined,
      this.filterTime ? new Date(this.filterTime) : undefined
    );
  }

  onFilterChange() {
    this.loadRides();
  }
}


