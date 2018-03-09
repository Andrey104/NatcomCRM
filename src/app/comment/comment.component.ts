import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Output() comment = new EventEmitter<string>();
  form: FormGroup;
  commentArea;
  text = '';

  constructor() {
  }

  ngOnInit() {
    this.form = new FormGroup({
      commentArea: new FormControl(''),
    });
  }

  buttonComment(event) {
    if (event.shiftKey && event.keyCode === 13) {
      this.text = this.form.get('commentArea').value + '\n';
    } else if (event.keyCode === 13) {
      this.sendComment();
    }
  }

  sendComment() {
    const userComment = this.form.get('commentArea').value;
    if (userComment !== '') {
      this.form.reset();
      document.getElementById('text').blur();
      this.comment.emit(userComment);
    } else {
      alert('Нельзя отправлять пустой коммент');
    }
  }

}
