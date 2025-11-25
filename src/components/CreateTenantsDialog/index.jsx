import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function CreateTenantDialog({
  open,
  onClose,
  form,
  rooms = [],
  onChangeForm,
  handleCreateTenant,
  isEditing = false,
  handleUpdateTenant,
  updateLoading = false,
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto px-6 py-6 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {isEditing ? "Chỉnh Sửa Thông Tin" : "Thêm Người Thuê Mới"}
          </DialogTitle>
        </DialogHeader>

        {/* THÔNG TIN CƠ BẢN */}
        <div className="mt-6">
          <h3 className="text-[15px] font-semibold mb-3">THÔNG TIN CƠ BẢN</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Họ và Tên *</Label>
              <Input
                value={form.name}
                onChange={(e) => onChangeForm("name", e.target.value)}
                placeholder="Nguyễn Văn A"
                className="rounded-xl mt-1"
              />
            </div>

            <div>
              <Label>Số Điện Thoại *</Label>
              <Input
                value={form.phone}
                onChange={(e) => onChangeForm("phone", e.target.value)}
                placeholder="0987654321"
                className="rounded-xl mt-1"
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                value={form.email}
                onChange={(e) => onChangeForm("email", e.target.value)}
                placeholder="example@email.com"
                className="rounded-xl mt-1"
              />
            </div>

            <div>
              <Label>CMND/CCCD *</Label>
              <Input
                value={form.idCard}
                onChange={(e) => onChangeForm("idCard", e.target.value)}
                placeholder="079123456789"
                className="rounded-xl mt-1"
              />
            </div>
          </div>
        </div>

        {/* PHÒNG & TRẠNG THÁI */}
        <div className="mt-8">
          <h3 className="text-[15px] font-semibold mb-3">PHÒNG & TRẠNG THÁI</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Phòng</Label>
              <Select
                value={form.roomId || "UNASSIGNED"}
                onValueChange={(value) => onChangeForm("roomId", value)}
              >
                <SelectTrigger className="rounded-xl mt-1">
                  <SelectValue placeholder="Chưa gán phòng" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="UNASSIGNED">Chưa gán phòng</SelectItem>

                  {rooms.map((room) => {
                    const isOccupied = room.status === "occupied" || room.currentTenant;
                    return (
                      <SelectItem
                        key={room._id}
                        value={room._id}
                        disabled={isOccupied}
                      >
                        {room.name} {isOccupied ? "(Đã có người thuê)" : "(Trống)"}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Trạng Thái</Label>
              <Select
                value={form.status}
                onValueChange={(value) => onChangeForm("status", value)}
              >
                <SelectTrigger className="rounded-xl mt-1">
                  <SelectValue placeholder="Đang Thuê" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="active">Đang Thuê</SelectItem>
                  <SelectItem value="moved_out">Đã Trả Phòng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* NGÀY THÁNG */}
        <div className="mt-8">
          <h3 className="text-[15px] font-semibold mb-3">NGÀY THÁNG</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Ngày Vào Ở</Label>
              <Input
                type="date"
                value={form.moveInDate ? form.moveInDate.split('T')[0] : ''}
                onChange={(e) => onChangeForm("moveInDate", e.target.value)}
                className="rounded-xl mt-1"
              />
            </div>

            <div>
              <Label>Ngày Trả Phòng</Label>
              <Input
                type="date"
                value={form.moveOutDate ? form.moveOutDate.split('T')[0] : ''}
                onChange={(e) => onChangeForm("moveOutDate", e.target.value)}
                className="rounded-xl mt-1"
              />
            </div>
          </div>
        </div>

        {/* GHI CHÚ */}
        <div className="mt-8">
          <h3 className="text-[15px] font-semibold mb-3">GHI CHÚ</h3>
          <Textarea
            value={form.note}
            onChange={(e) => onChangeForm("note", e.target.value)}
            className="rounded-xl min-h-[90px]"
            placeholder="Ghi chú thêm về người thuê..."
          />
        </div>

        {/* BUTTON */}
        <div className="mt-10">
          <Button
            onClick={() => isEditing ? handleUpdateTenant() : handleCreateTenant()}
            disabled={isEditing ? updateLoading : false}
            className="w-full py-5 text-base bg-black hover:bg-gray-800 rounded-xl"
          >
            {isEditing ? (
              updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang cập nhật...
                </>
              ) : (
                "Cập Nhật Thông Tin"
              )
            ) : (
              "Thêm Người Thuê"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
