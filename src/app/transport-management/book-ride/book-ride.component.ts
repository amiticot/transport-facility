
import { Component, Input } from '@angular/core';
import { RideService } from '../../services/ride.service';

@Component({
  selector: 'app-book-ride',
  templateUrl: './book-ride.component.html',
  styleUrls: ['./book-ride.component.css']
})
export class BookRideComponent {
  @Input() rideId!: string;
  employeeId: string = '';

  constructor(private rideService: RideService) { }

  bookRide() {
    if (!this.employeeId) {
      alert('Employee ID required');
      return;
    }
    const result = this.rideService.bookRide(this.rideId, this.employeeId);
    alert(result);
  }
}
