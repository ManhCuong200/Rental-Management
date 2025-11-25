import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function AllRoomsTable({
  loading,
  onDelete,
  onEdit,
  listRooms,
  filterStatus,
  deleteRoomId,
}) {
  return (
    <Card className="rounded-2xl shadow-sm mt-8">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">All Rooms</CardTitle>
      </CardHeader>

      <CardContent className="border rounded-xl px-7 pb-6 overflow-hidden">
        <div className="grid grid-cols-4 bg-gray-50 border-b py-4 px-6 font-semibold text-[17px]">
          <div>Name</div>
          <div>Price</div>
          <div className="text-center">Status</div>
          <div className="text-center">Actions</div>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-32">
            <Spinner />
          </div>
        )}

        {!loading &&
          (filterStatus
            ? listRooms.filter((room) => room.status === filterStatus)
            : listRooms
          ).length === 0 && (
            <div className="flex items-center justify-center h-40 text-gray-500">
              <p className="text-lg">No rooms found</p>
            </div>
          )}

        {!loading &&
          (filterStatus
            ? listRooms.filter((room) => room.status === filterStatus)
            : listRooms
          ).map((room, index) => (
            <div
              key={room._id ?? index}
              className="grid grid-cols-4 items-center border-b py-4 px-6 text-[16px] hover:bg-gray-50 transition"
            >
              <div>{room.name}</div>
              <div>{room.price}</div>

              <div className="flex justify-center">
                <Badge
                  className={`
                    px-3 py-[6px] rounded-full text-[15px]
                    ${room.status === "available"
                      ? "bg-green-100 text-green-700"
                      : room.status === "occupied"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >
                  {room.status === "available"
                    ? "Còn Trống"
                    : room.status === "occupied"
                      ? "Đã Thuê"
                      : "Bảo Trì"}
                </Badge>
              </div>

              <div className="flex justify-center gap-4">
                <Pencil
                  size={20}
                  onClick={() => onEdit?.(room)}
                  className="text-blue-600 cursor-pointer hover:scale-110 transition"
                />

                {deleteRoomId === room._id ? (
                  <Spinner className="text-red-600 w-5 h-5" />
                ) : (
                  <Trash2
                    onClick={() => onDelete?.(room._id)}
                    size={20}
                    className="text-red-600 cursor-pointer hover:scale-110 transition"
                  />
                )}
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
