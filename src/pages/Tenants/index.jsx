import React from "react";
import AllTenantsTable from "@/components/AllTenantsTable";
import TenantsHeaderSection from "@/components/TenantsHeaderSection";
import CreateTenantsDialog from "@/components/CreateTenantsDialog";
import { useState, useEffect } from "react";
import {
  getDataTenants,
  getDataRooms,
  createTenant,
  deleteTenant,
  updateTenant,
} from "@/Service/api/tenants";
import toast from "react-hot-toast";

const Tenants = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [listTenants, setListTenants] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTenantId, setEditingTenantId] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    idCard: "",
    roomId: "",
    status: "active",
    moveInDate: "",
    moveOutDate: "",
    note: "",
  });

  const loadTenants = async () => {
    setLoading(true);
    try {
      const tenantsRes = await getDataTenants();
      const roomsRes = await getDataRooms();
      const tenants = tenantsRes.data?.data ?? [];
      const roomsList = roomsRes.data?.data ?? [];
      const merged = tenants.map((t) => {
        const tenantRoomId =
          typeof t.roomId === "object" ? t.roomId?._id : t.roomId;
        const foundRoom = roomsList.find((r) => r._id === tenantRoomId);
        return {
          ...t,
          roomInfo: foundRoom || null,
        };
      });
      setListTenants(merged);
      setRooms(roomsList);
    } catch (err) {
      console.error("Error fetching tenants:", err);
      toast.error("Failed to fetch tenants");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadTenants();
  }, []);

  const handleDeleteTenant = async (tenantId) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa người thuê này?"
    );
    if (!confirmDelete) return;
    setDeletingId(tenantId);
    try {
      await deleteTenant(tenantId);
      toast.success("Xóa người thuê thành công!");
      await loadTenants();
    } catch (err) {
      console.error("Delete tenant error:", err);
      toast.error("Không thể xóa người thuê!");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditTenant = (tenant) => {
    setIsEditing(true);
    setEditingTenantId(tenant._id);
    const tenantRoomId = typeof tenant.roomId === "object" ? tenant.roomId?._id : tenant.roomId;
    const roomIdValue = tenantRoomId || "UNASSIGNED";
    setForm({
      name: tenant.name || "",
      phone: tenant.phone || "",
      email: tenant.email || "",
      idCard: tenant.idCard || "",
      roomId: roomIdValue,
      status: tenant.status || "active",
      moveInDate: tenant.moveInDate || "",
      moveOutDate: tenant.moveOutDate || "",
      note: tenant.note || "",
    });
    setOpenDialog(true);
  };

  const handleUpdateTenant = async () => {
    try {
      setUpdateLoading(true);
      const payload = {
        name: form.name,
        phone: form.phone,
        email: form.email || "",
        idCard: form.idCard ? String(form.idCard) : "",
        note: form.note || "",
        status: form.status,
        moveInDate: form.moveInDate || "",
        moveOutDate: form.moveOutDate || "",
      };
      if (form.roomId && form.roomId !== "UNASSIGNED") {
        payload.roomId = form.roomId;
      }
      console.log("Updating tenant with payload:", payload);
      const response = await updateTenant(editingTenantId, payload);
      console.log("Response:", response);
      console.log("Response Data:", response?.data);
      toast.success("Cập nhật người thuê thành công!");
      setOpenDialog(false);
      setIsEditing(false);
      setEditingTenantId(null);
      setForm({
        name: "",
        phone: "",
        email: "",
        idCard: "",
        roomId: "",
        status: "active",
        moveInDate: "",
        moveOutDate: "",
        note: "",
      });
      loadTenants();
    } catch (err) {
      console.error("Update tenant error:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      const responseData = err.response?.data;
      let errorMessage = "Không thể cập nhật người thuê!";
      if (responseData?.error) {
        if (typeof responseData.error === 'string') {
          errorMessage = responseData.error;
        } else if (typeof responseData.error === 'object') {
          if (responseData.error.fieldErrors) {
            const fieldErrors = responseData.error.fieldErrors;
            const messages = [];
            for (const key in fieldErrors) {
              messages.push(`${key}: ${fieldErrors[key].join(', ')}`);
            }
            if (messages.length > 0) errorMessage = messages.join('; ');
            else errorMessage = JSON.stringify(responseData.error);
          } else {
            errorMessage = JSON.stringify(responseData.error);
          }
        }
      } else if (responseData?.message) {
        errorMessage = responseData.message;
      } else if (responseData?.errors?.fieldErrors) {
        const fieldErrors = responseData.errors.fieldErrors;
        const errorMessages = [];
        for (const [field, messages] of Object.entries(fieldErrors)) {
          errorMessages.push(...messages);
        }
        if (errorMessages.length > 0) {
          errorMessage = errorMessages.join(", ");
        }
      }
      toast.error(errorMessage);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleCreateTenant = async () => {
    try {
      setLoading(true);
      const payload = {
        name: form.name,
        phone: form.phone,
        email: form.email || "",
        idCard: form.idCard ? String(form.idCard) : "",
        note: form.note || "",
        status: form.status,
        moveInDate: form.moveInDate || "",
        moveOutDate: form.moveOutDate || "",
      };
      if (form.roomId && form.roomId !== "UNASSIGNED") {
        payload.roomId = form.roomId;
      }
      console.log("Creating tenant with payload:", payload);
      const response = await createTenant(payload);
      console.log("Response:", response);
      console.log("Response Data:", response?.data);
      toast.success("Tạo người thuê thành công!");
      setOpenDialog(false);
      setForm({
        name: "",
        phone: "",
        email: "",
        idCard: "",
        roomId: "",
        status: "active",
        moveInDate: "",
        moveOutDate: "",
        note: "",
      });
      loadTenants();
    } catch (err) {
      console.error("Create tenant error:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      const responseData = err.response?.data;
      let errorMessage = "Không thể tạo người thuê!";
      if (responseData?.error) {
        if (typeof responseData.error === 'string') {
          errorMessage = responseData.error;
        } else if (typeof responseData.error === 'object') {
          if (responseData.error.fieldErrors) {
            const fieldErrors = responseData.error.fieldErrors;
            const messages = [];
            for (const key in fieldErrors) {
              messages.push(`${key}: ${fieldErrors[key].join(', ')}`);
            }
            if (messages.length > 0) errorMessage = messages.join('; ');
            else errorMessage = JSON.stringify(responseData.error);
          } else {
            errorMessage = JSON.stringify(responseData.error);
          }
        }
      } else if (responseData?.message) {
        errorMessage = responseData.message;
      } else if (responseData?.errors?.fieldErrors) {
        const fieldErrors = responseData.errors.fieldErrors;
        const errorMessages = [];

        for (const [field, messages] of Object.entries(fieldErrors)) {
          errorMessages.push(...messages);
        }

        if (errorMessages.length > 0) {
          errorMessage = errorMessages.join(", ");
        }
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const filteredTenants = listTenants.filter((tenant) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = tenant.name?.toLowerCase().includes(term);
    const phoneMatch = String(tenant.phone || "").includes(term);
    return nameMatch || phoneMatch;
  });

  return (
    <div>
      <TenantsHeaderSection
        onOpenDialog={() => setOpenDialog(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <AllTenantsTable
        listTenants={filteredTenants}
        loading={loading}
        onDeleteTenant={handleDeleteTenant}
        onEditTenant={handleEditTenant}
        deletingId={deletingId}
      />
      <CreateTenantsDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setIsEditing(false);
          setEditingTenantId(null);
          setForm({
            name: "",
            phone: "",
            email: "",
            idCard: "",
            roomId: "",
            status: "active",
            moveInDate: "",
            moveOutDate: "",
            note: "",
          });
        }}
        form={form}
        rooms={rooms}
        onChangeForm={(field, value) =>
          setForm((prev) => ({ ...prev, [field]: value }))
        }
        handleCreateTenant={handleCreateTenant}
        isEditing={isEditing}
        handleUpdateTenant={handleUpdateTenant}
        updateLoading={updateLoading}
      />
    </div>
  );
};

export default Tenants;
