import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import AdminAllDeliveryManagementTable from "../../ui/Tables/AdminAllDeliveryManagementTable";
import DeliveryManagementMakePaymentModal from "../../ui/Modal/DeliveryManagement/DeliveryManagementMakePaymentModal";
import ReusableTabs from "../../ui/ReusableTabs";
import AdminGearDeliveryTable from "../../ui/Tables/AdminGearDeliveryTable";

const AdminDeliveryManagement = () => {
  const deliveryManagementPhotographyData = Array.from({ length: 20 }).map(
    (_, index) => {
      const deliveryStatus =
        index % 3 === 0
          ? "Delivered"
          : index % 3 === 1
          ? "In Progress"
          : "Pending";

      const paymentStatus =
        deliveryStatus === "Pending"
          ? "Unpaid"
          : deliveryStatus === "In Progress"
          ? "Unpaid"
          : "Paid";

      return {
        orderId: index + 1,
        clientName: "Lívia Nováková",
        service: "Wedding Photography",
        photographer_videographer: "Lívia Nováková",
        orderType: "Direct",
        amount: "$200",
        deliveryDate: "24 May, 2025",
        deliveryStatus,
        paymentStatus,
      };
    }
  );

  const deliveryManagementGearData = Array.from({ length: 20 }).map(
    (_, index) => {
      const deliveryStatus =
        index % 3 === 0
          ? "Delivered"
          : index % 3 === 1
          ? "In Progress"
          : "Pending";

      const paymentStatus =
        deliveryStatus === "Pending"
          ? "Unpaid"
          : deliveryStatus === "In Progress"
          ? "Unpaid"
          : "Paid";

      return {
        orderId: index + 1,
        clientName: "Lívia Nováková",
        itemName: "Camera Lens",
        sellerName: "Lívia Nováková",
        amount: "$200",
        deliveryDate: "24 May, 2025",
        deliveryStatus,
        paymentStatus,
      };
    }
  );

  const [activeTab, setActiveTab] = useState<"photographyVideography" | "gear">(
    "photographyVideography"
  );

  const tableData =
    activeTab === "photographyVideography"
      ? deliveryManagementPhotographyData
      : deliveryManagementGearData;

  const [showViewPaymentModal, setShowViewPaymentModal] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const showPayment = () => {
    setShowViewPaymentModal(true);
  };

  const limit = 12;
  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          Delivery Management
        </p>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>

      <ReusableTabs<"photographyVideography" | "gear">
        align="left"
        tabs={[
          {
            label: "Photography & Videography",
            value: "photographyVideography",
            content: (
              <AdminAllDeliveryManagementTable
                data={tableData}
                loading={false}
                showViewPaymentModal={showPayment}
                setPage={setPage}
                page={page}
                total={tableData.length}
                limit={limit}
              />
            ),
          },

          {
            label: "Gear",
            value: "gear",
            content: (
              <AdminGearDeliveryTable
                data={tableData}
                loading={false}
                showViewPaymentModal={showPayment}
                setPage={setPage}
                page={page}
                total={tableData.length}
                limit={limit}
              />
            ),
          },
        ]}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setPage(1); // Reset page when changing tabs
        }}
      />

      <DeliveryManagementMakePaymentModal
        isModalVisible={showViewPaymentModal}
        handleCancel={() => setShowViewPaymentModal(false)}
        currentRecord={null} // Replace with actual record if needed
        handlePayment={() => {
          // Handle payment logic here
          setShowViewPaymentModal(false);
        }}
      />
    </div>
  );
};

export default AdminDeliveryManagement;
