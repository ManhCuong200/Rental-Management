import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function BillsManagement({
  bills,
  loading,
  formatNumber,
  computeTotal,
  onCreateBillClick,
  onDeleteBill,
  handleEditBill,
  loadingDelete,
  deleteBillId,
}) {
  return (
    <main className="flex-1 overflow-y-auto p-4 lg:p-3">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Bills Management</h1>
          <p className="text-gray-600 mt-1">Track and manage rental bills</p>
        </div>
        <Button
          onClick={() => onCreateBillClick()}
          className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white rounded-xl cursor-pointer"
        >
          <Plus size={18} /> Create Bill
        </Button>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>All Bills</CardTitle>
        </CardHeader>

        <CardContent className="border rounded-xl px-6 pb-4 overflow-hidden">
          <div className="grid grid-cols-8 bg-gray-50 border-b py-4 px-6 font-semibold text-[17px] text-gray-700">
            <div>Tenant</div>
            <div>Room</div>
            <div>Month</div>
            <div className="col-span-2">Breakdown</div>
            <div>Total</div>
            <div>Status</div>
            <div className="text-center">Actions</div>
          </div>

          {loading ? (
            <div className="h-[200px] flex items-center justify-center">
              <Spinner className="h-8 w-8 text-gray-500" />
            </div>
          ) : bills.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No bills found.</div>
          ) : (
            bills.map((bill) => {
              const id = bill._id || bill.id;
              const tenantName =
                bill.tenant?.name || bill.tenantId?.name || bill.tenant || "-";
              const roomName =
                bill.room?.name || bill.roomId?.name || bill.room || "-";
              const month = bill.month;
              const total = bill.total ?? computeTotal(bill);
              return (
                <div
                  key={id}
                  className="grid grid-cols-8 items-center border-b py-4 px-6 text-[16px] hover:bg-gray-50 transition"
                >
                  <div>{tenantName}</div>
                  <div>{roomName}</div>
                  <div>{month}</div>
                  <div className="col-span-2 text-gray-600 leading-5 text-sm">
                    Electricity: ₫
                    {formatNumber(
                      bill.electricityPrice ?? bill.electricity ?? 0
                    )}{" "}
                    <br />
                    Water: ₫{formatNumber(
                      bill.waterPrice ?? bill.water ?? 0
                    )}{" "}
                    <br />
                    Internet: ₫{formatNumber(bill.internetFee ?? 0)} <br />
                    Rent: ₫{formatNumber(bill.rent ?? 0)}
                  </div>
                  <div className="font-semibold">₫{formatNumber(total)}</div>
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${bill.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      {bill.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <Pencil
                      size={20}
                      onClick={() => handleEditBill(bill)}
                      className="text-blue-600 cursor-pointer hover:scale-110 transition"
                    />

                    {loadingDelete && deleteBillId === id ? (
                      <Spinner className="w-5 h-5 text-red-600 animate-spin" />
                    ) : (
                      <Trash2
                        onClick={() => onDeleteBill(id)}
                        size={20}
                        className="text-red-600 cursor-pointer hover:scale-110 transition"
                      />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </main>
  );
}
