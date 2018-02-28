import {Pipe, PipeTransform} from '@angular/core';
import {OurComment} from '../models/comment';

@Pipe({
  name: 'comment'
})
export class CommentPipe implements PipeTransform {
  transform(comment: OurComment): string {
    const user = comment.user.first_name + ' ' + comment.user.last_name;
    return user + ' оставил(а) комментарий: ' + comment.text;
  }
}
