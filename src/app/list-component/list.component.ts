import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styles: [`h1 { font-family: Lato; }`]
})
export class ListComponent implements OnInit  {
  selectData = new FormControl('');
  searchData = new FormControl(''); 
  selectFilter: (el: any) => boolean;
  searchFilter: (el: any) => boolean;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(){
    // Can't just use snapshot, because of how ActivatedRoute works it gives null at first
    this.router.events.pipe(
      filter( event => event instanceof NavigationEnd ),
      take(1)
    ).subscribe((event: RouterEvent) => 
      {
        const selectValue = this.route.snapshot.queryParamMap.get('selectValue');
        if (selectValue) { this.selectData.setValue(selectValue) };

        const searchValue = this.route.snapshot.queryParamMap.get('searchValue');
        if (searchValue) { this.searchData.setValue(searchValue) };
      }
    );

    this.selectData.valueChanges.subscribe( value => {
      this.updateSelectFilter(value);
      this.updateQueryParams({selectValue: value});
    });

    this.searchData.valueChanges.subscribe( value => {
      this.updateSearchFilter(value);
      this.updateQueryParams({searchValue: value});
    });
  }

  updateSelectFilter(value: string) {
    const regExp = new RegExp('^' + value, 'i');
    this.selectFilter = el => !!el.name.match(regExp);
  }

  updateSearchFilter(value: string) {
    const regExp = new RegExp(value, 'i');
    this.searchFilter = el => !!el.name.match(regExp);
  }

  updateQueryParams(queryParams: any) {
    // To remove empty query param from url, it needs to be set to null explicitly
    queryParams = Object.assign({}, ...Object.keys(queryParams).map(
      key => ({[key]: queryParams[key] ? queryParams[key] : null})
    ));
    this.router.navigate(['.'], { 
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: "merge"
    });
  }
  
  list = [
    {name: 'foo'},
    {name: 'bar'},
    {name: 'foo something'},
    {name: 'bar something'},
  ]
  
  
}
