import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterStore } from '../../stores/character/character.store';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-characters-list',
    standalone: true,
    imports: [CommonModule, MatListModule, MatPaginatorModule, MatToolbarModule, MatCardModule],
    templateUrl: './characters-list.component.html',
    styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  readonly characterStore = inject(CharacterStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private changeDetectorRef = inject(ChangeDetectorRef);
  private subscriptions = new Subscription();

  currentPage = 1;

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.queryParams.subscribe(params => {
        const page = params['page'] ? Number(params['page']) : 1;
        this.currentPage = page;
  
        this.loadCharacters(page); // store handles whether to fetch or not
  
        // Sync paginator after short delay to ensure it's ready
        setTimeout(() => {
          if (this.paginator) {
            this.paginator.pageIndex = page - 1;
          }
        });
      })
    );
  
    // Only load Akabab characters if not already present
    if (!this.characterStore.akababCharacters() || this.characterStore.akababCharacters().length === 0) {
      this.characterStore.loadAkababCharacters().subscribe();
    }
  }
  

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.pageIndex = this.characterStore.currentPage() - 1;
    }
  }

  onPageChange(page: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }
  

  loadCharacters(page: number): void {
    this.subscriptions.add(this.characterStore.loadCharacters(page).subscribe());
  }

  navigateToDetails(character: any): void {
    // Extract id from SWAPI url (e.g., https://swapi.dev/api/people/1/)
    const match = character.url.match(/\/people\/(\d+)\//);
    const id = match ? Number(match[1]) : null;
    if (id) {
      this.router.navigate(['/character-details', id]);
    }
  }

  getAkababImage(name: string): string | null {
    const akabab = this.characterStore.akababCharacters().find(c => c.name === name);
    return akabab ? akabab.image : null;
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
