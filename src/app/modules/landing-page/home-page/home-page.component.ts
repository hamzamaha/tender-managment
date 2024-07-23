import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CardComponent } from '../../../shared/components/card/card.component';
import { SharedServiceService } from '../../../shared/shared-service.service';
interface CompanySector {
  name: string;
  selected: boolean;
}
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule,
    NzTagModule,FormsModule,NzCheckboxModule,
    NzSelectModule,NzFormModule,NzInputModule,CardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  companySectors: CompanySector[] = [
    { name: 'Manufacturing', selected: false },
    { name: 'Management', selected: false },
    { name: 'Construction', selected: false },
    { name: 'Technology', selected: false },
    { name: 'Retail', selected: false },
    { name: 'Agriculture', selected: false },
    { name: 'Tertiary sector of the economy', selected: false },
    { name: 'Trade', selected: false },
    { name: 'Industry', selected: false }
  ];
  tenders: any[] = [];
  page: number = 0;
  totalPages: number = 1;
  loading: boolean = false;
  payload = {
    location: null,
    sectors: null,
    status: null
  };

    constructor(private sharedServiceService:SharedServiceService) {}

    ngOnInit() {
      this.loadData();
    }

  onTagChange(sector: CompanySector, checked: boolean) {
    sector.selected = checked;
  }

  showMatches() {
    const selectedSectors = this.companySectors
      .filter(sector => sector.selected)
      .map(sector => sector.name);
    console.log('Selected sectors:', selectedSectors);
  }

  clearAllFilters() {
    // Clear company sectors
    this.companySectors.forEach(sector => sector.selected = false);
  }


  loadData() {
    if (this.loading) return;
    this.loading = true;

    this.sharedServiceService.getTenders(this.page, 10, this.payload).subscribe(
      data => {
        this.tenders = [...this.tenders, ...data.content];
        this.totalPages = data.totalPages;
        this.loading = false;
      },
      error => {
        console.error('Error fetching tenders', error);
        this.loading = false;
      }
    );
  }

  // @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {

    const element = event.target;

    const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 1;

    if (atBottom && !this.loading && this.page < this.totalPages - 1) {
      this.page++;
      this.loadData();
    }
  }
}
