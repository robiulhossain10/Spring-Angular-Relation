import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Product, ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-add-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.scss']
})
export class ProductAddEditComponent implements OnInit {

  productForm!: FormGroup;
  isEditMode = false;
  productId!: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.isEditMode = idParam !== null;  // Only true if id exists
    if (this.isEditMode) {
      this.productId = Number(idParam);
    }

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['', Validators.required]
    });

    if (this.isEditMode) {
      this.productService.getProductById(this.productId).subscribe({
        next: (res) => this.productForm.patchValue(res),
        error: (err) => console.error(err)
      });
    }
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    const product: Product = this.productForm.value;

    if (this.isEditMode) {
      this.productService.updateProduct(this.productId, product).subscribe({
        next: () => this.router.navigate(['/product', this.productId]), // Redirect to details page
        error: (err) => console.error(err)
      });
    } else {
      this.productService.createProduct(product).subscribe({
        next: (res: Product) => {
          this.router.navigate(['/product', res.id]); // Redirect to newly created product details page
        },
        error: (err) => console.error(err)
      });
    }
  }

  cancel() {
    this.router.navigate(['/products']);
  }
}
