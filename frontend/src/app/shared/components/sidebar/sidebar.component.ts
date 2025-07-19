import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isMobile = false;
  isSidebarVisible = true;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      if (result.matches) {
        this.isMobile = true;
        this.isSidebarVisible = false;
      } else {
        this.isMobile = false;
        this.isSidebarVisible = true;
      }
    });
  }

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
