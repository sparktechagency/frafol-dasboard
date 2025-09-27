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
import { IGear, IPackage, IProfessional } from "../../types";
import ApprovalModal from "../../ui/Modal/ApprovalModal";
import DeclineModal from "../../ui/Modal/DeclineModal";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import {
  useGetAllPendingGearQuery,
  useUpdateGearApprovalStatusMutation,
} from "../../redux/features/gear/gearApi";
import { Form } from "antd";
import {
  useGetAllPendingPackageQuery,
  useUpdatePackageApprovalStatusMutation,
} from "../../redux/features/package/packageApi";
const AdminApprovals = () => {
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
  const limit = 12;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState<
    "professionals" | "packages" | "gear" | "workshop"
  >("professionals");
  const [form] = Form.useForm();

  const [approveProfessional] = useApproveProfessionalMutation();
  const [declineProfessional] = useDeclineProfessionalMutation();
  const [updateGearApproval] = useUpdateGearApprovalStatusMutation();
  const [updatePackageApproval] = useUpdatePackageApprovalStatusMutation();

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

  const { data: packages, isFetching: packageFetching } =
    useGetAllPendingPackageQuery(
      {
        page,
        limit,
        searchTerm: searchText,
      },
      { skip: activeTab !== "packages", refetchOnMountOrArgChange: true }
    );

  const allpackage: IPackage[] = packages?.data?.result || [];
  const totalPackage: number = packages?.data?.meta?.total || 0;

  const { data: gear, isFetching: gearFetching } = useGetAllPendingGearQuery(
    {
      page,
      limit,
      searchTerm: searchText,
    },
    { skip: activeTab !== "gear", refetchOnMountOrArgChange: true }
  );

  const allGear: IGear[] = gear?.data || [];
  const totalGear: number = gear?.meta?.total || 0;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isDeclineModalVisible, setIsDeclineModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<
    IProfessional | IPackage | IGear | null
  >(null);

  const showApproveModal = (record: IProfessional | IPackage | IGear) => {
    setCurrentRecord(record);
    setIsApproveModalVisible(true);
  };

  const showDeclineModal = (record: IProfessional | IPackage | IGear) => {
    setCurrentRecord(record);
    setIsDeclineModalVisible(true);
  };

  const showViewUserModal = (record: IProfessional | IPackage | IGear) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsApproveModalVisible(false);
    setIsDeclineModalVisible(false);
    setCurrentRecord(null);
  };

  const handleApprove = async (
    record: IProfessional | IPackage | IGear | null
  ) => {
    if (activeTab === "professionals") {
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
    } else if (activeTab === "packages") {
      const res = await tryCatchWrapper(
        updatePackageApproval,
        {
          params: record?._id,
          body: { approvalStatus: "approved" },
        },
        "Approving..."
      );

      if (res?.statusCode === 200) {
        handleCancel();
      }
    } else if (activeTab === "gear") {
      const res = await tryCatchWrapper(
        updateGearApproval,
        {
          params: record?._id,
          body: { approvalStatus: "approved" },
        },
        "Approving..."
      );

      if (res?.statusCode === 200) {
        handleCancel();
      }
    }
  };
  const handleDecline = async (record: IProfessional | null, value: any) => {
    if (activeTab === "professionals") {
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
    } else if (activeTab === "packages") {
      const res = await tryCatchWrapper(
        updatePackageApproval,
        {
          params: record?._id,
          body: { approvalStatus: "cancelled", ...value },
        },
        "Declining..."
      );
      if (res?.statusCode === 200) {
        handleCancel();
      }
    } else if (activeTab === "gear") {
      const res = await tryCatchWrapper(
        updateGearApproval,
        {
          params: record?._id,
          body: { approvalStatus: "cancelled", ...value },
        },
        "Declining..."
      );
      if (res?.statusCode === 200) {
        handleCancel();
      }
    }
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          Approvals
        </p>
        <Form form={form} className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </Form>
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
                data={allpackage}
                loading={packageFetching}
                showViewUserModal={showViewUserModal}
                setPage={setPage}
                page={page}
                total={totalPackage}
                limit={limit}
              />
            ),
          },
          {
            label: "Gear",
            value: "gear",
            content: (
              <GearApprovalsTable
                data={allGear}
                loading={gearFetching}
                showViewUserModal={showViewUserModal}
                setPage={setPage}
                page={page}
                total={totalGear}
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
          setPage(1);
          setSearchText("");
          form.resetFields();
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
