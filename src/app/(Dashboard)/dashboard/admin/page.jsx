"use client";
import { DataTable } from "@/Components/DataTable/DataTable";
import columns from "@/Components/DataTable/columns";
import { acceptReward, getAllUploads, reject } from "@/utils/api/User";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { Modal } from "@/Components/Modal";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchUploads = async () => {
      const { data, err } = await getAllUploads();
      if (err) {
        toast.error(err);
        return;
      }
      const sortedData = data.sort((a, b) => {
        if (a.status === "pending" && b.status !== "pending") return -1;
        if (a.status !== "pending" && b.status === "pending") return 1;
        return 0;
      });
      setData(sortedData);
    };
    fetchUploads();
  }, []);
  const [row, setRow] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  const onView = (data) => {
    setRow(data);
    setIsOpen(true);
  };

  const onAccept = async (data) => {
    const { err, message } = await acceptReward(data);
    if (err) {
      toast.error(err);
      return;
    }
    setData((prevValue) =>
      prevValue.map((val) => ({
        ...val,
        status: val.id === data.id ? "approved" : val.status,
      }))
    );
    toast.success(message);
  };

  const onReject = async (data) => {
    const { err, message } = await reject(data);
    if (err) {
      toast.error(err);
      return;
    }
    setData((prevValue) =>
      prevValue.map((val) => ({
        ...val,
        status: val.id === data.id ? "rejected" : val.status,
      }))
    );
    toast.error(message);
  };
  console.log({ row });
  return (
    <div className="bg-white p-4 rounded-lg">
      <DataTable columns={columns(onView, onAccept, onReject)} data={data} />
      <Modal isOpen={isOpen} onClose={onClose} title={"Bukti"}>
        {!!row && row.imageUrl && (
          <img src={`http://localhost:3000/${row.imageUrl}`} />
        )}
      </Modal>
    </div>
  );
};

export default AdminDashboard;
