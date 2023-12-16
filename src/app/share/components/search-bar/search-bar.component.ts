import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  standalone: true
})
export class SearchBarComponent {

  private router = inject(Router);

  public submitSearch(e:any){
    e.preventDefault();

    if( (e.target === null) || e.target[0]?.value === ""  ){
      return;
    }
    const query:string = e.target[0].value;
    this.router.navigateByUrl(`/classes/${query}`)
  }

}
