import {Component, OnInit} from '@angular/core';
import {MountService} from '../../services/mount.service';
import {MountResult} from '../../models/mount/mount-result';
import {Subject} from 'rxjs/Subject';
import {ActivatedRoute} from '@angular/router';
import {UtilsService} from '../../services/utils.service';
import {Subscription} from 'rxjs/Subscription';

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
  private subscriptions: Subscription[] = [];

  constructor(private mountService: MountService,
              private activatedRoute: ActivatedRoute,
              private utils: UtilsService) {
  }

  ngOnInit() {
    this.subscribeOnInputField();
    this.subscribeOnUrl();
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

  subscribeOnUrl() {
    this.activatedRoute.params
      .subscribe((params) => {
        this.status = this.utils.statusUrlMount(params['status']);
        this.mounts = [];
        this.showMounts();
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
        document.getElementById('scroll').scrollTop = 0;
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

  onActivate(c) {
    if (c.needSubscribe === true) {
      const modal = c.updateList
        .subscribe(next => {
          if (next) {
            this.mounts = [];
            if (this.inputText === '') {
              this.showMounts();
            } else {
              this.search(this.inputText);
            }
          }
        });
      this.subscriptions.push(modal);
    }
  }

  onDeactivate(c) {
    this.subscriptions
      .forEach(s => s.unsubscribe());
  }
}
