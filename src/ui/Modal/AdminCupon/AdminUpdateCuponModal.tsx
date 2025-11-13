/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import ReuseDatePicker from "../../Form/ReuseDatePicker"; // Custom date picker component
import dayjs from "dayjs"; // Import Day.js
import { useEffect } from "react";

interface AdminUpdateCuponModalProps {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  currentRecord?: any; // Optional, if you want to pre-fill the form with existing data
}

const AdminUpdateCuponModal: React.FC<AdminUpdateCuponModalProps> = ({
  isEditModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [form] = Form.useForm();
  //   const [updateCoupon] = useUpdateCouponMutation();

  // Set form fields when currentRecord is available
  useEffect(() => {
    if (currentRecord) {
      form.setFieldsValue({
        code: currentRecord.code,
        discount: currentRecord.discount,
        usageLimit: currentRecord.usageLimit,
        minSpend: currentRecord.minSpend,
        // Use Day.js to parse and format the date
        expiry: currentRecord.expiry ? dayjs(currentRecord.expiry) : null,
      });
    }
  }, [currentRecord, form]);

  // Handle form submission
  const onSubmit = async (values: any) => {
    // const payload = {
    //   code: values.code,
    //   discount: Number(values.discount),
    //   usageLimit: Number(values.usageLimit),
    //   minSpend: Number(values.minSpend),
    //   // If there's an expiry, format it as an ISO string, otherwise set it as null
    //   expiry: values.expiry ? values.expiry.toISOString() : null,
    // };
    // const res = await tryCatchWrapper(
    //   updateCoupon,
    //   { body: payload, params: { id: currentRecord?._id } },
    //   "Updating Coupon..."
    // );
    // if (res?.statusCode === 200) {
    //   form.resetFields();
    //   handleCancel();
    // }
    console.log(values);
  };

  return (
    <Modal
      open={isEditModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[500px]"
    >
      <div className="p-5 text-base-color">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-5">
          Edit Coupon
        </h1>
        <ReusableForm form={form} handleFinish={onSubmit}>
          <ReuseInput
            name="code"
            label="Coupon Code"
            placeholder="E.g. SAVE10"
            rules={[{ required: true, message: "Coupon code is required" }]}
            labelClassName="!font-semibold"
          />

          <ReuseInput
            name="discount"
            label="Discount Amount (€)"
            placeholder="0"
            type="number"
            rules={[{ required: true, message: "Discount amount is required" }]}
            labelClassName="!font-semibold"
          />

          <ReuseInput
            name="usageLimit"
            label="Usage Limit"
            placeholder="0"
            type="number"
            rules={[{ required: true, message: "Usage limit is required" }]}
            labelClassName="!font-semibold"
          />

          <ReuseInput
            name="minSpend"
            label="Minimum Spend (€)"
            placeholder="0"
            type="number"
            rules={[{ required: true, message: "Minimum spend is required" }]}
            labelClassName="!font-semibold"
          />

          <ReuseDatePicker
            name="expiry"
            label="Expiry Date (Optional)"
            placeholder="Select expiry date"
            value={form.getFieldValue("expiry")}
          />

          <div className="flex justify-between gap-3 mt-6">
            <ReuseButton htmlType="submit" variant="secondary">
              Update Coupon
            </ReuseButton>

            <ReuseButton variant="outline" onClick={handleCancel}>
              Cancel
            </ReuseButton>
          </div>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default AdminUpdateCuponModal;
