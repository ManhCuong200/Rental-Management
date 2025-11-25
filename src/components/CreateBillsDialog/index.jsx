import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";

export default function CreateBillDialog({
  open,
  onClose,
  billData,
  setBillData,
  rooms,
  tenants,
  isEditing,
  onSubmit,
  onUpdateSubmit,
  editLoading,
  createLoading,
}) {
  const [date, setDate] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const updateField = (field, value) => {
    setBillData((prev) => ({ ...prev, [field]: value }));
  };

  const formatMonthText = (monthStr) => {
    if (!monthStr) return "Chọn tháng";
    const [year, month] = monthStr.split("-");
    const d = new Date(`${year}-${month}-01`);
    return d.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
    });
  };

  const handleSubmit = () => {
    if (isEditing) {
      onUpdateSubmit();
    } else {
      onSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl px-6 py-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {isEditing ? "Cập Nhật Hóa Đơn" : "Tạo Hóa Đơn"}
          </DialogTitle>
        </DialogHeader>

        <h2 className="text-[15px] font-semibold text-gray-700 mt-2">
          THÔNG TIN CƠ BẢN
        </h2>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="flex flex-col gap-1">
            <Label>Người Thuê *</Label>
            <Select
              value={billData.tenantId}
              onValueChange={(val) => updateField("tenantId", val)}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Chọn người thuê" />
              </SelectTrigger>

              <SelectContent>
                {tenants?.map((tenant) => (
                  <SelectItem key={tenant._id} value={tenant._id}>
                    {tenant.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <Label>Phòng *</Label>
            <Select
              value={billData.roomId}
              onValueChange={(val) => updateField("roomId", val)}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Chọn phòng" />
              </SelectTrigger>

              <SelectContent>
                {rooms?.map((room) => (
                  <SelectItem key={room._id} value={room._id}>
                    {room.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4">
          <Label>Tháng *</Label>

          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="w-full h-11 px-3 mt-1 border rounded-xl flex items-center justify-between text-left"
              >
                {formatMonthText(billData.month)}
                <CalendarIcon className="text-gray-500" size={18} />
              </button>
            </PopoverTrigger>

            <PopoverContent className="p-4 w-80">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedYear(selectedYear - 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <div className="text-center font-semibold text-lg">
                    {selectedYear}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedYear(selectedYear + 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ].map((month, index) => {
                    const currentYear = selectedYear;
                    const monthValue = `${currentYear}-${String(index + 1).padStart(2, "0")}`;
                    const isSelected = billData.month === monthValue;

                    return (
                      <button
                        key={month}
                        type="button"
                        onClick={() => {
                          const newDate = new Date(currentYear, index, 1);
                          setDate(newDate);
                          updateField("month", monthValue);
                        }}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isSelected
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100 text-gray-700"
                          }`}
                      >
                        {month}
                      </button>
                    );
                  })}
                </div>

                {/* Action buttons */}
                <div className="flex justify-between pt-2 border-t">
                  <button
                    type="button"
                    onClick={() => {
                      setDate(null);
                      updateField("month", "");
                    }}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const today = new Date();
                      setDate(today);
                      const monthValue = `${today.getFullYear()}-${String(
                        today.getMonth() + 1
                      ).padStart(2, "0")}`;
                      updateField("month", monthValue);
                    }}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    This month
                  </button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <h2 className="text-[15px] font-semibold text-gray-700 mt-6">
          CHỈ SỐ ĐIỆN NƯỚC
        </h2>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <Label>Chỉ Số Cũ (kWh)</Label>
            <Input
              className="mt-1 h-11"
              type="number"
              value={billData.electricityOld || ""}
              onChange={(e) =>
                updateField("electricityOld", Number(e.target.value))
              }
            />
            <p className="text-xs text-gray-500 mt-1">₫4,009/kWh</p>
          </div>

          <div>
            <Label>Chỉ Số Mới (kWh)</Label>
            <Input
              className="mt-1 h-11"
              type="number"
              value={billData.electricityNew || ""}
              onChange={(e) =>
                updateField("electricityNew", Number(e.target.value))
              }
            />
            <p className="text-xs text-gray-500 mt-1">₫4,009/kWh</p>
          </div>

          <div>
            <Label>Chỉ Số Cũ (m³)</Label>
            <Input
              className="mt-1 h-11"
              type="number"
              value={billData.waterOld || ""}
              onChange={(e) => updateField("waterOld", Number(e.target.value))}
            />
            <p className="text-xs text-gray-500 mt-1">₫15,011/m³</p>
          </div>

          <div>
            <Label>Chỉ Số Mới (m³)</Label>
            <Input
              className="mt-1 h-11"
              type="number"
              value={billData.waterNew || ""}
              onChange={(e) => updateField("waterNew", Number(e.target.value))}
            />
            <p className="text-xs text-gray-500 mt-1">₫15,011/m³</p>
          </div>
        </div>

        <h2 className="text-[15px] font-semibold text-gray-700 mt-6">
          THANH TOÁN
        </h2>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <Label>Tiền Thuê Phòng *</Label>
            <Input
              className="mt-1 h-11"
              type="number"
              value={billData.rent || ""}
              onChange={(e) => updateField("rent", Number(e.target.value))}
            />
          </div>

          <div>
            <Label>Trạng Thái *</Label>
            <Select
              value={billData.status}
              onValueChange={(val) => updateField("status", val)}
            >
              <SelectTrigger className="h-11 mt-1">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem key="paid" value="paid">
                  Đã Thanh Toán
                </SelectItem>
                <SelectItem key="unpaid" value="unpaid">
                  Chưa Thanh Toán
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <h2 className="text-[15px] font-semibold text-gray-700 mt-6">
          GHI CHÚ
        </h2>

        <div className="mt-2">
          <textarea
            className="w-full min-h-[80px] px-3 py-2 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ghi chú thêm về hóa đơn..."
            value={billData.note || ""}
            onChange={(e) => updateField("note", e.target.value)}
          />
        </div>

        <div className="mt-6">
          <Button
            disabled={editLoading || createLoading}
            onClick={handleSubmit}
            className="w-full h-12"
          >
            {isEditing ? (
              editLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                "Lưu thay đổi"
              )
            ) : createLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang tạo...
              </>
            ) : (
              "Tạo hóa đơn"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
