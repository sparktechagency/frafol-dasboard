import React from "react";
import { Space, Tooltip } from "antd";
import ReuseTable from "../../utils/ReuseTable";
import { IFeedback } from "../../types";
import { formatDateTime } from "../../utils/dateFormet";
import ReuseButton from "../Button/ReuseButton";
import { GoEye } from "react-icons/go";

// Define the type for the props
interface InteractionCommunityForumTableProps {
  data: IFeedback[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: IFeedback) => void; // Function to handle viewing a user
  showApproveModal: (record: IFeedback) => void; // Function to handle Approveing a user
  showDeclineModal: (record: IFeedback) => void; // Function to handle Approveing a user
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const InteractionCommunityForumTable: React.FC<
  InteractionCommunityForumTableProps
> = ({
  data,
  loading,
  showViewModal,
  showApproveModal,
  showDeclineModal,
  setPage,
  page = 1,
  total = 0,
  limit,
}) => {
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
      dataIndex: "userId", // Assuming "userId" contains user info
      key: "userId",
      render: (_: unknown, record: IFeedback) =>
        `${record?.userId.name} ${record?.userId.sureName}`, // Render user name and surname
    },
    {
      title: "Role",
      dataIndex: "userId",
      key: "role",
      render: (_: unknown, record: IFeedback) => record?.userId.role, // Render the role from userId object
    },
    // {
    //   title: "Role",
    //   dataIndex: "userId",
    //   key: "switchRole",
    //   render: (_: unknown, record: IFeedback) => record?.userId.switchRole, // Render switchRole from userId
    // },
    {
      title: "Feedback",
      dataIndex: "text", // Assuming "text" is the issue or content
      key: "text",
      render: (text: string) => (
        <p>{text.length > 50 ? `${text.substring(0, 50)}...` : text}</p>
      ), // Truncate text if it's too long
    },
    {
      title: "Date",
      dataIndex: "createdAt", // Assuming "createdAt" is the date field
      key: "createdAt",
      render: (createdAt: string) => formatDateTime(createdAt), // Format date
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IFeedback) => (
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
          <Tooltip placement="right" title="Approve">
            <ReuseButton
              variant="secondary"
              className="bg-success border-succebg-success"
              onClick={() => showApproveModal(record)}
            >
              Approve
            </ReuseButton>
          </Tooltip>
          <Tooltip placement="right" title="Decline">
            <ReuseButton
              variant="secondary"
              className="bg-error border-error"
              onClick={() => showDeclineModal(record)}
            >
              Decline
            </ReuseButton>
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

export default InteractionCommunityForumTable;
