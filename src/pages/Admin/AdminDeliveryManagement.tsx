import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import AdminAllDeliveryManagementTable from "../../ui/Tables/AdminAllDeliveryManagementTable";
import DeliveryManagementMakePaymentModal from "../../ui/Modal/DeliveryManagement/DeliveryManagementMakePaymentModal";
import ReusableTabs from "../../ui/ReusableTabs";
import AdminGearDeliveryTable from "../../ui/Tables/AdminGearDeliveryTable";
import {
  useEverOrderMakePaymentMutation,
  useGearOrderMakePaymentMutation,
  useGetDeliveryManagementQuery,
} from "../../redux/features/deliveryManagement/deliveryManagementApi";
import { IDeliveryManagement } from "../../types/deliveryManagement.type";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const AdminDeliveryManagement = () => {
  const [activeTab, setActiveTab] = useState<"professional" | "gear">(
    "professional"
  );

  const [showViewPaymentModal, setShowViewPaymentModal] = useState(false);
  const [currentRecord, setCurrentRecord] =
    useState<IDeliveryManagement | null>(null);

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const limit = 12;

  const [everOrderMakePayment] = useEverOrderMakePaymentMutation();
  const [gearOrderMakePayment] = useGearOrderMakePaymentMutation();

  const { data, isFetching } = useGetDeliveryManagementQuery(
    {
      limit: limit,
      page,
      searchTerm: searchText,
      type: activeTab,
    },
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 600000
    }
  );

  const total = data?.data?.meta?.total || 0;

  const orders: IDeliveryManagement[] = data?.data?.orders || [];

  const showPayment = (record: IDeliveryManagement) => {
    setShowViewPaymentModal(true);
    setCurrentRecord(record);
  };

  const handleCancel = () => {
    setShowViewPaymentModal(false);
    setCurrentRecord(null);
  };

  const eventMakePayment = async () => {
    console.log(currentRecord);
    const res = await tryCatchWrapper(
      everOrderMakePayment,
      { params: currentRecord?._id },
      "Making payment..."
    );
    if (res?.success) {
      handleCancel();
    }
  };
  const gearMakePayment = async () => {
    console.log(currentRecord);
    const res = await tryCatchWrapper(
      gearOrderMakePayment,
      { params: currentRecord?._id },
      "Making payment..."
    );
    if (res?.success) {
      handleCancel();
    }
  };
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

      <ReusableTabs<"professional" | "gear">
        align="left"
        tabs={[
          {
            label: "Photography & Videography",
            value: "professional",
            content: (
              <AdminAllDeliveryManagementTable
                data={orders}
                loading={isFetching}
                showViewPaymentModal={showPayment}
                setPage={setPage}
                page={page}
                total={total}
                limit={limit}
              />
            ),
          },

          {
            label: "Gear",
            value: "gear",
            content: (
              <AdminGearDeliveryTable
                data={orders}
                loading={false}
                showViewPaymentModal={showPayment}
                setPage={setPage}
                page={page}
                total={total}
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
        handleCancel={handleCancel}
        currentRecord={currentRecord} // Replace with actual record if needed
        handlePayment={
          activeTab === "professional" ? eventMakePayment : gearMakePayment
        }
      />
    </div>
  );
};

export default AdminDeliveryManagement;
