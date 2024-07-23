import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { SaveTenderModalComponent } from '../save-tender-modal/save-tender-modal.component';
import { TenderService } from '../tender.service';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [NzTableModule , CommonModule ,NzModalModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent implements OnInit {
  tenders: any[] = [];
  total = 0;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  sortField = 'acceptedAt';
  sortOrder = 'descend';

  constructor(
    private tenderService: TenderService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.loadTenders();
  }

  loadTenders(params: any = {
    pageIndex: this.pageIndex,
    pageSize: this.pageSize,
    sort: [{ key: this.sortField, value: this.sortOrder }]
  }): void {
    this.loading = true;
    const criteria: any = {}; // Add criteria if needed

    this.tenderService.getAllTenders(
      params.pageIndex - 1,
      params.pageSize,
      params.sort[0].key,
      params.sort[0].value === 'ascend' ? 'ASC' : 'DESC',
      criteria
    ).subscribe((response: any) => {
      this.loading = false;
      this.tenders = response.content;
      this.total = response.totalElements;
    });
  }

  onQueryParamsChange(params: any): void {
    this.pageIndex = params.pageIndex;
    this.pageSize = params.pageSize;
    this.sortField = params.sort[0].key;
    this.sortOrder = params.sort[0].value;
    this.loadTenders(params);
  }

  showSaveTenderModal(): void {
    const modal = this.modalService.create({
      nzTitle: 'Save Tender',
      nzContent: SaveTenderModalComponent,
      nzFooter: null,
      nzWidth: 800
    });

    modal.afterClose.subscribe((result:any) => {
      if (result) {
        this.loadTenders();
      }
    });
  }
}
