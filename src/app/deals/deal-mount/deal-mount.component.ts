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
  dealId;

  constructor(private activatedRoute: ActivatedRoute, private mountService: MountService) {
  }

  ngOnInit() {
    this.subscribeMount();
  }

  subscribeMount() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['mount_id'];
      this.dealId = params['id'];
      this.mountService.getMount(this.id).subscribe(mount => {
        this.mount = mount;
      });
    });
  }
}
// 0 - в процессе
// 1 - добавлена стадия
// 2 - успешно завершен
// 3 - отклонен
