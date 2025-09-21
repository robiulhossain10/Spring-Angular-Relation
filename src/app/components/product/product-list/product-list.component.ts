import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from '../../../services/product.service';
import {Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(private prodservice: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.prodservice.getProducts().subscribe({
      next: (res) => this.products = res,
      error: (err) => console.error(err)
    });
  }

  viewProduct(id: number) {
    this.router.navigate(['/product', id]);
  }



  deleteProduct(id: number) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.prodservice.deleteProduct(id).subscribe({
      next: () => {
        // Remove the deleted product from the products array to update UI
        this.products = this.products.filter(p => p.id !== id);
        console.log('Product deleted successfully');
      },
      error: (err) => console.error('Delete failed', err)
    });
  }

}
