import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
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
  @ViewChild('textArea') textArea: ElementRef;

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
      this.textArea.nativeElement.value = '';
    }
  }

  sendComment() {
    const userComment = this.form.get('commentArea').value;
    if (userComment !== '') {
      this.comment.emit(userComment);
      this.form.reset();
    }
  }

}
