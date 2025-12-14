import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trips';
import { EditTripComponent } from '../edit-trip/edit-trip.component';
import { AuthenticationService } from '../services/authentication.service';
import { TripDataService } from '../services/trip-data.service';


@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent implements OnInit {
  @Input('trip') trip: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private tripsDataService: TripDataService
  ) {}

  ngOnInit(): void {
  }

  public editTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  /**public deleteTrip(id: string) {
    if (!confirm("Are you sure you want to delete this trip?")) return;

    this.tripsDataService.deleteTrip(id).subscribe({
      next: () => {
        // TEMP: reload the list to reflect deletion
        window.location.reload();
      },
      error: (err) => console.error("Delete failed:", err)
    });
  }*/

  public deleteTrip(id: string) {
    console.log('Deleting trip with id:', id);
    if (!confirm("Are you sure you want to delete this trip?")) return;

    this.tripsDataService.deleteTrip(id).subscribe({
      next: () => {
        console.log('Delete successful');
        window.location.reload();
      },
      error: (err) => console.error('Delete failed', err)
    });
  }



  public isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }
}