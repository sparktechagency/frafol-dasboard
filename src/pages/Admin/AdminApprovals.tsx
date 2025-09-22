/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ReusableTabs from "../../ui/ReusableTabs";
import ProfessionalApprovalsTable from "../../ui/Tables/Approvals/ProfessionalApprovalsTable";
import PackagesApprovalsTable from "../../ui/Tables/Approvals/PackagesApprovalsTable";
import GearApprovalsTable from "../../ui/Tables/Approvals/GearApprovalsTable";
import WorkshopApprovalsTable from "../../ui/Tables/Approvals/WorkshopApprovalsTable";
import ApprovalsViewModal from "../../ui/Modal/Approvals/ApprovalsViewModal";
import {
  useApproveProfessionalMutation,
  useDeclineProfessionalMutation,
  useGetAllPendingProfessionalsQuery,
} from "../../redux/features/users/usersApi";
import { IProfessional } from "../../types";
import ApprovalModal from "../../ui/Modal/ApprovalModal";
import DeclineModal from "../../ui/Modal/DeclineModal";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
const AdminApprovals = () => {
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

  const [approveProfessional] = useApproveProfessionalMutation();
  const [declineProfessional] = useDeclineProfessionalMutation();

  const [activeTab, setActiveTab] = useState<
    "professionals" | "packages" | "gear" | "workshop"
  >("professionals");

  const limit = 12;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const { data: professional, isFetching: professionalFetching } =
    useGetAllPendingProfessionalsQuery(
      {
        page,
        limit,
        searchTerm: searchText,
      },
      { skip: activeTab !== "professionals", refetchOnMountOrArgChange: true }
    );

  const allProfessionals: IProfessional[] = professional?.data || [];
  const totalProfessionals: number = professional?.meta?.total || 0;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isDeclineModalVisible, setIsDeclineModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<IProfessional | null>(
    null
  );

  const showApproveModal = (record: IProfessional) => {
    setCurrentRecord(record);
    setIsApproveModalVisible(true);
  };

  const showDeclineModal = (record: IProfessional) => {
    setCurrentRecord(record);
    setIsDeclineModalVisible(true);
  };

  const showViewUserModal = (record: IProfessional) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsApproveModalVisible(false);
    setIsDeclineModalVisible(false);
    setCurrentRecord(null);
  };

  const handleApprove = async (record: IProfessional | null) => {
    const res = await tryCatchWrapper(
      approveProfessional,
      {
        params: record?._id,
      },
      "Approving..."
    );

    if (res?.statusCode === 200) {
      handleCancel();
    }
  };
  const handleDecline = async (record: IProfessional | null, value: any) => {
    const res = await tryCatchWrapper(
      declineProfessional,
      {
        params: record?._id,
        body: value,
      },
      "Declining..."
    );
    if (res?.statusCode === 200) {
      handleCancel();
    }
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
                data={allProfessionals}
                loading={professionalFetching}
                showViewUserModal={showViewUserModal}
                setPage={setPage}
                page={page}
                total={totalProfessionals}
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
          setSearchText(""); // Reset search when changing tabs
        }}
      />
      <ApprovalsViewModal
        isViewModalVisible={isViewModalVisible}
        showApproveModal={showApproveModal}
        showDeclineModal={showDeclineModal}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        activeTab={activeTab}
      />
      <ApprovalModal
        isApprovalModalVisible={isApproveModalVisible}
        handleCancel={() => setIsApproveModalVisible(false)}
        currentRecord={currentRecord}
        handleApprove={handleApprove}
      />
      <DeclineModal
        isDeclineModalVisible={isDeclineModalVisible}
        handleCancel={() => setIsDeclineModalVisible(false)}
        currentRecord={currentRecord}
        handleDecline={handleDecline}
      />
    </div>
  );
};

export default AdminApprovals;
