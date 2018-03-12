import {Component, OnInit} from '@angular/core';
import {MountService} from '../../services/mount.service';
import {MountResult} from '../../models/mount/mount-result';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-mount-page',
  templateUrl: './mount-page.component.html',
  styleUrls: ['./mount-page.component.css']
})
export class MountPageComponent implements OnInit {
  mounts: MountResult[];
  load: boolean;
  lastPage: boolean;
  page: number;
  term$ = new Subject<string>();

  constructor(private mountService: MountService) {
  }

  ngOnInit() {
    this.showMounts();
    this.term$.subscribe((term) => this.search(term));
  }

  showMounts() {
    this.page = 1;
    this.load = true;
    this.lastPage = false;
    this.mountService.getAllMounts(this.page)
      .subscribe((mounts) => {
        this.mounts = mounts.results;
        if (mounts.next === null) {
          this.lastPage = true;
        }
        this.load = false;
      });
  }

  onScrollMount() {
    this.nextPage();
  }

  nextPage() {
    if (!this.lastPage && !this.load) {
      this.load = true;
      this.page = this.page + 1;
      this.mountService.getAllMounts(this.page)
        .subscribe((mounts) => {
          this.mounts = this.mounts.concat(mounts.results);
          if (mounts.next === null) {
            this.lastPage = true;
          }
          this.load = false;
        });
    }
  }

  search(word: string) {
    console.log(word);
  }
}
