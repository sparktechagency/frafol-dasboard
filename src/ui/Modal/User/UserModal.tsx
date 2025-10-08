/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import { FaStar } from "react-icons/fa";
import ReuseButton from "../../Button/ReuseButton";
interface UserModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any | null;
  activeTab: string;
  showViewPortfolioModal: (record: any) => void;
}
const UserModal: React.FC<UserModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  activeTab,
  showViewPortfolioModal,
}) => {
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[450px]"
    >
      <div className="p-5">
        <div className="text-base-color">
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold  text-center text-secondary-color">
            User Details
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-center mt-2 text-[#989898]">
            See all details about {currentRecord?.name}
          </p>
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            {/* Avatar */}
            <img
              src={AllImages.profile}
              alt={currentRecord?.name}
              className="w-14 h-14 object-cover rounded"
            />
            {activeTab === "professional" && (
              <p className="text-xs sm:text-sm lg:text-base flex items-center gap-1">
                <FaStar className="text-yellow-400" /> 5.0 (124 Reviews)
              </p>
            )}
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-secondary-color mt-1">
              {currentRecord?.name}
            </h2>
            {activeTab === "professional" && (
              <div className="text-center">
                <p className="text-sm sm:text-base lg:text-lg mt-1 font-semibold">
                  Photographer
                </p>
                <p className="text-sm sm:text-base lg:text-lg mt-1">
                  Wedding Photographer
                </p>
              </div>
            )}
          </div>

          <div className="mt-5">
            {activeTab === "professional" ? (
              <div className="text-lg  mt-3">
                <div className="flex items-center  gap-2 mb-2">
                  <span className="font-medium">Email:</span>
                  <span>user@gmail.com</span>
                </div>
                <div className="flex items-center  gap-2 mb-2">
                  <span className="font-medium">Hourly Rate:</span>
                  <span>$200</span>
                </div>
                <div className="flex items-center  gap-2 mb-2">
                  <span className="font-medium">Location:</span>
                  <span>New York</span>
                </div>
              </div>
            ) : (
              <div className="text-lg  mt-3">
                <div className="flex items-center  gap-2 mb-2">
                  <span className="font-medium">Email:</span>
                  <span>{currentRecord?.email}</span>
                </div>
                <div className="flex items-center  gap-2 mb-2">
                  <span className="font-medium">Location:</span>
                  <span>New York</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center items-center mt-5">
            <ReuseButton
              variant="secondary"
              onClick={() => showViewPortfolioModal(currentRecord)}
            >
              View Portfolio
            </ReuseButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
