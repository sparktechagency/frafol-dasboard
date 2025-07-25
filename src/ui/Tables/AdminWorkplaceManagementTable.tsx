/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Tooltip } from "antd";
import { MdDelete } from "react-icons/md";

// Define the type for the props
interface AdminWorkplaceManagementTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showDeleteModal: (record: any) => void; // Function to handle viewing payment details
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
}

const AdminWorkplaceManagementTable: React.FC<
  AdminWorkplaceManagementTableProps
> = ({ data, loading, setPage, showDeleteModal, page, total, limit }) => {
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Hosted By",
      dataIndex: "hostedBy",
      key: "hostedBy",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Location Type",
      dataIndex: "locationType",
      key: "locationType",
    },
    {
      title: "Location",
      dataIndex: "Location",
      key: "Location",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (status: string) => (
        <span style={{ color: status === "Completed" ? "green" : "orange" }}>
          {status}
        </span>
      ),
    },
    {
      title: "Participants",
      dataIndex: "Participants",
      key: "Participants",
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

export default AdminWorkplaceManagementTable;
