import { Card } from '../components/ui/card';
import { DollarSignIcon, ShoppingCartIcon, UsersIcon, TrendingUpIcon } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useMarketplaceStore } from '../stores/useMarketplaceStore';

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
];

export function Dashboard() {
  const { orders } = useMarketplaceStore();

  const stats = [
    {
      title: 'Total Sales',
      value: '$24,500',
      change: '+12.5%',
      icon: DollarSignIcon,
      color: 'bg-primary',
    },
    {
      title: 'Orders',
      value: orders.length.toString(),
      change: '+8.2%',
      icon: ShoppingCartIcon,
      color: 'bg-tertiary',
    },
    {
      title: 'Visitors',
      value: '1,234',
      change: '+23.1%',
      icon: UsersIcon,
      color: 'bg-success',
    },
    {
      title: 'Conversion',
      value: '3.2%',
      change: '+2.4%',
      icon: TrendingUpIcon,
      color: 'bg-warning',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6 bg-card text-card-foreground border-border">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-success">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6 bg-card text-card-foreground border-border">
        <h2 className="text-xl font-bold text-foreground mb-6">Sales Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 16%, 85%)" />
            <XAxis dataKey="name" stroke="hsl(210, 10%, 30%)" />
            <YAxis stroke="hsl(210, 10%, 30%)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(210, 16%, 85%)',
                borderRadius: '0.75rem',
                color: 'hsl(210, 15%, 20%)',
              }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="hsl(12, 76%, 54%)"
              strokeWidth={2}
              dot={{ fill: 'hsl(12, 76%, 54%)', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 bg-card text-card-foreground border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Recent Orders</h2>
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted"
              >
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{order.productName}</p>
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-semibold text-foreground">
                    ${order.total.toFixed(2)}
                  </p>
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
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-card text-card-foreground border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Activity Feed</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm text-foreground">New order received</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-success mt-2 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm text-foreground">Product shipped</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-tertiary mt-2 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm text-foreground">New message received</p>
                <p className="text-xs text-muted-foreground">3 hours ago</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-warning mt-2 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm text-foreground">Low inventory alert</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
