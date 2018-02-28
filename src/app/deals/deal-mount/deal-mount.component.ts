import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MountService} from '../../services/mount.service';
import {DealMount} from '../../models/deal/deal_mount';

@Component({
  selector: 'app-deal-mount',
  templateUrl: './deal-mount.component.html',
  styleUrls: ['./deal-mount.component.css']
})
export class DealMountComponent implements OnInit {
  id;
  mount: DealMount;

  constructor(private activatedRoute: ActivatedRoute, private mountService: MountService) {
  }

  ngOnInit() {
    this.subscribeMount();
  }

  subscribeMount() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['mount_id'];
      this.mountService.getMount(this.id).subscribe(mount => {
        this.mount = mount;
      });
    });
  }
}
