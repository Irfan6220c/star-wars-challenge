import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonStore, CommonState } from './stores/common/common.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { CharacterStore } from './stores/character/character.store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet, MatProgressSpinnerModule, CommonModule]
})
export class AppComponent implements OnInit {
  readonly commonStore = inject(CommonStore);
  private router = inject(Router);
  readonly characterStore = inject(CharacterStore);

  title = 'star-wars-app';
  readonly isLoading = this.commonStore.isLoading;

  ngOnInit(): void {
    const page = 1; // Or get from state if needed
    this.router.navigate([''], { queryParams: { page } });
  }

}
