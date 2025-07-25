/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";

const inputStructure = [
  {
    name: "professionalCommissionPercentage",
    label: "Set Commission For Photography/Videography Orders",
    placeholder: "Enter your commission percentage",
    labelClassName: "!font-medium",
    rules: [{ required: true, message: "Commission percentage is required" }],
  },
  {
    name: "gearCommissionPercentage",
    label: "Set Commission For Gear Orders",
    placeholder: "Enter your commission percentage",
    labelClassName: "!font-medium",
    rules: [{ required: true, message: "Commission percentage is required" }],
  },
  {
    name: "workshopCommissionPercentage",
    label: "Set Commission For Workshop",
    placeholder: "Enter your commission percentage",
    labelClassName: "!font-medium",
    rules: [{ required: true, message: " Commission percentage is required" }],
  },
];

const AdminCommissionSetupPage = () => {
  const [form] = Form.useForm();
  const handleFinish = (values: any) => {
    console.log("Form values:", values);
    // Handle form submission logic here
  };
  return (
    <div className="min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5 ">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          Commission Setup
        </p>
      </div>
      <ReusableForm form={form} handleFinish={handleFinish}>
        {inputStructure.map((input, index) => (
          <ReuseInput
            key={index}
            name={input.name}
            label={input.label}
            placeholder={input.placeholder}
            labelClassName={input.labelClassName}
            rules={input.rules}
          />
        ))}
        <ReuseButton
          variant="secondary"
          className="!px-5 !py-4 !w-fit mt-5"
          htmlType="submit"
        >
          Save
        </ReuseButton>
      </ReusableForm>
    </div>
  );
};

export default AdminCommissionSetupPage;
