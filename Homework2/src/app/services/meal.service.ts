import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  url: any = {
    categories: "https://www.themealdb.com/api/json/v1/1/categories.php",
    filterByCategory: "https://www.themealdb.com/api/json/v1/1/filter.php?c=",
    details: "https://www.themealdb.com/api/json/v1/1/lookup.php?i="
  }

  categoryList: any = [];
  categoryItems: any = [];
  meal: any;

  constructor(public http: HttpClient) {  }

  getCategoriesData() {
    this.http.get(this.url.categories)
    .subscribe((res:any)=> {
      this.categoryList = res.categories;
      // console.log(this.categoryList);
    })
  }

  getFilterByCategoryData(category: string) {
    const fullUrl = this.url.filterByCategory + category;
    this.http.get(fullUrl)
    .subscribe((res: any)=> {
      this.categoryItems = res.meals;
      // console.log(this.categoryItems);
    })
  }

  getMealData(id: string) {
    const fullUrl = this.url.details + id;
    this.http.get(fullUrl)
    .subscribe((res: any)=> {
      this.meal = res.meals;
      console.log(this.meal);
    })
  }
  

}
