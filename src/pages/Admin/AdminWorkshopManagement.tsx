/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import DeleteModal from "../../ui/Modal/DeleteModal";
import AdminWorkplaceManagementTable from "../../ui/Tables/AdminWorkplaceManagementTable";
import {
  useDeleteWorkshopMutation,
  useGetAllWorkshopQuery,
} from "../../redux/features/workshop/workshopApi";
import { IWorkshop } from "../../types";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const AdminWorkshopManagement = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const limit = 12;
  const [deleteWorkshop] = useDeleteWorkshopMutation();

  const { data, isFetching } = useGetAllWorkshopQuery(
    {
      limit,
      page,
      searchTerm: searchText,
    },
    { refetchOnMountOrArgChange: true }
  );

  const workshopData: IWorkshop[] = data?.data?.result || [];

  const total = data?.data?.meta?.total || 0;

  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  console.log(searchText);

  const showDeleteModal = (record: IWorkshop) => {
    setCurrentRecord(record);
    setIsDeleteModal(true);
  };

  const handleCancel = () => {
    setIsDeleteModal(false);
    setCurrentRecord(null);
  };

  const handleDelete = async (data: IWorkshop) => {
    const res = await tryCatchWrapper(
      deleteWorkshop,
      {
        params: data._id,
      },
      "Deleting workshop..."
    );
    if (res?.success) {
      handleCancel();
    }
  };

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
        data={workshopData}
        loading={isFetching}
        showDeleteModal={showDeleteModal}
        setPage={setPage}
        page={page}
        total={total}
        limit={limit}
      />
      <DeleteModal<any>
        isDeleteModalVisible={isDeleteModal}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default AdminWorkshopManagement;
