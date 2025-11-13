"use client"
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { useMarketplaceStore } from '../stores/useMarketplaceStore';

export function Orders() {
  const { orders } = useMarketplaceStore();
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = orders.filter(
    (order) => statusFilter === 'all' || order.status === statusFilter
  );

  const statusCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Orders</h1>
        <p className="text-muted-foreground">
          Manage and track all your customer orders
        </p>
      </div>

      <Card className="p-6 bg-card text-card-foreground border-border">
        <Tabs value={statusFilter} onValueChange={setStatusFilter}>
          <TabsList className="bg-muted mb-6">
            <TabsTrigger value="all" className="text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">
              All ({statusCounts.all})
            </TabsTrigger>
            <TabsTrigger value="pending" className="text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">
              Pending ({statusCounts.pending})
            </TabsTrigger>
            <TabsTrigger value="processing" className="text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">
              Processing ({statusCounts.processing})
            </TabsTrigger>
            <TabsTrigger value="shipped" className="text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">
              Shipped ({statusCounts.shipped})
            </TabsTrigger>
            <TabsTrigger value="delivered" className="text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">
              Delivered ({statusCounts.delivered})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={statusFilter}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">
                      Order ID
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">
                      Product
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">
                      Customer
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">
                      Date
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">
                      Total
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">
                      Status
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-border hover:bg-muted transition-all duration-200 ease-in-out"
                    >
                      <td className="py-4 px-4 text-sm text-foreground font-mono">
                        {order.id}
                      </td>
                      <td className="py-4 px-4 text-sm text-foreground">
                        {order.productName}
                      </td>
                      <td className="py-4 px-4 text-sm text-foreground">
                        {order.customer}
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-sm font-semibold text-foreground">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-normal ${
                            order.status === 'delivered'
                              ? 'bg-success text-success-foreground'
                              : order.status === 'shipped'
                              ? 'bg-tertiary text-tertiary-foreground'
                              : order.status === 'processing'
                              ? 'bg-warning text-warning-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                          className="bg-transparent text-foreground hover:bg-muted hover:text-foreground"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-[500px] bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle className="text-foreground">Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                  <p className="font-semibold text-foreground font-mono">
                    {selectedOrder.id}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-normal ${
                      selectedOrder.status === 'delivered'
                        ? 'bg-success text-success-foreground'
                        : selectedOrder.status === 'shipped'
                        ? 'bg-tertiary text-tertiary-foreground'
                        : selectedOrder.status === 'processing'
                        ? 'bg-warning text-warning-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Product</p>
                <p className="font-semibold text-foreground">{selectedOrder.productName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Customer</p>
                <p className="font-semibold text-foreground">{selectedOrder.customer}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date</p>
                  <p className="font-semibold text-foreground">
                    {new Date(selectedOrder.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total</p>
                  <p className="font-semibold text-primary text-lg">
                    ${selectedOrder.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
