/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../../ui/Form/ReuseSearchInput";
import InteractionCommunityForumTable from "../../../ui/Tables/InteractionCommunityForumTable";
import ApprovalModal from "../../../ui/Modal/ApprovalModal";
import DeclineModal from "../../../ui/Modal/DeclineModal";

const InteractionCommunityForum = () => {
  const limit = 12;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const total = 0;

  const payments: any = [];

  console.log(payments);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isDeclineModalVisible, setIsDeclineModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  console.log(searchText, isViewModalVisible);

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showApproveUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsApproveModalVisible(true);
  };

  const showDeclineUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeclineModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsApproveModalVisible(false);
    setIsDeclineModalVisible(false);
    setCurrentRecord(null);
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          Community Forum
        </p>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <InteractionCommunityForumTable
        data={payments}
        loading={false}
        showApproveModal={showApproveUserModal}
        showDeclineModal={showDeclineUserModal}
        showViewModal={showViewUserModal}
        setPage={setPage}
        page={page}
        total={total}
        limit={limit}
      />
      <ApprovalModal
        isApprovalModalVisible={isApproveModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleApprove={() => {}}
      />
      <DeclineModal
        isDeclineModalVisible={isDeclineModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleDecline={() => {}}
      />
    </div>
  );
};

export default InteractionCommunityForum;
