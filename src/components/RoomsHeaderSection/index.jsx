import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function RoomsHeaderSection({
  handleOpenDialog,
  searchTerm,
  onSearchChange,
}) {
  return (
    <div className="w-full">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold">Rooms Management</h1>
          <p className="text-gray-500 mt-2">Manage your rental rooms</p>
        </div>

        <Button
          onClick={handleOpenDialog}
          className="bg-black text-white px-5 py-2 rounded-xl flex items-center gap-2 h-11 mt-1 cursor-pointer"
        >
          <Plus size={18} />
          Create Room
        </Button>
      </div>

      <Card className="w-full mt-4 border rounded-2xl shadow-sm">
        <CardContent>
          <p className="font-semibold mb-3 text-lg">Search Rooms</p>
          <Input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by room name..."
            className="max-w-md h-12 text-base rounded-xl"
          />
        </CardContent>
      </Card>
    </div>
  );
}

