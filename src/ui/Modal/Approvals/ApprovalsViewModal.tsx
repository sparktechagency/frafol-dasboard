/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { AllImages } from "../../../../public/images/AllImages";
import { Modal } from "antd";
import ReuseButton from "../../Button/ReuseButton";
import { IoCalendarOutline } from "react-icons/io5";
import { LuClock } from "react-icons/lu";
import { BsCurrencyDollar } from "react-icons/bs";
import { IGear, IProfessional } from "../../../types";
import ViewWorkshop from "./ViewWorkshop";
import ViewGear from "./ViewGear";
import ViewProfessional from "./ViewProfessional";

// InitialValues

interface ApprovalsViewModalProps {
  isViewModalVisible: boolean;
  showApproveModal: (record: any) => void;
  showDeclineModal: (record: any) => void;
  handleCancel: () => void;
  currentRecord: IProfessional | IGear | null;
  activeTab: string;
}

const PackageView = () => {
  return (
    <div className="p-1.5 rounded-xl border border-background-color mt-10">
      <img
        width={1000}
        height={1000}
        src={AllImages?.photo}
        alt="workspace"
        className="w-full h-60 sm:h-40 lg:h-52 xl:h-60 object-cover rounded-lg "
      />
      <div className="px-1">
        <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold mt-3">
          Destination Wedding Photography
        </p>

        <p className="text-xs sm:text-sm lg:text-base mt-1.5">
          Capture your wedding in a stunning location with intimate and unique
          shots.
        </p>

        <div className="flex flex-col gap-1 mt-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              <BsCurrencyDollar className="text-secondary-color text-sm sm:text-base lg:text-lg" />
              <p className="text-xs sm:text-sm lg:text-base font-semibold">
                Price:
              </p>
            </div>
            <p className="text-xs sm:text-sm lg:text-base">$1900</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              <LuClock className="text-secondary-color text-sm sm:text-base lg:text-lg" />
              <p className="text-xs sm:text-sm lg:text-base font-semibold">
                Duration:
              </p>
            </div>
            <p className="text-xs sm:text-sm lg:text-base">8 hours </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              <IoCalendarOutline className="text-secondary-color text-sm sm:text-base lg:text-lg" />
              <p className="text-xs sm:text-sm lg:text-base font-semibold">
                Delivery Time:
              </p>
            </div>
            <p className="text-xs sm:text-sm lg:text-base">3 Weeks</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-5">
          <ReuseButton
            variant="secondary"
            className="!bg-success !border-success"
          >
            Approve
          </ReuseButton>
          <ReuseButton variant="secondary">Decline</ReuseButton>
        </div>
      </div>
    </div>
  );
};

const ApprovalsViewModal: React.FC<ApprovalsViewModalProps> = ({
  isViewModalVisible,
  showApproveModal,
  showDeclineModal,
  handleCancel,
  currentRecord,
  activeTab,
}) => {
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className={`${activeTab === "gear" ? "lg:!w-[1000px]" : "lg:!w-[700px]"}`}
    >
      {activeTab === "professionals" ? (
        <ViewProfessional
          showApproveModal={showApproveModal}
          showDeclineModal={showDeclineModal}
          currentRecord={currentRecord as IProfessional}
        />
      ) : activeTab === "packages" ? (
        <PackageView />
      ) : activeTab === "gear" ? (
        <ViewGear
          showApproveModal={showApproveModal}
          showDeclineModal={showDeclineModal}
          currentRecord={currentRecord as IGear}
        />
      ) : (
        <ViewWorkshop />
      )}
    </Modal>
  );
};

export default ApprovalsViewModal;
