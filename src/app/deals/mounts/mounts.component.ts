import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MountService} from '../../services/mount.service';
import {DealMount} from '../../models/deal/deal_mount';

@Component({
  selector: 'app-mounts',
  templateUrl: './mounts.component.html',
  styleUrls: ['./mounts.component.css']
})
export class MountsComponent implements OnInit {
  id: number;
  mounts: DealMount[];
  // поменять ActivatedRoute
  constructor(private activatedRoute: ActivatedRoute, private mountService: MountService) { }

  ngOnInit() {
    this.subscribeMount();
  }
  subscribeMount() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.mountService.getMounts(this.id).subscribe(mounts => {
        console.log('Ghsad');
        this.mounts = mounts;
        console.log(this.mounts);
      });
    });
  }

}
