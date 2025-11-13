"use client"
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { PlusIcon, SearchIcon, StarIcon } from 'lucide-react';
import { useMarketplaceStore } from '../stores/useMarketplaceStore';

interface ProductsProps {
  onNavigate: (view: string, productId?: string) => void;
}

export function Products({ onNavigate }: ProductsProps) {
  const { products, openProductDrawer } = useMarketplaceStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory and listings
          </p>
        </div>
        <Button
          onClick={() => openProductDrawer()}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <PlusIcon className="w-5 h-5 mr-2" strokeWidth={2} />
          Add Product
        </Button>
      </div>

      <Card className="p-6 bg-card text-card-foreground border-border">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <SearchIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              strokeWidth={2}
            />
            <Input
              type="search"
              placeholder="SearchIcon products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background text-foreground border-border"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-background text-foreground border-border">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground">
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="text-popover-foreground hover:bg-muted cursor-pointer">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <PlusIcon className="w-8 h-8 text-muted-foreground" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery || categoryFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Get started by adding your first product'}
            </p>
            {!searchQuery && categoryFilter === 'all' && (
              <Button
                onClick={() => openProductDrawer()}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <PlusIcon className="w-5 h-5 mr-2" strokeWidth={2} />
                Add Product
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden bg-card text-card-foreground border-border hover:shadow-lg transition-all duration-200 ease-in-out cursor-pointer"
                onClick={() => onNavigate('product-detail', product.id)}
              >
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-lg text-foreground line-clamp-2">
                      {product.name}
                    </h3>
                    <span className="text-lg font-bold text-primary flex-shrink-0">
                      ${product.price}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 fill-warning text-warning" strokeWidth={2} />
                      <span className="text-sm font-semibold text-foreground">
                        {product.rating}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Stock: {product.inventory}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
