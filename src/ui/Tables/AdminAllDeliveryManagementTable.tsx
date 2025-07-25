/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Tooltip } from "antd";
import ReuseButton from "../Button/ReuseButton";

// Define the type for the props
interface AdminAllDeliveryManagementTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewPaymentModal: () => void; // Function to handle viewing payment details
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
}

const AdminAllDeliveryManagementTable: React.FC<
  AdminAllDeliveryManagementTableProps
> = ({ data, loading, setPage, showViewPaymentModal, page, total, limit }) => {
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
      title: "Delivery Status",
      dataIndex: "deliveryStatus",
      key: "deliveryStatus",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (text: string) => (
        <span
          className={`${
            text === "Paid" ? "text-success" : "text-error"
          } font-semibold`}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
        <div>
          {record?.paymentStatus === "Paid" ? (
            <Tooltip placement="right" title="View Details">
              <ReuseButton
                variant="secondary"
                className="!p-0 !bg-warning !border-none !text-primary-color cursor-pointer !w-full !text-sm"
                onClick={() => showViewPaymentModal()}
              >
                Make Payment
              </ReuseButton>
            </Tooltip>
          ) : (
            <Tooltip placement="right" title="View Details">
              <ReuseButton
                variant="outline"
                className="!p-0  !border !border-success !text-success !cursor-default !w-full !text-sm"
              >
                Paid
              </ReuseButton>
            </Tooltip>
          )}
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

export default AdminAllDeliveryManagementTable;
