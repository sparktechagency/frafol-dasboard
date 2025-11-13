import React from "react";
import { Space, Tooltip } from "antd";
import ReuseTable from "../../utils/ReuseTable";
import { IInteractionCommunity } from "../../types";
import { formatDateTime } from "../../utils/dateFormet";
import { GoEye } from "react-icons/go";

// Define the type for the props
interface InteractionCommunityForumTableProps {
  data: IInteractionCommunity[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: IInteractionCommunity) => void; // Function to handle viewing a user
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const InteractionCommunityForumTable: React.FC<
  InteractionCommunityForumTableProps
> = ({ data, loading, showViewModal, setPage, page = 1, total = 0, limit }) => {
  const columns = [
    {
      title: "UID",
      dataIndex: "id",
      key: "id",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Name",
      dataIndex: "authorId", // Change from "userId" to "authorId"
      key: "authorId",
      render: (_: unknown, record: IInteractionCommunity) =>
        `${record?.authorId.name}`, // Render author name
    },
    {
      title: "Role",
      dataIndex: "authorId", // Change from "userId" to "authorId"
      key: "role",
      render: (_: unknown, record: IInteractionCommunity) =>
        record?.authorId.role || "N/A", // Render role from authorId
    },
    {
      title: "Title",
      dataIndex: "title", // Render the title from the record
      key: "title",
      render: (title: string) => <p>{title}</p>,
    },
    {
      title: "Content",
      dataIndex: "text", // Render content or feedback from the record
      key: "text",
      render: (text: string) => (
        <p>{text.length > 50 ? `${text.substring(0, 50)}...` : text}</p>
      ), // Truncate if the content is too long
    },
    {
      title: "Date",
      dataIndex: "createdAt", // Render the date createdAt from the record
      key: "createdAt",
      render: (createdAt: string) => formatDateTime(createdAt), // Use the formatDateTime function for formatting
    },
    {
      title: "Status",
      dataIndex: "approvalStatus", // Use approvalStatus from the record
      key: "approvalStatus",
      render: (approvalStatus: string) => (
        <span
          className={
            approvalStatus === "approved"
              ? "text-green-500"
              : approvalStatus === "rejected"
              ? "text-red-500"
              : "text-yellow-500"
          }
        >
          {approvalStatus.charAt(0).toUpperCase() + approvalStatus.slice(1)}
        </span>
      ), // Show the status with color coding for approved, pending, and rejected
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IInteractionCommunity) => (
        <Space size="middle">
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <GoEye style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
          {/* Approve Details Tooltip */}
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

export default InteractionCommunityForumTable;
