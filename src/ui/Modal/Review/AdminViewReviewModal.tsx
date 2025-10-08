/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { AllImages } from "../../../../public/images/AllImages";

interface AdminViewReviewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any | null;
}

const AdminViewReviewModal: React.FC<AdminViewReviewModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  console.log(currentRecord);
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
              src={AllImages.profile}
              alt="Lívia Nováková"
              className="w-auto h-20 object-cover"
            />
            <div className="text-base sm:text-lg lg:text-xl font-semibold text-secondary-color">
              Lívia Nováková
            </div>
          </div>

          <div className="mt-3">
            <div className="text-lg  ">
              <span className="font-medium text-secondary-color">Issue:</span>
              <div className="text-sm sm:text-base lg:text-lg text-base-color mt-1 p-2 bg-gray-100 rounded-md">
                <span>
                  The upload speed on your platform is painfully slow, which is
                  causing significant delays in my work. Because of this, I’m
                  struggling to meet important client deadlines, and it’s
                  starting to impact my professional reputation. Please address
                  this issue as soon as possible."
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdminViewReviewModal;
