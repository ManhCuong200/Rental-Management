import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function AllTenantsTable({ listTenants, loading, onDeleteTenant, onEditTenant, deletingId }) {
  return (
    <Card className="rounded-2xl shadow-sm mt-8">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">All Tenants</CardTitle>
      </CardHeader>

      <CardContent className="border rounded-xl px-6 pb-4 overflow-hidden">
        <div className="grid grid-cols-5 bg-gray-50 border-b py-4 px-6 font-semibold text-[17px]">
          <div>Name</div>
          <div>Phone</div>
          <div>ID Card</div>
          <div className="text-center">Room</div>
          <div className="text-center">Actions</div>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-40">
            <Spinner />
          </div>
        )}

        {listTenants.length === 0 && !loading ? (
          <div className="text-center py-10 text-gray-500">No tenants found</div>
        ) : (
          listTenants.map((tenant) => (
            <div
              key={tenant._id}
              className="grid grid-cols-5 items-center border-b py-4 px-6 text-[16px] hover:bg-gray-50 transition"
            >
              <div>{tenant.name}</div>
              <div>{tenant.phone}</div>
              <div>{tenant.idCard || ""}</div>
              <div className="flex justify-center">
                {tenant.roomInfo?.name ? (
                  <Badge className="bg-green-100 text-green-700">
                    {tenant.roomInfo.name}
                  </Badge>
                ) : (
                  <Badge className="bg-gray-200 text-gray-700">Unassigned</Badge>
                )}
              </div>
              <div className="flex justify-center gap-4">
                <Pencil
                  size={20}
                  onClick={() => onEditTenant(tenant)}
                  className="text-blue-600 cursor-pointer hover:scale-110 transition"
                />
                {deletingId === tenant._id ? (
                  <Spinner className="w-5 h-5 text-red-600 animate-spin" />
                ) : (
                  <Trash2
                    size={20}
                    onClick={() => onDeleteTenant(tenant._id)}
                    className="text-red-600 cursor-pointer hover:scale-110 transition"
                  />
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
