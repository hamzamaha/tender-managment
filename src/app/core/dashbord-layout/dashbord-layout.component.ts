import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-dashbord-layout',
  standalone: true,
  imports: [CommonModule , NzLayoutModule , RouterOutlet,NzMenuModule , RouterLink ,NzIconModule],
  templateUrl: './dashbord-layout.component.html',
  styleUrl: './dashbord-layout.component.css'
})
export class DashbordLayoutComponent {
  isCollapsed = false;
}
