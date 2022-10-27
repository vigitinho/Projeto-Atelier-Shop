import { Component, OnInit } from '@angular/core';

import { VestidoService } from 'src/app/services/vestido.service';
import { Vestido } from 'src/app/Vestido';

import { environment } from 'src/environments/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allVestidos: Vestido[] = [];
  vestidos: Vestido[] = [];
  baseApiUrl = environment.baseApiUrl;

  faSearch = faSearch;
  searchTerm: string = '';

  constructor(private vestidoService: VestidoService) {}

  ngOnInit(): void {
    this.vestidoService.getVestidos().subscribe((items) => {
      const data = items.data;

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-BR'
        );
      });

      this.allVestidos = data;
      this.vestidos = data;
    });
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.vestidos = this.allVestidos.filter((vestido) => {
      return vestido.title.toLowerCase().includes(value);
    });
  }
}
