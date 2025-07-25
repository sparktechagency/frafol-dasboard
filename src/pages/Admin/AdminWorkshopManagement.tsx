/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import DeleteModal from "../../ui/Modal/DeleteModal";
import AdminWorkplaceManagementTable from "../../ui/Tables/AdminWorkplaceManagementTable";

const AdminWorkshopManagement = () => {
  const workshopManagementData = Array.from({ length: 20 }).map((_, index) => {
    return {
      orderId: index + 1,
      title: "Photography For Beginners",
      hostedBy: "Lívia Nováková",
      date: "June 22, 2025",
      locationType: "Offline",
      Location: "Marek Novák",
      Status: "Completed",
      Participants: "20",
    };
  });

  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const showDeleteModal = () => {
    setCurrentRecord({ userId: "12345", name: "Sample Record" });
    setIsDeleteModal(true);
  };

  const limit = 12;
  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          Workshop Management
        </p>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>

      <AdminWorkplaceManagementTable
        data={workshopManagementData}
        loading={false}
        showDeleteModal={showDeleteModal}
        setPage={setPage}
        page={page}
        total={workshopManagementData.length}
        limit={limit}
      />
      <DeleteModal<any>
        isDeleteModalVisible={isDeleteModal}
        handleCancel={() => setIsDeleteModal(false)}
        currentRecord={currentRecord}
        handleDelete={(record) => {
          console.log("Deleting:", record);
          setIsDeleteModal(false);
        }}
      />
    </div>
  );
};

export default AdminWorkshopManagement;
