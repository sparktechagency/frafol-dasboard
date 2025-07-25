/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ReusableTabs from "../../ui/ReusableTabs";
import ProfessionalApprovalsTable from "../../ui/Tables/Approvals/ProfessionalApprovalsTable";
import PackagesApprovalsTable from "../../ui/Tables/Approvals/PackagesApprovalsTable";
import GearApprovalsTable from "../../ui/Tables/Approvals/GearApprovalsTable";
import WorkshopApprovalsTable from "../../ui/Tables/Approvals/WorkshopApprovalsTable";
import UserViewPortfolioModal from "../../ui/Modal/User/UserViewPortfolioModal";
import ApprovalsViewModal from "../../ui/Modal/Approvals/ApprovalsViewModal";
const AdminApprovals = () => {
  const professionalData = Array.from({ length: 20 }).map((_, index) => {
    return {
      id: index + 1,
      name: `Jhon Doe`,
      email: `j@j.com`,
      role: `Photographer`,
      specialization: `Wedding Photography`,
      hourlyRate: `$50`,
      location: `New York, USA`,
    };
  });
  const packageData = Array.from({ length: 20 }).map((_, index) => {
    return {
      id: index + 1,
      photographerVideographer: `Jhon Doe`,
      packageTitle: `Wedding Videography`,
      price: `$5000`,
      deliveryTime: `3 days`,
      duration: `3 hours`,
      category: "Wedding Photography",
    };
  });
  const gearData = Array.from({ length: 20 }).map((_, index) => {
    return {
      id: index + 1,
      sellername: "Lívia Nováková",
      productName: "Nikon DSLR Camera ",
      category: "Camera",
      condition: "New",
      shippingCompany: "FedEx",
      price: "$5000",
    };
  });
  const workshopData = Array.from({ length: 20 }).map((_, index) => {
    return {
      id: index + 1,
      title: "Photography for Beginners",
      hostName: "Lívia Nováková",
      date: "03/03/2023",
      locationType: "Offline",
      location: "Marek Novák",
      status: "Completed",
      participants: "20",
    };
  });

  const [activeTab, setActiveTab] = useState<
    "professionals" | "packages" | "gear" | "workshop"
  >("professionals");

  const limit = 12;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isViewProtfolioModalVisible, setIsViewPortfolioModalVisible] =
    useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showViewPortfolioModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewPortfolioModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsViewPortfolioModalVisible(false);
    setCurrentRecord(null);
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          Approvals
        </p>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>

      <ReusableTabs<"professionals" | "packages" | "gear" | "workshop">
        align="left"
        tabs={[
          {
            label: "Photographer/Videographer",
            value: "professionals",
            content: (
              <ProfessionalApprovalsTable
                data={professionalData}
                loading={false}
                showViewUserModal={showViewUserModal}
                showViewPortfolioModal={showViewPortfolioModal}
                setPage={setPage}
                page={page}
                total={professionalData.length}
                limit={limit}
              />
            ),
          },
          {
            label: "Packages",
            value: "packages",
            content: (
              <PackagesApprovalsTable
                data={packageData}
                loading={false}
                showViewUserModal={showViewUserModal}
                setPage={setPage}
                page={page}
                total={packageData.length}
                limit={limit}
              />
            ),
          },
          {
            label: "Gear",
            value: "gear",
            content: (
              <GearApprovalsTable
                data={gearData}
                loading={false}
                showViewUserModal={showViewUserModal}
                setPage={setPage}
                page={page}
                total={gearData.length}
                limit={limit}
              />
            ),
          },
          {
            label: "Workshop",
            value: "workshop",
            content: (
              <WorkshopApprovalsTable
                data={workshopData}
                loading={false}
                showViewUserModal={showViewUserModal}
                setPage={setPage}
                page={page}
                total={workshopData.length}
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
      <ApprovalsViewModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        activeTab={activeTab}
      />

      <UserViewPortfolioModal
        isViewProtfolioModalVisible={isViewProtfolioModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default AdminApprovals;
