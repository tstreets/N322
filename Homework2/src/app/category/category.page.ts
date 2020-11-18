import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealService } from '../services/meal.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  category: string = "Category"

  constructor(public mealService: MealService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get("category");
    this.mealService.getFilterByCategoryData(this.category);
  }

}
