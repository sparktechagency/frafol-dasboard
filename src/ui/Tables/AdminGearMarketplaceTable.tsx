/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Tooltip } from "antd";
import { MdDelete } from "react-icons/md";

// Define the type for the props
interface AdminGearMarketplaceTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showDeleteModal: (record: any) => void; // Function to handle viewing payment details
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
}

const AdminGearMarketplaceTable: React.FC<AdminGearMarketplaceTableProps> = ({
  data,
  loading,
  setPage,
  showDeleteModal,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Seller Name",
      dataIndex: "sellerName",
      key: "sellerName",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string) => (
        <span style={{ color: text === "In Stock" ? "green" : "red" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Preferred Shipping",
      dataIndex: "preferredShipping",
      key: "preferredShipping",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
        <div>
          <Tooltip placement="right" title="Delete">
            <button
              className="!p-0 !bg-transparent !border-none !text-error-color"
              onClick={() => showDeleteModal(record)}
            >
              <MdDelete
                className="!text-secondary-color cursor-pointer"
                style={{ fontSize: "24px" }}
              />
            </button>
          </Tooltip>
        </div>
      ),
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
      keyValue={"orderId"}
    />
  );
};

export default AdminGearMarketplaceTable;
