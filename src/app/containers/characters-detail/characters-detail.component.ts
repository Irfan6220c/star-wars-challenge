import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CharacterStore } from '../../stores/character/character.store';
import { SwapiCharacter } from 'src/app/models/character.model';

@Component({
  selector: 'app-characters-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule, MatButtonModule, MatListModule, MatDividerModule, MatIconModule],
  templateUrl: './characters-detail.component.html',
  styleUrls: ['./characters-detail.component.scss']
})
export class CharactersDetailComponent implements OnInit {
  readonly characterStore = inject(CharacterStore);
  private route = inject(ActivatedRoute);

  character: SwapiCharacter | null = null;
  characterDetails: { label: string; value: string }[] = [];

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.characterStore.loadCharacter(id).subscribe(character => {
      this.character = character;
      this.characterDetails = this.mapCharacterDetails(character);
    });
  }

  private mapCharacterDetails(character: SwapiCharacter): { label: string; value: string }[] {
    return [
      { label: 'Height', value: `${character.height} cm` },
      { label: 'Mass', value: `${character.mass} kg` },
      { label: 'Gender', value: character.gender },
      { label: 'Birth Year', value: character.birth_year },
      { label: 'Hair Color', value: character.hair_color },
      { label: 'Skin Color', value: character.skin_color },
      { label: 'Eye Color', value: character.eye_color },
      { label: 'Films', value: `${character.films.length}` },
      { label: 'Species', value: `${character.species.length}` },
      { label: 'Vehicles', value: `${character.vehicles.length}` },
      { label: 'Starships', value: `${character.starships.length}` }
    ];
  }

  getAkababImage(name: string): string {
    const match = this.characterStore.akababCharacters().find(c => c.name === name);
    return match?.image ?? 'assets/placeholder.png';
  }

  getPlanetId(homeworldUrl: string): string | null {
    const match = homeworldUrl.match(/\/planets\/(\d+)\//);
    return match?.[1] ?? null;
  }

  getCharacterId(url: string): string | null {
    const match = url.match(/\/people\/(\d+)\//);
    return match?.[1] ?? null;
  }
}
