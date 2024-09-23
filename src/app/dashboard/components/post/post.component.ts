import { Component, input } from '@angular/core';
import { Post } from '../../../api/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  public posts = input.required<Post>();
}
