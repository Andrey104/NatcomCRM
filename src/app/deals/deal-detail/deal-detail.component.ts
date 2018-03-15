import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DealService} from '../../services/deal.service';
import {DealResult} from '../../models/deal/deal_result';
import {UtilsService} from '../../services/utils.service';
import {Client} from '../../models/client';

@Component({
  selector: 'app-deal-detail',
  templateUrl: './deal-detail.component.html',
  styleUrls: ['./deal-detail.component.css'],
})
export class DealDetailComponent implements OnInit, AfterViewChecked {
  flag = false;
  private id;
  page = 1;
  select;
  clientInfo = false;
  client: Client;
  deal: DealResult;
  loadPage: boolean;
  showCompleteDialog = false;

  constructor(private activatedRoute: ActivatedRoute,
              private dealService: DealService,
              private utils: UtilsService) {
  }

  ngOnInit() {
    this.select = 0;
    this.subscribeDealId();
  }

  ngAfterViewChecked(): void {
    if (this.flag) {
      document.getElementById('page').scrollTop = document.getElementById('page').scrollHeight;
      this.flag = false;
    }
  }

  subscribeDealId(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.loadPage = true;
      this.getDealById();
    });
  }

  getDealById(): void {
    this.dealService.getDealById(this.id)
      .subscribe((deal) => {
        this.deal = deal;
        this.loadPage = false;
      });
  }

  sendComment(comment: string) {
    this.dealService.dealComment(this.id, comment).subscribe(
      next => {
        this.deal.comments.push(next);
        this.flag = true;
      }, error => {
        console.log(error.error);
      });
  }

  getDealStatus(status) {
    return this.utils.statusDeal(status);
  }

  openClientInfo(idClient: number) {
    this.clientInfo = true;
    this.client = this.deal.clients[idClient];
  }

  closeClientInfo() {
    this.clientInfo = false;
    this.client = null;
  }
}
