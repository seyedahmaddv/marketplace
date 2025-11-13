"use client"
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ArrowLeftIcon, EditIcon, StarIcon } from 'lucide-react';
import { useMarketplaceStore } from '../stores/useMarketplaceStore';

interface ProductDetailProps {
  productId: string;
  onNavigate: (view: string) => void;
}

export function ProductDetail({ productId, onNavigate }: ProductDetailProps) {
  const { products, openProductDrawer } = useMarketplaceStore();
  const product = products.find((p) => p.id === productId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-foreground mb-2">Product not found</h2>
        <Button
          onClick={() => onNavigate('products')}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => onNavigate('products')}
          className="bg-transparent text-foreground hover:bg-muted hover:text-foreground"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" strokeWidth={2} />
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 bg-card text-card-foreground border-border">
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-muted mb-4">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ease-in-out ${
                    index === currentImageIndex
                      ? 'border-primary'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </Card>

        <div className="space-y-6">
          <Card className="p-6 bg-card text-card-foreground border-border">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-2 flex-1">
                <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-5 h-5 fill-warning text-warning" strokeWidth={2} />
                    <span className="font-semibold text-foreground">{product.rating}</span>
                  </div>
                  <span className="text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>
              </div>
              <Button
                onClick={() => openProductDrawer(product)}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                <EditIcon className="w-5 h-5 mr-2" strokeWidth={2} />
                EditIcon
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-3xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Category:</span>
                <span className="px-3 py-1 rounded-full bg-muted text-foreground text-sm font-normal">
                  {product.category}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Inventory:</span>
                <span className="text-foreground font-semibold">
                  {product.inventory} units
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card text-card-foreground border-border">
            <Tabs defaultValue="overview">
              <TabsList className="bg-muted">
                <TabsTrigger value="overview" className="text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="reviews" className="text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="inventory" className="text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">
                  Inventory
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6 space-y-4">
                <div>
                  <h3 className="font-bold text-foreground mb-2">Description</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6 space-y-4">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 rounded-lg bg-muted">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                              key={star}
                              className="w-4 h-4 fill-warning text-warning"
                              strokeWidth={2}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          Customer {i}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Great product! Highly recommended for anyone looking for quality.
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="inventory" className="mt-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Stock:</span>
                    <span className="font-semibold text-foreground">
                      {product.inventory} units
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-normal ${
                        product.inventory > 20
                          ? 'bg-success text-success-foreground'
                          : product.inventory > 10
                          ? 'bg-warning text-warning-foreground'
                          : 'bg-destructive text-destructive-foreground'
                      }`}
                    >
                      {product.inventory > 20
                        ? 'In Stock'
                        : product.inventory > 10
                        ? 'Low Stock'
                        : 'Critical'}
                    </span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
