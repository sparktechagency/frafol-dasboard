/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseUpload from "../../Form/ReuseUpload";
import ReuseButton from "../../Button/ReuseButton";
interface AdminAddCategoriesProps {
  isAddModalVisible: boolean;
  handleCancel: () => void;
  activeTab: "photography" | "videography" | "gear";
}

const AdminAddCategories: React.FC<AdminAddCategoriesProps> = ({
  isAddModalVisible,
  handleCancel,
  activeTab,
}) => {
  const [form] = Form.useForm();

  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <Modal
      open={isAddModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[500px]"
    >
      <div className="p-5 text-base-color">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-5">
          Create New Category
        </h1>
        <ReusableForm form={form} handleFinish={onSubmit}>
          <ReuseInput
            name="title"
            label="Titles"
            placeholder="Enter Titles"
            rules={[{ required: true, message: "Titles is required" }]}
            labelClassName="!font-semibold"
          />
          {activeTab === "photography" ? (
            <div>
              <ReuseInput
                name="subTitle"
                label="Subtitle"
                placeholder="Enter Subtitle"
                rules={[{ required: true, message: "Subtitle is required" }]}
                labelClassName="!font-semibold"
              />
              <ReuseUpload
                label="Upload Image"
                name="image"
                buttonText="Upload Image"
                accept="image/png, image/jpeg"
                maxCount={1}
                labelClassName="!font-semibold"
              />
            </div>
          ) : activeTab === "videography" ? (
            <div>
              <ReuseInput
                name="subTitle"
                label="Subtitle"
                placeholder="Enter Subtitle"
                rules={[{ required: true, message: "Subtitle is required" }]}
                labelClassName="!font-semibold"
              />
              <ReuseUpload
                label="Upload Image"
                name="image"
                buttonText="Upload Image"
                accept="image/png, image/jpeg"
                maxCount={1}
                labelClassName="!font-semibold"
              />
            </div>
          ) : null}

          <ReuseButton htmlType="submit" variant="secondary" className="mt-2">
            Add
          </ReuseButton>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default AdminAddCategories;
