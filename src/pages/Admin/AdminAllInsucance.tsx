import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import { IInsurance } from "../../types";
import { useGetAllInsuranceQuery } from "../../redux/features/insurance/insuranceApi";
import AdminAllInsuranceTable from "../../ui/Tables/AdminAllInsuranceTable";
import ViewInsuranceModal from "../../ui/Modal/Insurance/ViewInsuranceModal";

const AdminAllInsucance = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const { data, isFetching } = useGetAllInsuranceQuery(
    {
      limit,
      page,
      searchTerm: searchText,
    },
    { refetchOnMountOrArgChange: true }
  );

  const allFeedback: IInsurance[] = data?.data || [];

  const total = data?.meta?.total || 0;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IInsurance | null>(null);

  const showViewUserModal = (record: IInsurance) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center py-2 mb-5">
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-base-color font-extrabold ">
          All Insurance
        </p>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <AdminAllInsuranceTable
        data={allFeedback}
        loading={isFetching}
        showViewModal={showViewUserModal}
        setPage={setPage}
        page={page}
        total={total}
        limit={limit}
      />
      <ViewInsuranceModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default AdminAllInsucance;
