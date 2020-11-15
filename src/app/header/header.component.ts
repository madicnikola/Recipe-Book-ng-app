import {Component} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  // @Output() featureSelected = new EventEmitter<string>();

  // onSelect(feature: string): void {
  //   this.featureSelected.emit(feature);
  // }

  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }


  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  logout() {
      this.authService.logout();
  }
}
