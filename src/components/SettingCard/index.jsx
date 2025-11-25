import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Bolt, Droplet, Wifi, Brush } from "lucide-react";
import { Spinner } from "../ui/spinner";

export default function SettingCard({
  settings,
  setSettings,
  loading,
  saving,
  handleSave,
}) {
  return (
    <div className="space-y-1">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600 mb-6">
          Manage your system preferences and pricing
        </p>
      </div>

      <Card className="rounded-2xl shadow-sm">
        {loading ? (
          <div className="h-[250px] flex items-center justify-center">
            <Spinner className="h-8 w-8 text-gray-500" />
          </div>
        ) : (
          <>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Pricing Configuration
              </CardTitle>
              <p className="text-gray-500 text-[15px]">
                Set the pricing for utilities and services
              </p>
            </CardHeader>

            <CardContent className="space-y-8">
              <div>
                <Label className="font-medium flex items-center gap-2">
                  <Bolt size={18} className="text-yellow-500" />
                  Electricity Price (₫/kWh)
                </Label>
                <Input
                  className="mt-2"
                  type="number"
                  value={settings.electricityPrice}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      electricityPrice: e.target.value,
                    }))
                  }
                />
                <p className="text-gray-500 text-sm mt-1">
                  Price per kilowatt-hour (kWh)
                </p>
              </div>
              <div>
                <Label className="font-medium flex items-center gap-2">
                  <Droplet size={18} className="text-blue-500" />
                  Water Price (₫/m³)
                </Label>
                <Input
                  className="mt-2"
                  type="number"
                  value={settings.waterPrice}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      waterPrice: e.target.value,
                    }))
                  }
                />
                <p className="text-gray-500 text-sm mt-1">
                  Price per cubic meter (m³)
                </p>
              </div>
              <div>
                <Label className="font-medium flex items-center gap-2">
                  <Wifi size={18} className="text-purple-500" />
                  Internet Fee (₫/month)
                </Label>
                <Input
                  className="mt-2"
                  type="number"
                  value={settings.internetFee}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      internetFee: e.target.value,
                    }))
                  }
                />
                <p className="text-gray-500 text-sm mt-1">
                  Monthly internet subscription fee
                </p>
              </div>
              <div>
                <Label className="font-medium flex items-center gap-2">
                  <Brush size={18} className="text-green-600" />
                  Cleaning Fee (₫/month) – Optional
                </Label>
                <Input
                  className="mt-2"
                  type="number"
                  value={settings.cleaningFee}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      cleaningFee: e.target.value,
                    }))
                  }
                />
                <p className="text-gray-500 text-sm mt-1">
                  Monthly cleaning service fee (optional)
                </p>
              </div>
              <div className="pt-2">
                <Button
                  disabled={loading || saving}
                  onClick={() => handleSave()}
                  className="w-full py-5 text-base rounded-xl bg-black hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <Spinner className="h-5 w-5 text-white" />
                      Saving...
                    </>
                  ) : (
                    "Save Settings"
                  )}
                </Button>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
