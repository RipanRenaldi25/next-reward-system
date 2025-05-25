"use client";
import { BasicTable } from "@/Components/BasicTable";
import { getUserHistory } from "@/utils/api/User";
import React, { useEffect, useState } from "react";

const HistoryPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchUserHistory = async () => {
      const { data, err, message } = await getUserHistory(
        localStorage.getItem("accessToken")
      );
      setData(data);
    };
    fetchUserHistory();
  }, []);
  return (
    <div className="bg-white rounded-lg p-4">
      <BasicTable data={data} />
    </div>
  );
};

export default HistoryPage;
