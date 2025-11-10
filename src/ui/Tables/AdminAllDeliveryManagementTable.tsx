import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Tooltip } from "antd";
import ReuseButton from "../Button/ReuseButton";
import { IDeliveryManagement } from "../../types/deliveryManagement.type";

// Define the type for the props
interface AdminAllDeliveryManagementTableProps {
  data: IDeliveryManagement[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewPaymentModal: () => void; // Function to handle viewing payment details
  setPage: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const AdminAllDeliveryManagementTable: React.FC<
  AdminAllDeliveryManagementTableProps
> = ({ data, loading, setPage, showViewPaymentModal, page, total, limit }) => {
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Client Name",
      dataIndex: "userId",
      key: "clientName",
      render: (_: unknown, record: IDeliveryManagement) =>
        record?.userId?.name || "N/A",
    },
    {
      title: "Photographer/Videographer",
      dataIndex: "serviceProviderId",
      key: "photographer_videographer",
      render: (_: unknown, record: IDeliveryManagement) =>
        record?.serviceProviderId?.name || "N/A",
    },
    {
      title: "Order Type",
      dataIndex: "orderType",
      key: "orderType",
      render: (text: string) => text.charAt(0).toUpperCase() + text.slice(1),
    },
    {
      title: "Amount",
      dataIndex: "totalPrice",
      key: "amount",
      render: (amount: number) => `$${amount}`,
    },
    {
      title: "Delivery Date",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString() : "N/A",
    },
    {
      title: "Delivery Status",
      dataIndex: "status",
      key: "deliveryStatus",
      render: (status: string) => (
        <span
          className={`${
            status === "delivered" ? "text-success" : "text-warning"
          } font-semibold`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      ),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status: string) => (
        <span
          className={`${
            status === "Paid" ? "text-success" : "text-error"
          } font-semibold`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IDeliveryManagement) => (
        <div>
          {record?.paymentStatus === "Unpaid" ? (
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
