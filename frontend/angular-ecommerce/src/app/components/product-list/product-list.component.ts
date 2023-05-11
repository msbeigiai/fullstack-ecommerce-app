import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = []
  currentCategoryId: number = 0
  searchMode: boolean = false
  constructor(private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts()
    })
  }

  private listProducts() {
    // check if "id" parameter is available
    this.searchMode = this.route.snapshot.paramMap.has("keyword")
    if (this.searchMode) {
      this.handleSearchProducts()
    } else {
      this.handleListProducts()
    }
  }

  handleListProducts() {
    const hasCategory: boolean = this.route.snapshot.paramMap.has('id')

    if (hasCategory) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!
    } else {
      this.currentCategoryId = 1
    }

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data
      }
    )
  }

  private handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get("keyword")!

    this.productService.searchProduct(keyword).subscribe(
      data => {
        this.products = data
      }
    )
  }
}
