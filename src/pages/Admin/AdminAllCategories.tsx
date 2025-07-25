/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import DeleteModal from "../../ui/Modal/DeleteModal";
import ReuseButton from "../../ui/Button/ReuseButton";
import { AllImages } from "../../../public/images/AllImages";
import ReusableTabs from "../../ui/ReusableTabs";
import AdminPhotoCategoryTable from "../../ui/Tables/Category/AdminPhotoCategoryTable";
import AdminVideoCategoryTable from "../../ui/Tables/Category/AdminVideoCategoryModal";
import AdminGearCategoryTable from "../../ui/Tables/Category/AdminGearCategoryTable";
import AdminAddCategories from "../../ui/Modal/Categories/AdminAddCategories";
import AdminEditCategories from "../../ui/Modal/Categories/AdminEditCategories";

const AdminAllCategories = () => {
  const phtographyData = Array.from({ length: 20 }).map((_, index) => {
    return {
      id: index + 1,
      image: AllImages?.photo,
      title: `Wedding Photography`,
      subTitle: "Capture your special day",
    };
  });
  const videographyData = Array.from({ length: 20 }).map((_, index) => {
    return {
      id: index + 1,
      image: AllImages?.photo,
      title: `Wedding Videography`,
      subTitle: "Capture your special day",
    };
  });
  const gearData = Array.from({ length: 20 }).map((_, index) => {
    return {
      id: index + 1,
      title: `Camera`,
    };
  });

  const [activeTab, setActiveTab] = useState<
    "photography" | "videography" | "gear"
  >("photography");

  const limit = 12;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditwModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const showEditModal = (record: any) => {
    setCurrentRecord(record);
    setIsEditwModalVisible(true);
  };

  const showDeleteModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsEditwModalVisible(false);
    setCurrentRecord(null);
    setIsDeleteModalVisible(false);
    setIsAddModalVisible(false);
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          Categories
        </p>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <div className="flex justify-end mb-5 !w-fit ml-auto">
        <ReuseButton
          variant="secondary"
          className="!-w-fit"
          onClick={showAddModal}
        >
          Add Category
        </ReuseButton>
      </div>
      <ReusableTabs<"photography" | "videography" | "gear">
        align="left"
        tabs={[
          {
            label: "Photography",
            value: "photography",
            content: (
              <AdminPhotoCategoryTable
                data={phtographyData}
                loading={false}
                showEditModal={showEditModal}
                showDeleteModal={showDeleteModal}
                setPage={setPage}
                page={page}
                total={phtographyData.length}
                limit={limit}
              />
            ),
          },
          {
            label: "Videography",
            value: "videography",
            content: (
              <AdminVideoCategoryTable
                data={videographyData}
                loading={false}
                showEditModal={showEditModal}
                showDeleteModal={showDeleteModal}
                setPage={setPage}
                page={page}
                total={videographyData.length}
                limit={limit}
              />
            ),
          },
          {
            label: "Gear",
            value: "gear",
            content: (
              <AdminGearCategoryTable
                data={gearData}
                loading={false}
                showEditModal={showEditModal}
                showDeleteModal={showDeleteModal}
                setPage={setPage}
                page={page}
                total={gearData.length}
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

      <AdminAddCategories
        isAddModalVisible={isAddModalVisible}
        handleCancel={handleCancel}
        activeTab={activeTab}
      />
      <AdminEditCategories
        isEditModalVisible={isEditModalVisible}
        handleCancel={handleCancel}
        activeTab={activeTab}
        currentRecord={currentRecord}
      />
      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleCancel}
        handleDelete={(record) => {
          console.log("Delete record:", record);
          setIsDeleteModalVisible(false);
          setCurrentRecord(null);
        }}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default AdminAllCategories;
