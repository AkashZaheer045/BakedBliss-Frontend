import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Loader2, Store, Bell, Truck, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { adminService } from "@/services";

interface SettingsData {
  store: {
    name: string;
    email: string;
    phone: string;
    address: string;
    currency: string;
    timezone: string;
  };
  notifications: {
    emailOnNewOrder: boolean;
    emailOnOrderStatus: boolean;
    lowStockAlert: boolean;
    lowStockThreshold: number;
  };
  delivery: {
    freeDeliveryThreshold: number;
    deliveryFee: number;
    estimatedTime: string;
  };
}

export const Settings = () => {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await adminService.getSettings();
      if (response.status === 'success' && response.data) {
        setSettings(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
      toast({ title: "Error", description: "Failed to load settings", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      toast({ title: "Settings saved", description: "Your settings have been updated successfully" });
      setSaving(false);
    }, 1000);
  };

  if (loading || !settings) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Store Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Store className="w-5 h-5 mr-2 text-primary" />
              Store Information
            </CardTitle>
            <CardDescription>Basic information about your bakery</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input
                  id="storeName"
                  value={settings.store.name}
                  onChange={(e) => setSettings({
                    ...settings,
                    store: { ...settings.store, name: e.target.value }
                  })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="storeEmail">Email</Label>
                <Input
                  id="storeEmail"
                  type="email"
                  value={settings.store.email}
                  onChange={(e) => setSettings({
                    ...settings,
                    store: { ...settings.store, email: e.target.value }
                  })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="storePhone">Phone</Label>
                <Input
                  id="storePhone"
                  value={settings.store.phone}
                  onChange={(e) => setSettings({
                    ...settings,
                    store: { ...settings.store, phone: e.target.value }
                  })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  value={settings.store.currency}
                  onChange={(e) => setSettings({
                    ...settings,
                    store: { ...settings.store, currency: e.target.value }
                  })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={settings.store.address}
                onChange={(e) => setSettings({
                  ...settings,
                  store: { ...settings.store, address: e.target.value }
                })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2 text-primary" />
              Notifications
            </CardTitle>
            <CardDescription>Configure email and alert preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email on New Order</Label>
                <p className="text-sm text-muted-foreground">Receive email when a new order is placed</p>
              </div>
              <Switch
                checked={settings.notifications.emailOnNewOrder}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, emailOnNewOrder: checked }
                })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email on Status Change</Label>
                <p className="text-sm text-muted-foreground">Notify customers when order status changes</p>
              </div>
              <Switch
                checked={settings.notifications.emailOnOrderStatus}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, emailOnOrderStatus: checked }
                })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Low Stock Alert</Label>
                <p className="text-sm text-muted-foreground">Get notified when products are running low</p>
              </div>
              <Switch
                checked={settings.notifications.lowStockAlert}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, lowStockAlert: checked }
                })}
              />
            </div>
            {settings.notifications.lowStockAlert && (
              <div className="grid gap-2 pl-4 border-l-2 border-primary/20">
                <Label htmlFor="threshold">Low Stock Threshold</Label>
                <Input
                  id="threshold"
                  type="number"
                  className="w-32"
                  value={settings.notifications.lowStockThreshold}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, lowStockThreshold: parseInt(e.target.value) }
                  })}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delivery Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="w-5 h-5 mr-2 text-primary" />
              Delivery Settings
            </CardTitle>
            <CardDescription>Configure delivery options and fees</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="deliveryFee">Delivery Fee ($)</Label>
                <Input
                  id="deliveryFee"
                  type="number"
                  step="0.01"
                  value={settings.delivery.deliveryFee}
                  onChange={(e) => setSettings({
                    ...settings,
                    delivery: { ...settings.delivery, deliveryFee: parseFloat(e.target.value) }
                  })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="freeThreshold">Free Delivery Threshold ($)</Label>
                <Input
                  id="freeThreshold"
                  type="number"
                  value={settings.delivery.freeDeliveryThreshold}
                  onChange={(e) => setSettings({
                    ...settings,
                    delivery: { ...settings.delivery, freeDeliveryThreshold: parseFloat(e.target.value) }
                  })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="estimatedTime">Estimated Delivery Time</Label>
                <Input
                  id="estimatedTime"
                  value={settings.delivery.estimatedTime}
                  onChange={(e) => setSettings({
                    ...settings,
                    delivery: { ...settings.delivery, estimatedTime: e.target.value }
                  })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
