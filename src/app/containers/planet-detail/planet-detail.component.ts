import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CharacterStore } from '../../stores/character/character.store';
import { Planet } from 'src/app/models/planet.model';

@Component({
    selector: 'app-planet-detail',
    standalone: true,
    imports: [
      CommonModule,
      RouterModule,
      MatCardModule,
      MatButtonModule,
      MatIconModule,
      MatDividerModule,
      MatListModule
    ],
    templateUrl: './planet-detail.component.html',
    styleUrls: ['./planet-detail.component.scss']
})
export class PlanetDetailComponent implements OnInit {
  readonly characterStore = inject(CharacterStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  planet: Planet | null = null;
  id: string | null = null;
  characterId: string | null = null;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.characterId = this.route.snapshot.queryParamMap.get('characterId');
    if (this.id) {
      this.characterStore.loadPlanet(this.id).subscribe(() => {
        this.planet = this.characterStore.planets()[this.id!];
      });
    }
  }

  goBackToCharacter(): void {
    if (this.characterId) {
      this.router.navigate(['/character-details', this.characterId]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
