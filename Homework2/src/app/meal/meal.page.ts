import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealService } from '../services/meal.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit {
  ingredients:any = []

  constructor(public mealService: MealService, private route: ActivatedRoute) { 
    for(let i = 1; i <= 20; i++) {
      this.ingredients.push({
        name: `strIngredient${i}`,
        size: `strMeasure${i}`
      });
    }
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.mealService.getMealData(id);
  }

}
