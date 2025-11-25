import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

export default function CreateRoomDialog({
  open,
  onOpenChange,
  formData,
  setFormData,
  handleCreateRoom,
  handleUpdateRoom,
  isEdit = false,
  loading = false,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl rounded-2xl p-6 md:p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {isEdit ? "Cập Nhật Phòng" : "Tạo Phòng Mới"}
          </DialogTitle>
        </DialogHeader>

        <Separator className="my-2" />

        <div className="space-y-6 mt-4">
          <div className="space-y-1.5">
            <Label className="font-medium">Tên Phòng *</Label>
            <Input
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="VD: Phòng 101"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="font-medium">Giá Thuê/Tháng *</Label>
              <Input
                value={formData.price || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, price: value || 0 });
                }}
                type="number"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-medium">Trạng Thái *</Label>

              <Select
                value={formData.status || ""}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Còn Trống</SelectItem>
                  <SelectItem value="occupied">Đã Thuê</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-1.5">
            <Label className="font-medium">Mô Tả</Label>
            <Textarea
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Mô tả về phòng..."
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            onClick={isEdit ? handleUpdateRoom : handleCreateRoom}
            disabled={loading}
            className="w-full bg-black text-white hover:bg-gray-900 py-5 text-md rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && <Spinner className="inline-block mr-2" />}
            {isEdit
              ? loading
                ? "Đang cập nhật..."
                : "Cập Nhật Phòng"
              : loading
                ? "Đang tạo..."
                : "Tạo Phòng Mới"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
