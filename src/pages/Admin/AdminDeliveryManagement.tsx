import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import AdminAllDeliveryManagementTable from "../../ui/Tables/AdminAllDeliveryManagementTable";
import DeliveryManagementMakePaymentModal from "../../ui/Modal/DeliveryManagement/DeliveryManagementMakePaymentModal";
import ReusableTabs from "../../ui/ReusableTabs";
import AdminGearDeliveryTable from "../../ui/Tables/AdminGearDeliveryTable";
import { useGetDeliveryManagementQuery } from "../../redux/features/deliveryManagement/deliveryManagementApi";
import { IDeliveryManagement } from "../../types/deliveryManagement.type";

const AdminDeliveryManagement = () => {
  const [activeTab, setActiveTab] = useState<"professional" | "gear">(
    "professional"
  );

  const [showViewPaymentModal, setShowViewPaymentModal] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const { data, isFetching } = useGetDeliveryManagementQuery(
    {
      limit: 12,
      page,
      searchTerm: searchText,
      type: activeTab,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  console.log(data);

  const total = data?.data?.meta?.total || 0;

  const orders: IDeliveryManagement[] = data?.data?.orders || [];
  console.log(orders);

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
