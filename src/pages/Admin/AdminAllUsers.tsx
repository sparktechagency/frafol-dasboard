/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import AllUserTable from "../../ui/Tables/UserTable";
import UserModal from "../../ui/Modal/User/UserModal";
import BlockModal from "../../ui/Modal/BlockModal";
import UnblockModal from "../../ui/Modal/UnblockModal";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ReusableTabs from "../../ui/ReusableTabs";
import UserProfessionalTable from "../../ui/Tables/UserProfessionalTable";
import UserViewPortfolioModal from "../../ui/Modal/User/UserViewPortfolioModal";

const AdminAllUsers = () => {
  const photographerData = Array.from({ length: 20 }).map((_, index) => {
    const names = [
      "Lívia Nováková",
      "Mária Kováčová",
      "Jana Horváthová",
      "Petra Šimková",
      "Ivana Dvořáková",
      "Zuzana Blažková",
      "Anna Vargová",
      "Martina Fialová",
      "Lucia Novotná",
      "Barbora Krajčírová",
    ];

    const roles = [
      "Photographer",
      "Videographer",
      "Photographer &Videographer",
    ] as const;

    type RoleType = (typeof roles)[number];

    const specializations: Record<RoleType, string> = {
      Photographer: "Wedding Photographer",
      Videographer: "Wedding Videographer",
      "Photographer &Videographer":
        "Wedding Videographer/ Wedding Photographer",
    };

    const name = names[index % names.length];
    const role: RoleType = roles[index % roles.length];

    return {
      id: 1223 + index,
      name,
      role,
      specializations: specializations[role],
      joinDate: "24 May, 2025",
      orders: 30,
      gearOrders: 4,
      earnings: "$20000",
      workshops: 3,
      status: "Active",
    };
  });

  const clientData = Array.from({ length: 20 }).map((_, index) => {
    const clientNames = [
      "Kristína Černý",
      "Lucie Marešová",
      "Eva Bartošová",
      "Tereza Hrubá",
      "Alena Králová",
      "Jitka Malá",
      "Veronika Procházková",
      "Karolína Pavlíková",
      "Monika Urbanová",
      "Šárka Benešová",
    ];

    return {
      id: 1223 + index,
      name: clientNames[index % clientNames.length],
      role: "Client",
      joinDate: "24 May, 2025",
      photoVideoOrders: 2 + (index % 5), // varying between 2 and 6
      gearOrders: 20 + (index % 3), // varying between 20 and 22
      totalSpent: "$20000",
      workshopsJoined: 3,
      status: "Active",
    };
  });

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const limit = 12;

  const [activeTab, setActiveTab] = useState<"professional" | "client">(
    "professional"
  );

  const tableData =
    activeTab === "professional" ? photographerData : clientData;
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isViewProtfolioModalVisible, setIsViewProtfolioModalVisible] =
    useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showViewPortfolioModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewProtfolioModalVisible(true);
  };

  const showBlockModal = (record: any) => {
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };
  const showUnblockModal = (record: any) => {
    setCurrentRecord(record);
    setIsUnblockModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewProtfolioModalVisible(false);
    setIsViewModalVisible(false);
    setIsBlockModalVisible(false);
    setIsUnblockModalVisible(false);
    setCurrentRecord(null);
  };

  const handleBlock = (record: any) => {
    handleCancel();
    console.log(record);
  };
  const handleUnblock = (record: any) => {
    handleCancel();
    console.log(record);
  };
  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold mb-5">
          Users Management
        </p>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>

      <ReusableTabs<"professional" | "client">
        align="left"
        tabs={[
          {
            label: "Professionals",
            value: "professional",
            content: (
              <UserProfessionalTable
                data={tableData}
                loading={false}
                showViewModal={showViewUserModal}
                showBlockModal={showBlockModal}
                showUnblockModal={showUnblockModal}
                setPage={setPage}
                page={page}
                total={tableData.length}
                limit={limit}
              />
            ),
          },
          {
            label: "Clients",
            value: "client",
            content: (
              <AllUserTable
                data={tableData}
                loading={false}
                showViewModal={showViewUserModal}
                showBlockModal={showBlockModal}
                showUnblockModal={showUnblockModal}
                setPage={setPage}
                page={page}
                total={tableData.length}
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

      <UserModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        activeTab={activeTab}
        showViewPortfolioModal={showViewPortfolioModal}
      />
      <UserViewPortfolioModal
        isViewProtfolioModalVisible={isViewProtfolioModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <BlockModal
        isBlockModalVisible={isBlockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleBlock={handleBlock}
        description=" Are You Sure You want to Block This User ?"
      />
      <UnblockModal
        isUnblockModalVisible={isUnblockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleUnblock={handleUnblock}
        description=" Are You Sure You want to Unblock This User ?"
      />
    </div>
  );
};

export default AdminAllUsers;
