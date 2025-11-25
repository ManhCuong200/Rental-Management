import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TenantsHeaderSection({ onOpenDialog, searchTerm, onSearchChange }) {
  return (
    <div className="w-full">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold">Tenants Management</h1>
          <p className="text-gray-500 mt-2">Manage your tenants</p>
        </div>

        <Button
          onClick={onOpenDialog}
          className="bg-black text-white px-5 py-2 rounded-xl flex items-center gap-2 h-11 mt-1 cursor-pointer"
        >
          <Plus size={18} />
          Add Tenant
        </Button>
      </div>

      <Card className="w-full mt-4 border rounded-2xl shadow-sm">
        <CardContent>
          <p className="font-semibold mb-3 text-lg">Search Tenants</p>
          <Input
            placeholder="Search by name or phone..."
            className="max-w-md h-12 text-base rounded-xl"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
