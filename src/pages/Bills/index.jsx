import React, { useEffect, useState } from "react";
import BillsManagement from "@/components/BillsManagementUi";
import CreateBillsDialog from "@/components/CreateBillsDialog";
import {
  getDataBills,
  createBills,
  deleteBills,
  getTenants,
  getRooms,
  updateBills,
} from "@/Service/api/bills";
import { toast } from "react-hot-toast";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tenants, setTenants] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteBillId, setDeleteBillId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editBillId, setEditBillId] = useState(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [billData, setBillData] = useState({
    tenantId: "",
    roomId: "",
    month: "",
    electricityOld: 0,
    electricityNew: 0,
    waterOld: 0,
    waterNew: 0,
  });

  const formatNumber = (num) => Number(num ?? 0).toLocaleString("vi-VN");
  const computeTotal = (bill) => {
    const electricity = Number(bill.electricity ?? 0);
    const water = Number(bill.water ?? 0);
    const internet = Number(bill.internet ?? 0);
    const rent = Number(bill.rent ?? 0);
    return electricity + water + internet + rent;
  };

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [billRes, tenantRes, roomRes] = await Promise.all([
        getDataBills(),
        getTenants(),
        getRooms(),
      ]);
      let billData = billRes?.data ?? billRes;
      if (Array.isArray(billData?.data)) billData = billData.data;
      if (Array.isArray(billData?.bills)) billData = billData.bills;
      setBills(Array.isArray(billData) ? billData : []);
      let tenantData = tenantRes?.data ?? tenantRes;
      if (Array.isArray(tenantData?.data)) tenantData = tenantData.data;
      setTenants(Array.isArray(tenantData) ? tenantData : []);
      let roomData = roomRes?.data ?? roomRes;
      if (Array.isArray(roomData?.data)) roomData = roomData.data;
      setRooms(Array.isArray(roomData) ? roomData : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleCreateBillSubmit = async () => {
    setCreateLoading(true);
    try {
      if (!billData.tenantId || !billData.roomId || !billData.month) {
        toast.error("Please fill in all required fields");
        return;
      }
      const payload = {
        tenantId: billData.tenantId,
        roomId: billData.roomId,
        month: billData.month,
        oldElectricityIndex: billData.electricityOld,
        newElectricityIndex: billData.electricityNew,
        oldWaterIndex: billData.waterOld,
        newWaterIndex: billData.waterNew,
        electricityPrice: 3000,
        waterPrice: 15000,
        rent: 2500000,
        internetFee: 100000,
        cleaningFee: 50000,
      };

      console.log("Request Payload:", payload);
      const response = await createBills(payload);
      console.log("Response:", response);
      console.log("Response Data:", response?.data);

      toast.success("Bill created successfully");

      setDialogOpen(false);
      setBillData({
        tenantId: "",
        roomId: "",
        month: "",
        electricityOld: 0,
        electricityNew: 0,
        waterOld: 0,
        waterNew: 0,
      });
      await fetchAll();
    } catch (err) {
      console.log("Backend error:", err.response?.data);
      toast.error(err.response?.data?.message || "Failed to create bill");
    } finally {
      setCreateLoading(false);
    }
  };

  const handleDeleteBill = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bill?"
    );
    if (!confirmDelete) return;
    setDeleteBillId(id);
    try {
      setLoadingDelete(true);
      await deleteBills(id);
      toast.success("Bill deleted");
      await fetchAll();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete bill");
    } finally {
      setDeleteBillId(null);
      setLoadingDelete(false);
    }
  };

  const handleEditBill = (data) => {
    try {
      if (!data) {
        toast.error("Invalid bill data");
        return;
      }
      setIsEditing(true);
      setEditBillId(data._id);
      const bill = bills.find((b) => b._id === data._id);
      if (!bill) {
        toast.error("Bill not found in list");
        return;
      }
      setBillData({
        tenantId: data.tenantId?._id ?? null,
        roomId: data.roomId?._id ?? null,
        month: data.month || "",
        electricityOld: data.oldElectricityIndex || 0,
        electricityNew: data.newElectricityIndex || 0,
        waterOld: data.oldWaterIndex || 0,
        waterNew: data.newWaterIndex || 0,
        rent: data.rent || 0,
        status: data.status || "",
        note: data.note || "",
      });

      setDialogOpen(true);
    } catch (err) {
      console.error("Error while editing bill:", err);
      toast.error("Failed to load bill data for editing");
    }
  };

  const handleUpdateBillSubmit = async () => {
    try {
      setEditLoading(true);
      if (!editBillId) {
        toast.error("No bill selected for update");
        return;
      }

      if (!billData.tenantId || !billData.roomId || !billData.month) {
        toast.error("Please fill in all required fields");
        return;
      }

      const payload = {
        tenantId: billData.tenantId,
        roomId: billData.roomId,
        month: billData.month,
        oldElectricityIndex: Number(billData.electricityOld),
        newElectricityIndex: Number(billData.electricityNew),
        oldWaterIndex: Number(billData.waterOld),
        newWaterIndex: Number(billData.waterNew),
        electricityPrice: 3000,
        waterPrice: 15000,
        rent: Number(billData.rent) || 2500000,
        internetFee: 100000,
        cleaningFee: 50000,
        status: billData.status,
        note: billData.note || "",
      };

      await updateBills(editBillId, payload);
      toast.success("Bill updated successfully");
      setDialogOpen(false);
      setIsEditing(false);
      setEditBillId(null);
      await fetchAll();
    } catch (err) {
      console.log("Backend error:", err.response?.data);
    } finally {
      setEditLoading(false);
    }
  };

  const handleCreateBillClick = () => {
    setIsEditing(false);
    setEditBillId(null);
    setBillData({
      tenantId: "",
      roomId: "",
      month: "",
      electricityOld: 0,
      electricityNew: 0,
      waterOld: 0,
      waterNew: 0,
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setIsEditing(false);
    setEditBillId(null);
    setBillData({
      tenantId: "",
      roomId: "",
      month: "",
      electricityOld: 0,
      electricityNew: 0,
      waterOld: 0,
      waterNew: 0,
    });
  };

  return (
    <div>
      <BillsManagement
        bills={bills}
        rooms={rooms}
        loading={loading}
        computeTotal={computeTotal}
        formatNumber={formatNumber}
        onCreateBillClick={handleCreateBillClick}
        onDeleteBill={handleDeleteBill}
        handleEditBill={handleEditBill}
        deleteBillId={deleteBillId}
        loadingDelete={loadingDelete}
      />

      <CreateBillsDialog
        editBillId={editBillId}
        tenants={tenants}
        rooms={rooms}
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleCreateBillSubmit}
        billData={billData}
        setBillData={setBillData}
        isEditing={isEditing}
        loading={loading}
        onUpdateSubmit={handleUpdateBillSubmit}
        editLoading={editLoading}
        createLoading={createLoading}
        loadingDelete={loadingDelete}
      />
    </div>
  );
};

export default Bills;
