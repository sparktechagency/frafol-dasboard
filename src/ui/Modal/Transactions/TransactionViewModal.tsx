import { Modal } from "antd";
import ReuseButton from "../../Button/ReuseButton";
import { ITransaction } from "../../../types";

interface TransactionViewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: ITransaction | null;
}

const TransactionViewModal: React.FC<TransactionViewModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  if (!currentRecord) return null;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="p-5">
        <div className="text-base-color">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-secondary-color">
            Transaction Details
          </h3>

          <div className="text-xs sm:text-sm lg:text-base mt-3 space-y-2">
            <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
              <span className="font-semibold">Date:</span>
              <span>{formatDate(currentRecord?.createdAt)}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
              <span className="font-semibold">Client Name:</span>
              <span>{currentRecord?.userId?.name}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
              <span className="font-semibold">Professional Name:</span>
              <span>{currentRecord?.serviceProviderId?.name}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
              <span className="font-semibold text-nowrap">
                Transaction ID:{" "}
              </span>
              <span className="text-wrap max-w-[200px] lg:max-w-[350px]">
                {currentRecord?.transactionId}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
              <span className="font-semibold">Payment Method:</span>
              <span>{currentRecord?.paymentMethod}</span>
            </div>

            <div className="flex items-center justify-between font-bold">
              <span className="text-secondary-color">Amount:</span>
              <span className="text-success">${currentRecord?.amount}</span>
            </div>
          </div>

          <div className="flex items-center justify-center mt-5">
            <ReuseButton
              variant="secondary"
              className="!px-5 !py-4 !w-fit gap-2"
            >
              Download Invoice
            </ReuseButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionViewModal;
