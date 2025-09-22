import { Modal } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import { IFeedback } from "../../../types";
import { getImageUrl } from "../../../helpers/config/envConfig";

interface AdminViewFeedbackModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IFeedback | null;
}

const AdminViewFeedbackModal: React.FC<AdminViewFeedbackModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const serverUrl = getImageUrl();
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[450px]"
    >
      <div className="p-5">
        <div className="">
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-color text-center">
            Report Details
          </h3>
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            {/* Avatar */}
            <img
              src={
                currentRecord?.userId?.profileImage
                  ? serverUrl + currentRecord?.userId?.profileImage
                  : AllImages.profile
              }
              alt={currentRecord?.userId?.name || "User Avatar"}
              className="w-auto h-20 object-cover"
            />
            <div className="text-base sm:text-lg lg:text-xl font-semibold text-secondary-color">
              {currentRecord?.userId?.name || "Unknown User"}
            </div>
          </div>

          <div className="mt-3">
            <div className="text-lg  ">
              <span className="font-medium text-secondary-color">
                Feedback:
              </span>
              <div className="text-sm sm:text-base lg:text-lg text-base-color mt-1 p-2 bg-gray-100 rounded-md">
                <span>{currentRecord?.text || "No feedback provided."}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdminViewFeedbackModal;
