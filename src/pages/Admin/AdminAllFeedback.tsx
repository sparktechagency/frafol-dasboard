/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ReportsTable from "../../ui/Tables/ReportsTable";
import AdminViewReviewModal from "../../ui/Modal/Review/AdminViewReviewModal";

const AdminAllFeedback = () => {
  const allReportsData = Array.from({ length: 20 }).map((_, index) => {
    return {
      id: index + 1,
      name: "Lívia Nováková",
      role: "Photographer",
      issue: `The upload speed is painfully slow, making it impossible...`,
      date: new Date().toLocaleDateString(),
    };
  });
  const limit = 12;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          Reports
        </p>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <ReportsTable
        data={allReportsData}
        loading={false}
        showViewModal={showViewUserModal}
        setPage={setPage}
        page={page}
        total={allReportsData.length}
        limit={limit}
      />
      <AdminViewReviewModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default AdminAllFeedback;
