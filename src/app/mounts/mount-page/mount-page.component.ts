import {Component, OnDestroy, OnInit} from '@angular/core';
import {MountService} from '../../services/mount.service';
import {Subject} from 'rxjs/Subject';
import {ActivatedRoute} from '@angular/router';
import {UtilsService} from '../../services/utils.service';
import {Subscription} from 'rxjs/Subscription';
import {DealMount} from '../../models/deal/deal_mount';
import {WebsocketService} from '../../services/websocket.service';

@Component({
  selector: 'app-mount-page',
  templateUrl: './mount-page.component.html',
  styleUrls: ['./mount-page.component.css']
})
export class MountPageComponent implements OnInit, OnDestroy {
  mounts: DealMount[];
  status: { statusName: string, statusUrl: string };
  load: boolean;
  lastPage: boolean;
  page: number;
  term$ = new Subject<string>();
  termDate$ = new Subject<string>();
  inputText = '';
  date = '';
  private subscriptions: Subscription[] = [];
  subOnWebSocket: Subscription;

  constructor(private mountService: MountService,
              private activatedRoute: ActivatedRoute,
              private utils: UtilsService,
              private webSocketService: WebsocketService) {
  }

  ngOnInit() {
    this.subscribeOnInputField();
    this.subscribeOnUrl();
    this.subscribeOnDateField();
    this.subOnWebSocket = this.webSocketService.message.subscribe((response) => {
      this.parseEvent(response);
    });
  }

  subscribeOnInputField() {
    this.term$
      .debounceTime(800)
      .distinctUntilChanged()
      .subscribe((term) => {
        this.inputText = term;
        this.search();
      });
  }

  subscribeOnDateField() {
    this.termDate$
      .subscribe(
        (term) => {
          this.date = term;
          this.search();
        }
      );
  }

  subscribeOnUrl() {
    this.activatedRoute.params
      .subscribe((params) => {
        this.inputText = '';
        this.date = '';
        this.status = this.utils.statusUrlMount(params['status']);
        this.mountService.statusMount = params['status'];
        this.mounts = [];
        this.showMounts();
      });
  }

  parseEvent(msg) {
    switch (msg.event) {
      case 'on_create_mount': {
        this.mountService.getMount(msg.data.mount_id)
          .subscribe((mount: DealMount) => {
            if (mount.status === 1) {
              if (this.mountService.statusMount === 'all' || this.mountService.statusMount === 'added_stage') {
                this.mounts.unshift(mount);
                this.mounts.pop();
              }
            } else if (mount.status === 0) {
              if (this.mountService.statusMount === 'all' || this.mountService.statusMount === 'processing') {
                this.mounts.unshift(mount);
                this.mounts.pop();
              }
            }
          });
        break;
      }
      case 'on_close_mount': {
        this.mountService.getMount(msg.data.mount_id)
          .subscribe((mount: DealMount) => {
            if (this.mountService.statusMount !== 'completed' || this.mountService.statusMount !== 'canceled') {
              this.showMounts();
            } else if (this.mountService.statusMount === 'completed') {
              this.mounts.unshift(mount);
              this.mounts.pop();
            }
          });
        break;
      }
      case 'on_reject_mount': {
        this.mountService.getMount(msg.data.mount_id)
          .subscribe((mount: DealMount) => {
            if (this.mountService.statusMount !== 'completed' || this.mountService.statusMount !== 'canceled') {
              this.showMounts();
            } else if (this.mountService.statusMount === 'canceled') {
              this.mounts.unshift(mount);
              this.mounts.pop();
            }
          });
        break;
      }
      case 'on_transfer_mount': {
        this.mountService.getMount(msg.data.mount_id)
          .subscribe((mount: DealMount) => {
            if (this.mountService.statusMount !== 'completed' || this.mountService.statusMount !== 'canceled') {
              this.showMounts();
            }
          });
      }
    }
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

  search() {
    if ((this.date !== '' || this.inputText !== '') && this.mounts !== []) {
      this.mounts = [];
      this.load = true;
      this.page = 1;
      const params = this.utils.getSearchParams(this.inputText, this.date);
      this.mountService.getFilterMounts(this.page, params)
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
      this.mounts = [];
      this.showMounts();
    }
  }

  onScrollMount() {
    if (this.inputText === '' && this.date === '') {
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
      const params = this.utils.getSearchParams(this.inputText, this.date);
      this.mountService.getFilterMounts(this.page, params)
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
            if (this.inputText === '' && this.date === '') {
              this.showMounts();
            } else {
              this.search();
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

  ngOnDestroy() {
    if (this.subOnWebSocket) {
      this.subOnWebSocket.unsubscribe();
    }
  }
}
