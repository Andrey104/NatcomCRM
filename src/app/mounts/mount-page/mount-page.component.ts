import {Component, OnInit} from '@angular/core';
import {MountService} from '../../services/mount.service';
import {MountResult} from '../../models/mount/mount-result';
import {Subject} from 'rxjs/Subject';
import {ActivatedRoute} from '@angular/router';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-mount-page',
  templateUrl: './mount-page.component.html',
  styleUrls: ['./mount-page.component.css']
})
export class MountPageComponent implements OnInit {
  mounts: MountResult[];
  status: { statusName: string, statusUrl: string };
  load: boolean;
  lastPage: boolean;
  page: number;
  term$ = new Subject<string>();
  inputText = '';

  constructor(private mountService: MountService,
              private activatedRoute: ActivatedRoute,
              private utils: UtilsService) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params) => {
        this.status = this.utils.statusUrlMount(params['status']);
        this.mounts = [];
        this.showMounts();
      });
    this.subscribeOnInputField();
  }

  subscribeOnInputField() {
    this.term$
      .debounceTime(800)
      .distinctUntilChanged()
      .subscribe((term) => {
        this.inputText = term;
        this.search(term);
      });
  }

  showMounts() {
    this.page = 1;
    this.load = true;
    this.lastPage = false;
    this.mountService.getAllMounts(this.page, this.status.statusUrl)
      .subscribe((mounts) => {
        this.mounts = mounts.results;
        if (mounts.next === null) {
          this.lastPage = true;
        }
        this.load = false;
      });
  }

  search(text: string) {
    if (text !== '') {
      this.load = true;
      this.page = 1;
      this.mountService.getFilterMounts(this.page, text)
        .subscribe((mountsPage) => {
            this.mounts = mountsPage.results;
            if (mountsPage.next === null) {
              this.lastPage = true;
            } else {
              this.lastPage = false;
            }
            this.load = false;
          }
        );
      document.getElementById('scroll').scrollTop = 0;
    } else {
      this.showMounts();
    }
  }

  onScrollMount() {
    if (this.inputText === '') {
      this.nextPage();
    } else {
      this.nextFilterPage();
    }
  }

  nextPage() {
    if (!this.lastPage && !this.load) {
      this.load = true;
      this.page = this.page + 1;
      this.mountService.getAllMounts(this.page, this.status.statusUrl)
        .subscribe((mounts) => {
          this.mounts = this.mounts.concat(mounts.results);
          if (mounts.next === null) {
            this.lastPage = true;
          }
          this.load = false;
        });
    }
  }

  nextFilterPage() {
    if (!this.lastPage && !this.load) {
      this.load = true;
      this.page = this.page + 1;
      this.mountService.getFilterMounts(this.page, this.inputText)
        .subscribe(mountsPage => {
          this.mounts = this.mounts.concat(mountsPage.results);
          this.load = false;
          if (mountsPage.next === null) {
            this.lastPage = true;
          } else {
            this.lastPage = false;
          }
        }, error2 => {
          this.load = false;
        });
    }
  }
}
