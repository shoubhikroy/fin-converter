import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { suffixes } from '../constants'

@Component({
  selector: 'app-output-route',
  templateUrl: './output-route.component.html',
  styleUrls: ['./output-route.component.css']
})
export class OutputRouteComponent implements OnInit {
  prefix: number = -1;
  suffix: string = "";  
  value: number = -1;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.prefix = +window.history.state.prefix;
    this.suffix = window.history.state.suffix;
    this.parseValue();
    if (!this.value || this.value < 0) this.router.navigate([`input`]);
  }

  parseValue() {
    console.log(this.prefix, this.suffix);
    let exponent: number = suffixes[this.suffix];
    let factor: number = exponent ? Math.pow(10, exponent) : 1;
    this.value = this.prefix * factor; 
  }

  back() {
    this.router.navigate([`input`]);
  }
}
