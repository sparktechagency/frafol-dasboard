/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Tooltip } from "antd";
import ReuseTable from "../../../utils/ReuseTable";
import { MdOutlineCancel } from "react-icons/md";

// Define the type for the props
interface ProfessionalOrderManagementTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showCancleModal: (record: any) => void; // Function to handle viewing payment details
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
}

const ProfessionalOrderManagementTable: React.FC<
  ProfessionalOrderManagementTableProps
> = ({ data, loading, setPage, showCancleModal, page, total, limit }) => {
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
    },
    {
      title: "Photographer/Videographer",
      dataIndex: "photographer_videographer",
      key: "photographer_videographer",
    },
    {
      title: "Order Type",
      dataIndex: "orderType",
      key: "orderType",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Delivery Date",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Delivery Status",
      dataIndex: "deliveryStatus",
      key: "deliveryStatus",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
        <div>
          <Tooltip placement="right" title="Cancle">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showCancleModal(record)}
            >
              <MdOutlineCancel style={{ fontSize: "24px" }} />
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

export default ProfessionalOrderManagementTable;
