/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Switch, Tag, Tooltip } from "antd";
import { MdDelete, MdEdit } from "react-icons/md";
import ReuseTable from "../../utils/ReuseTable";

// Define the type for the props
interface AdminCouponTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showEditModal: (record: any) => void; // Function to handle viewing a user
  showDeleteModal: (record: any) => void; // Function to handle viewing a user
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const AdminCouponTable: React.FC<AdminCouponTableProps> = ({
  data,
  loading,
  showEditModal,
  showDeleteModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (value: number) => `€${value}`,
    },
    {
      title: "Min Spend",
      dataIndex: "minSpend",
      key: "minSpend",
      render: (value: number) => `€${value}`,
    },
    {
      title: "Usage",
      dataIndex: "usage",
      key: "usage",
      render: (_: any, record: any) => (
        <span>{`${record.used}/${record.limit}`}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "";
        switch (status.toLowerCase()) {
          case "active":
            color = "green";
            break;
          case "expired":
            color = "red";
            break;
          case "inactive":
            color = "gray";
            break;
          default:
            color = "blue";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Expiry",
      dataIndex: "expiry",
      key: "expiry",
      render: (value: string) => value || "No Expiry",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (value: boolean, record: any) => (
        <Switch
          checked={value}
          onChange={(checked) => console.log(record, checked)}
        />
      ),
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
        <Space size="middle">
          {/* View Details Tooltip */}
          <Tooltip placement="right" title="Edit">
            <button
              className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
              onClick={() => showEditModal(record)}
            >
              <MdEdit style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
          <Tooltip placement="right" title="Delete">
            <button
              className="!p-0 !bg-transparent !border-none !text-error cursor-pointer"
              onClick={() => showDeleteModal(record)}
            >
              <MdDelete style={{ fontSize: "24px" }} />
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
      keyValue={"id"}
    />
  );
};

export default AdminCouponTable;
