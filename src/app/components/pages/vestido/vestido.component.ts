import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { VestidoService } from 'src/app/services/vestido.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Vestido } from 'src/app/Vestido';
import { environment } from 'src/environments/environment';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vestido',
  templateUrl: './vestido.component.html',
  styleUrls: ['./vestido.component.css'],
})
export class VestidoComponent implements OnInit {
  vestido?: Vestido;
  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  constructor(
    private vestidoService: VestidoService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.vestidoService
      .getVestido(id)
      .subscribe((item) => (this.vestido = item.data));
  }

}
