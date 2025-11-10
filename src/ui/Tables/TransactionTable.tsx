/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "../../utils/ReuseTable";
import { ITransaction } from "../../types";

// Define the type for the props
interface TransactionTableProps {
  data: ITransaction[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: ITransaction) => void; // Function to handle viewing a user
  setPage: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  data,
  loading,
  showViewModal,
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
      render: (_: any, __: any, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Client Name",
      dataIndex: ["userId", "name"],
      key: "clientName",
      render: (_: any, record: ITransaction) => record?.userId?.name,
    },
    {
      title: "Professional Name",
      dataIndex: ["serviceProviderId", "name"],
      key: "serviceProviderId",
      render: (_: any, record: ITransaction) => record?.serviceProviderId?.name,
    },
    {
      title: "Method",
      dataIndex: "paymentMethod",
      key: "method",
      render: (_: any, record: ITransaction) => record?.paymentMethod,
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Commission Amount",
      dataIndex: "commission",
      key: "commissionAmount",
      render: (_: any, record: ITransaction) => `$${record?.commission}`,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (_: any, record: ITransaction) =>
        new Date(record?.createdAt).toLocaleString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: ITransaction) => (
        <Space size="middle">
          {/* View Details Tooltip */}
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
              onClick={() => showViewModal(record)}
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

export default TransactionTable;
