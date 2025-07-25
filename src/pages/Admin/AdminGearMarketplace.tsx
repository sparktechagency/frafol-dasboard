/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import DeleteModal from "../../ui/Modal/DeleteModal";
import AdminGearMarketplaceTable from "../../ui/Tables/AdminGearMarketplaceTable";

const AdminGearMarketplacePage = () => {
  const gearMarketplaceData = Array.from({ length: 20 }).map((_, index) => {
    const status = index % 2 === 0 ? "In Stock" : "Out of Stock";

    return {
      orderId: index + 1,
      sellerName: "Lívia Nováková",
      product: "Wedding Photography",
      category: "Lívia Nováková",
      amount: "$200",
      status: status,
      preferredShipping: "DHL",
    };
  });

  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const showDeleteModal = () => {
    setIsDeleteModal(true);
    setCurrentRecord({ userId: "12345", name: "Sample Record" });
  };

  const limit = 12;
  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          Gear Marketplace
        </p>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>

      <AdminGearMarketplaceTable
        data={gearMarketplaceData}
        loading={false}
        showDeleteModal={showDeleteModal}
        setPage={setPage}
        page={page}
        total={gearMarketplaceData.length}
        limit={limit}
      />
      <DeleteModal<any>
        isDeleteModalVisible={isDeleteModal}
        handleCancel={() => setIsDeleteModal(false)}
        currentRecord={currentRecord}
        handleDelete={(data) => {
          console.log("Deleting:", data);
          setIsDeleteModal(false);
        }}
      />
    </div>
  );
};

export default AdminGearMarketplacePage;
