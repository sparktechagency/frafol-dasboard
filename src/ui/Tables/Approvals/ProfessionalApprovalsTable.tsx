/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "../../../utils/ReuseTable";
import ReuseButton from "../../Button/ReuseButton";

// Define the type for the props
interface ProfessionalApprovalsTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewUserModal: (record: any) => void; // Function to handle viewing a user
  showViewPortfolioModal: (record: any) => void; // Function to handle blocking a user
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
}

const ProfessionalApprovalsTable: React.FC<ProfessionalApprovalsTableProps> = ({
  data,
  loading,
  showViewUserModal,
  showViewPortfolioModal,
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
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Specialization",
      dataIndex: "specialization",
      key: "specialization",
    },
    {
      title: "Protfolio",
      dataIndex: "p",
      key: "p",
      render: () => (
        <ReuseButton
          onClick={showViewPortfolioModal}
          variant="secondary"
          className="!text-sm !py-2 !px-4"
        >
          View
        </ReuseButton>
      ),
    },
    { title: "Hourly Rate", dataIndex: "hourlyRate", key: "hourlyRate" },
    { title: "Location", dataIndex: "location", key: "location" },
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

export default ProfessionalApprovalsTable;
