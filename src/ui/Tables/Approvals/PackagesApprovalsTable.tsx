/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "../../../utils/ReuseTable";

// Define the type for the props
interface PackagesApprovalsTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewUserModal: (record: any) => void; // Function to handle viewing a user
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
}

const PackagesApprovalsTable: React.FC<PackagesApprovalsTableProps> = ({
  data,
  loading,
  showViewUserModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "UID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Photographer / Videographer",
      dataIndex: "photographerVideographer",
      key: "photographerVideographer",
    },
    { title: "Package Title", dataIndex: "packageTitle", key: "packageTitle" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Delivery Time", dataIndex: "deliveryTime", key: "deliveryTime" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
        <Space size="middle">
          {/* View Details Tooltip */}
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showViewUserModal(record)}
            >
              <GoEye style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
        </Space>
      ),
      align: "center",
    },
  ];

  return (
    <ReuseTable
      columns={columns}
      data={data}
      loading={loading}
      setPage={setPage}
      total={total}
      limit={limit}
      page={page}
      keyValue={"email"}
    />
  );
};

export default PackagesApprovalsTable;
