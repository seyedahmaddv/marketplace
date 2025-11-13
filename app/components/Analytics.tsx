import { Card } from '../components/ui/card';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const salesData = [
  { month: 'Jan', sales: 4000, orders: 240 },
  { month: 'Feb', sales: 3000, orders: 198 },
  { month: 'Mar', sales: 5000, orders: 320 },
  { month: 'Apr', sales: 4500, orders: 280 },
  { month: 'May', sales: 6000, orders: 390 },
  { month: 'Jun', sales: 5500, orders: 350 },
];

const categoryData = [
  { name: 'Electronics', value: 45 },
  { name: 'Furniture', value: 25 },
  { name: 'Clothing', value: 20 },
  { name: 'Books', value: 10 },
];

const topProducts = [
  { name: 'Wireless Headphones', sales: 145 },
  { name: 'Fitness Watch', sales: 98 },
  { name: 'Office Chair', sales: 76 },
  { name: 'Bluetooth Speaker', sales: 203 },
];

const COLORS = ['hsl(12, 76%, 54%)', 'hsl(185, 55%, 45%)', 'hsl(151, 52%, 46%)', 'hsl(42, 99%, 46%)'];

export function Analytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          Track your store's performance and insights
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card text-card-foreground border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Sales & Orders Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 16%, 85%)" />
              <XAxis dataKey="month" stroke="hsl(210, 10%, 30%)" />
              <YAxis stroke="hsl(210, 10%, 30%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(0, 0%, 100%)',
                  border: '1px solid hsl(210, 16%, 85%)',
                  borderRadius: '0.75rem',
                  color: 'hsl(210, 15%, 20%)',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="hsl(12, 76%, 54%)"
                strokeWidth={2}
                name="Sales ($)"
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="hsl(185, 55%, 45%)"
                strokeWidth={2}
                name="Orders"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-card text-card-foreground border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Category Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(0, 0%, 100%)',
                  border: '1px solid hsl(210, 16%, 85%)',
                  borderRadius: '0.75rem',
                  color: 'hsl(210, 15%, 20%)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card text-card-foreground border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Top Selling Products</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 16%, 85%)" />
              <XAxis type="number" stroke="hsl(210, 10%, 30%)" />
              <YAxis dataKey="name" type="category" width={150} stroke="hsl(210, 10%, 30%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(0, 0%, 100%)',
                  border: '1px solid hsl(210, 16%, 85%)',
                  borderRadius: '0.75rem',
                  color: 'hsl(210, 15%, 20%)',
                }}
              />
              <Bar dataKey="sales" fill="hsl(12, 76%, 54%)" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-card text-card-foreground border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Key Metrics</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Average Order Value</p>
                <p className="text-2xl font-bold text-foreground">$156.50</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-success">+15.3%</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
                <p className="text-2xl font-bold text-foreground">3.2%</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-success">+2.4%</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Customer Retention</p>
                <p className="text-2xl font-bold text-foreground">68%</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-success">+5.1%</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
