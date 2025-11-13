"use client"
import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../components/ui/dialog';
import { useMarketplaceStore } from '../stores/useMarketplaceStore';
import { XIcon } from 'lucide-react';

export function ProductDrawer() {
  const {
    isProductDrawerOpen,
    closeProductDrawer,
    editingProduct,
    addProduct,
    updateProduct,
  } = useMarketplaceStore();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    inventory: '',
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price.toString(),
        category: editingProduct.category,
        inventory: editingProduct.inventory.toString(),
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        inventory: '',
      });
    }
  }, [editingProduct, isProductDrawerOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      inventory: parseInt(formData.inventory),
      images: editingProduct?.images || ['https://c.animaapp.com/mhw515p9c8jRKK/img/ai_1.png'],
      rating: editingProduct?.rating || 0,
      reviews: editingProduct?.reviews || 0,
    };

    if (editingProduct) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }
    closeProductDrawer();
  };

  return (
    <Dialog open={isProductDrawerOpen} onOpenChange={closeProductDrawer}>
      <DialogContent className="sm:max-w-[600px] bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="bg-background text-foreground border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-foreground">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                rows={4}
                className="bg-background text-foreground border-border"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-foreground">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                  className="bg-background text-foreground border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inventory" className="text-foreground">Inventory</Label>
                <Input
                  id="inventory"
                  type="number"
                  value={formData.inventory}
                  onChange={(e) =>
                    setFormData({ ...formData, inventory: e.target.value })
                  }
                  required
                  className="bg-background text-foreground border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-foreground">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger className="bg-background text-foreground border-border">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground">
                  <SelectItem value="Electronics" className="text-popover-foreground hover:bg-muted cursor-pointer">
                    Electronics
                  </SelectItem>
                  <SelectItem value="Furniture" className="text-popover-foreground hover:bg-muted cursor-pointer">
                    Furniture
                  </SelectItem>
                  <SelectItem value="Clothing" className="text-popover-foreground hover:bg-muted cursor-pointer">
                    Clothing
                  </SelectItem>
                  <SelectItem value="Books" className="text-popover-foreground hover:bg-muted cursor-pointer">
                    Books
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={closeProductDrawer}
              className="bg-transparent text-foreground border-border hover:bg-muted hover:text-foreground"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
              {editingProduct ? 'Update Product' : 'Add Product'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
