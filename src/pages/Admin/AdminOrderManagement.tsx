/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ReusableTabs from "../../ui/ReusableTabs";
import ProfessionalOrderManagementTable from "../../ui/Tables/OrderManagement/ProfessionalOrderManagementTable";
import GearOrderManagementTable from "../../ui/Tables/OrderManagement/GearOrderManagementTable";
import AdminOrderManagementOverview from "../../Components/Dashboard/AdminOrderManagement/AdminOrderManagementOverview";
import {
  useCancelOrderMutation,
  useGetAllOrderManagementQuery,
} from "../../redux/features/orderManagement/orderManagementApi";
import { IEventOrder } from "../../types";
import ViewOrderManagementModal from "../../ui/Modal/OrderManagement/ViewOrderManagementModal";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import CancelModalWithReason from "../../ui/Modal/CancelModalWithReason";

const AdminOrderManagement = () => {
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

  const [cancelOrder] = useCancelOrderMutation();

  const [activeTab, setActiveTab] = useState<"photographyVideography" | "gear">(
    "photographyVideography"
  );
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const limit = 12;

  const { data, isFetching } = useGetAllOrderManagementQuery(
    {
      limit,
      page,
      searchTerm: searchText,
    },
    { refetchOnMountOrArgChange: true }
  );

  const eventOrder: IEventOrder[] = data?.data || [];
  const totalEventOrder = data?.meta?.total || 0;

  console.log(eventOrder);

  const tableData =
    activeTab === "photographyVideography"
      ? eventOrder
      : deliveryManagementGearData;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [showCancelPaymentModal, setShowCancelPaymentModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IEventOrder | null>(null);

  const showViewModal = (record: IEventOrder) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showCancelModal = (record: IEventOrder) => {
    setShowCancelPaymentModal(true);
    setCurrentRecord(record);
  };

  const handleCancel = () => {
    setCurrentRecord(null);
    setShowCancelPaymentModal(false);
    setIsViewModalVisible(false);
  };

  const handleCancelOrder = async (values: any, data: IEventOrder) => {
    const res = await tryCatchWrapper(
      cancelOrder,
      { body: values, params: data?._id },
      "Cancelling order..."
    );
    if (res?.success) {
      handleCancel();
    }
  };

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
                data={eventOrder}
                loading={isFetching}
                showViewModal={showViewModal}
                showCancleModal={showCancelModal}
                setPage={setPage}
                page={page}
                total={totalEventOrder}
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
      <ViewOrderManagementModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <CancelModalWithReason
        isCancelModalWithReasonVisible={showCancelPaymentModal}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleCancelOrder={handleCancelOrder}
      />
    </div>
  );
};

export default AdminOrderManagement;
