import React, { useState, useEffect } from "react";
import SettingCard from "@/components/SettingCard";
import { getSettings, createSettings, updateSettings } from "@/Service/api/setting";
import toast from "react-hot-toast";

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    electricityPrice: "",
    waterPrice: "",
    internetFee: "",
    cleaningFee: "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getSettings();
        if (res.status === 200 && res.data) {
          setSettings({
            electricityPrice: res.data.electricityPrice,
            waterPrice: res.data.waterPrice,
            internetFee: res.data.internetFee,
            cleaningFee: res.data.cleaningFee,
          });
        }
      } catch (error) {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const body = {
      electricityPrice: Number(settings.electricityPrice),
      waterPrice: Number(settings.waterPrice),
      internetFee: Number(settings.internetFee),
      cleaningFee: Number(settings.cleaningFee),
    };
    try {
      let res;
      const hasSettings =
        settings.electricityPrice !== "" ||
        settings.waterPrice !== "" ||
        settings.internetFee !== "" ||
        settings.cleaningFee !== "";
      if (hasSettings) {
        res = await updateSettings(body);
        if (res.status === 200) toast.success("Settings updated successfully!");
      }
      else {
        res = await createSettings(body);
        if (res.status === 201) toast.success("Settings created successfully!");
      }
    } catch (err) {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 lg:p-8">
      <SettingCard
        settings={settings}
        setSettings={setSettings}
        loading={loading}
        saving={saving}
        handleSave={handleSave}
      />
    </main>
  );
};

export default Settings;
