import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ReusableTabs from "../../ui/ReusableTabs";
import ProfessionalOrderManagementTable from "../../ui/Tables/OrderManagement/ProfessionalOrderManagementTable";
import GearOrderManagementTable from "../../ui/Tables/OrderManagement/GearOrderManagementTable";
import CancleModal from "../../ui/Modal/CancleModal";
import AdminOrderManagementOverview from "../../Components/Dashboard/AdminOrderManagement/AdminOrderManagementOverview";

const AdminOrderManagement = () => {
  const deliveryManagementPhotographyData = Array.from({ length: 20 }).map(
    (_, index) => {
      const deliveryStatus =
        index % 3 === 0 ? "Completed" : index % 3 === 1 ? "Active" : "Canceled";

      return {
        orderId: index + 1,
        clientName: "Lívia Nováková",
        photographer_videographer: "Lívia Nováková",
        service: "Wedding Photography",
        orderType: "Direct",
        amount: "$200",
        deliveryDate: "24 May, 2025",
        location: "New York, USA",
        deliveryStatus,
      };
    }
  );

  const deliveryManagementGearData = Array.from({ length: 20 }).map(
    (_, index) => {
      const deliveryStatus =
        index % 3 === 0 ? "Completed" : index % 3 === 1 ? "Active" : "Canceled";

      return {
        orderId: index + 1,
        clientName: "Lívia Nováková",
        itemName: "Camera Lens",
        sellerName: "Lívia Nováková",
        category: "Photography Gear",
        amount: "$200",
        deliveryDate: "24 May, 2025",
        location: "New York, USA",
        deliveryStatus,
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

  const [showCancelPaymentModal, setShowCancelPaymentModal] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const showCancelModal = () => {
    setShowCancelPaymentModal(true);
  };

  const limit = 12;
  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          Order Management
        </p>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <AdminOrderManagementOverview />

      <ReusableTabs<"photographyVideography" | "gear">
        align="left"
        tabs={[
          {
            label: "Photography & Videography",
            value: "photographyVideography",
            content: (
              <ProfessionalOrderManagementTable
                data={tableData}
                loading={false}
                showCancleModal={showCancelModal}
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
              <GearOrderManagementTable
                data={tableData}
                loading={false}
                showCancleModal={showCancelModal}
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
      <CancleModal
        isCancleModalVisible={showCancelPaymentModal}
        handleCancleReq={() => setShowCancelPaymentModal(false)}
        handleCancel={() => setShowCancelPaymentModal(false)}
        currentRecord={null}
      />
    </div>
  );
};

export default AdminOrderManagement;
