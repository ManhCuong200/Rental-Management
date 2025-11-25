import React from "react";
import AllRoomsTable from "@/components/AllRoomsTable";
import { getRooms, deleteRoom, createRoom, updateRoom } from "@/Service/api/rooms";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import CreateRoomDialog from "@/components/CreateRoomDialog";
import RoomsHeaderSection from "@/components/RoomsHeaderSection";

const Rooms = () => {
  const [loading, setLoading] = useState(false);
  const [listRooms, setListRooms] = useState([]);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [deleteRoomId, setDeleteRoomId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newRoom, setNewRoom] = useState({
    name: "",
    price: "",
    status: "available",
    description: "",
  });

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setIsEditing(false);
    setEditingRoomId(null);
    setNewRoom({
      name: "",
      price: "",
      status: "available",
      description: "",
    });
  };

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const res = await getRooms();
      const rooms = Array.isArray(res?.data?.data) ? res.data.data : [];
      setListRooms(rooms);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDeleteRooms = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );
    if (!confirmDelete) return;
    setDeleteRoomId(id);
    try {
      await deleteRoom(id);
      toast.success("Room deleted successfully!");
      await fetchRooms();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete room");
    } finally {
      setDeleteRoomId(null);
    }
  };

  const handleCreateRoom = async () => {
    try {
      setLoadingCreate(true);
      const payload = {
        name: newRoom.name,
        price: Number(newRoom.price),
        status: newRoom.status,
        description: newRoom.description,
        images: [],
      };
      console.log("Payload gửi lên:", payload);
      await createRoom(payload);
      toast.success("Room created successfully!");
      handleCloseDialog();
      await fetchRooms();
      await fetchRooms();
    } catch (err) {
      console.error(err);
      const responseData = err.response?.data;
      let errorMessage = "Failed to create room";
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
      }
      toast.error(errorMessage);
    } finally {
      setLoadingCreate(false);
    }
  };

  const handleEditRoom = (room) => {
    setIsEditing(true);
    setEditingRoomId(room._id);
    setNewRoom({
      name: room.name,
      price: room.price,
      status: room.status,
      description: room.description || "",
    });
    setDialogOpen(true);
  };

  const handleUpdateRoom = async () => {
    try {
      setLoadingCreate(true);
      const payload = {
        name: newRoom.name,
        price: Number(newRoom.price),
        status: newRoom.status,
        description: newRoom.description,
        images: [],
      };
      console.log("Payload update:", payload);
      await updateRoom(editingRoomId, payload);
      toast.success("Room updated successfully!");
      handleCloseDialog();
      await fetchRooms();
    } catch (err) {
      console.error(err);
      const responseData = err.response?.data;
      let errorMessage = "Failed to update room";
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
      }
      toast.error(errorMessage);
    } finally {
      setLoadingCreate(false);
    }
  };

  const filteredRooms = listRooms.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <RoomsHeaderSection
        handleOpenDialog={handleOpenDialog}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <AllRoomsTable
        loading={loading}
        listRooms={filteredRooms}
        onDelete={handleDeleteRooms}
        onEdit={handleEditRoom}
        deleteRoomId={deleteRoomId}
      />
      <CreateRoomDialog
        open={dialogOpen}
        onOpenChange={handleCloseDialog}
        formData={newRoom}
        setFormData={setNewRoom}
        handleCreateRoom={handleCreateRoom}
        handleUpdateRoom={handleUpdateRoom}
        isEdit={isEditing}
        loading={loadingCreate}
      />
    </div>
  );
};

export default Rooms;
