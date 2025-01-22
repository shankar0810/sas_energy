package com.sas.product_service.service;

import com.sas.product_service.Repository.CategoryRepository;
import com.sas.product_service.Repository.ProductRepository;
import com.sas.product_service.entity.Category;
import com.sas.product_service.entity.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    // CRUD operations for products
    public Product createProduct(Product product) {
        if (product.getCategory() != null) {
            // Check if the category already exists
            Category category = categoryRepository.findByName(product.getCategory().getName())
                    .orElseGet(() -> {
                        // Create a new category if it doesn't exist
                        Category newCategory = new Category();
                        newCategory.setName(product.getCategory().getName());
                        return categoryRepository.save(newCategory);
                    });
            product.setCategory(category);
        }
        return productRepository.save(product);
    }



    public Product updateProduct(Long id, Product productDetails) {
        Product product = productRepository.findById(id).orElseThrow();
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setCategory(productDetails.getCategory());
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public Product getProduct(Long id) {
        return productRepository.findById(id).orElseThrow();
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    public List<Product> getProductsByPriceRange(double minPrice, double maxPrice) {
        return productRepository.findByPriceBetween(minPrice, maxPrice);
    }
}

