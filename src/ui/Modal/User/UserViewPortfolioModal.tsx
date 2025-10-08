/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { Image as AntdImage } from "antd"; // import this
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { AllImages } from "../../../../public/images/AllImages";
interface UserViewPortfolioModalProps {
  isViewProtfolioModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any | null;
}
const UserViewPortfolioModal: React.FC<UserViewPortfolioModalProps> = ({
  isViewProtfolioModalVisible,
  handleCancel,
  currentRecord,
}) => {
  console.log(currentRecord);
  const columnsCountBreakPoints = { 350: 1, 600: 2, 1024: 3 };

  const data = [
    AllImages?.photo,
    AllImages?.photo,
    AllImages?.photo,
    AllImages?.photo,
    AllImages?.photo,
    AllImages?.photo,
    AllImages?.photo,
    AllImages?.photo,
  ];
  return (
    <Modal
      open={isViewProtfolioModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[1000px]"
    >
      <div className="p-5">
        <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold  text-center text-secondary-color mb-5">
          Professional Portfolio
        </h3>
        <AntdImage.PreviewGroup>
          <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
            <Masonry gutter="10px">
              {data?.map((item, index) => (
                <img
                  key={index}
                  width={2000}
                  height={2000}
                  src={item}
                  alt={"gallery Image"}
                  className="w-full h-full max-h-80 object-cover rounded-lg"
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </AntdImage.PreviewGroup>
      </div>
    </Modal>
  );
};

export default UserViewPortfolioModal;
