import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';

import { VestidoService } from 'src/app/services/vestido.service';
import { CommentService } from 'src/app/services/comment.service';
import { MessagesService } from 'src/app/services/messages.service';

import { Vestido } from 'src/app/Vestido';
import { environment } from 'src/environments/environment';
import { Comment } from 'src/app/Comment';

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

  commentForm!: FormGroup;

  constructor(
    private vestidoService: VestidoService,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.vestidoService
      .getVestido(id)
      .subscribe((item) => (this.vestido = item.data));

    this.commentForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
    });
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return;
    }

    const data: Comment = this.commentForm.value;

    data.vestidoId = Number(this.vestido!.id);

    await this.commentService
      .createComment(data)
      .subscribe((comment) => this.vestido!.comments!.push(comment.data));

    this.messagesService.add('Comentario adicionado!');

    this.commentForm.reset();

    formDirective.resetForm();
  }
}
