/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { AllImages } from "../../../../public/images/AllImages";
import { Form, Modal } from "antd";
import ReuseButton from "../../Button/ReuseButton";
import { IoCalendarOutline } from "react-icons/io5";
import { LuClock, LuUsers } from "react-icons/lu";
import { BsCurrencyDollar } from "react-icons/bs";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseSelect from "../../Form/ReuseSelect";
import { FaLink } from "react-icons/fa";

interface ApprovalsViewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any | null;
  activeTab: string;
}

const ProfessionalView = () => {
  return (
    <div className="p-5">
      <div className="">
        <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-color text-center">
          Professional Details
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
            <span className="font-medium text-secondary-color">About:</span>
            <div className="text-sm sm:text-base lg:text-lg text-base-color mt-1 p-2 bg-gray-100 rounded-md">
              <span>
                The upload speed on your platform is painfully slow, which is
                causing significant delays in my work. Because of this, I’m
                struggling to meet important client deadlines, and it’s starting
                to impact my professional reputation. Please address this issue
                as soon as possible."
              </span>
            </div>
          </div>
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
  );
};

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

const GearView = () => {
  const [form] = Form.useForm();

  form.setFieldsValue({
    name: "Canon Camera",
    category: "camera",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
    price: 1900,
    shippingPrice: 19,
    condition: "new",
    shippingCompany: "UPS",
    extraInformation:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  });

  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <div>
      <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-2">
        View Gear
      </h3>

      <ReusableForm form={form} handleFinish={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-2 rounded border border-[#E1E1E1]">
            <h3 className="text-xs sm:text-sm lg:text-base xl:text-lg font-medium mb-5">
              Gear Information
            </h3>
            <ReuseInput
              name="name"
              label="Product Name"
              placeholder="Enter Product Name"
              rules={[{ required: true, message: "Product Name is required" }]}
              labelClassName="!font-semibold"
            />
            <ReuseSelect
              name="category"
              label="Product Category"
              placeholder="Select Category"
              rules={[{ required: true, message: "Category is required" }]}
              labelClassName="!font-semibold"
              options={[
                { label: "Camera", value: "camera" },
                { label: "Lens", value: "lens" },
                { label: "Tripod", value: "tripod" },
                { label: "Lighting", value: "lighting" },
              ]}
            />
            <ReuseInput
              name="price"
              label="Item Price"
              placeholder="Enter Item Price"
              rules={[{ required: true, message: "Item Price is required" }]}
              labelClassName="!font-semibold"
            />
            <ReuseInput
              inputType="textarea"
              rows={4}
              name="description"
              label="Product Description"
              placeholder="Enter Description"
              rules={[{ required: true, message: "Description is required" }]}
              labelClassName="!font-semibold mt-4"
            />
            <ReuseSelect
              name="condition"
              label="Condition"
              placeholder="Select Condition"
              rules={[{ required: true, message: "Condition is required" }]}
              labelClassName="!font-semibold"
              options={[
                { label: "New", value: "new" },
                { label: "Used", value: "used" },
              ]}
            />
            <ReuseInput
              name="shippingCompany"
              label="Shipping Company"
              placeholder="Enter Shipping Company"
              rules={[
                { required: true, message: "Shipping Company is required" },
              ]}
              labelClassName="!font-semibold"
            />
            <ReuseInput
              name="shippingPrice"
              label="Shipping Price"
              placeholder="Enter Shipping Price"
              rules={[
                { required: true, message: "Shipping Price is required" },
              ]}
              labelClassName="!font-semibold"
            />
          </div>
          <div className="p-2 rounded border border-[#E1E1E1]">
            <img
              src={AllImages.product}
              alt="Camera"
              className="w-auto h-auto object-cover"
            />
            <ReuseInput
              inputType="textarea"
              rows={4}
              name="extraInformation"
              label="Extra Information (Optional)"
              placeholder="Enter Extra Information"
              labelClassName="!font-semibold mt-4"
            />
          </div>
        </div>
      </ReusableForm>
    </div>
  );
};

const WorkshopView = () => {
  return (
    <div className="p-1.5 rounded-xl border border-background-color mt-10">
      <img
        width={1000}
        height={1000}
        src={AllImages?.product}
        alt="workspace"
        className="w-full h-80 sm:h-60 lg:h-72 xl:h-80 object-cover rounded-lg "
      />
      <div className="px-1">
        <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold mt-3">
          Advanced Portrait Photography Workshop
        </p>
        <div className="flex items-center gap-2 mt-3">
          <img
            width={1000}
            height={1000}
            src={AllImages?.profile}
            alt="user"
            className="w-8 h-8 object-cover rounded-full "
          />
          <p className="text-xs sm:text-sm lg:text-base font-bold">
            Marek Krajč
          </p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <IoCalendarOutline className="text-secondary-color text-sm sm:text-base lg:text-lg" />
          <p className="text-xs sm:text-sm lg:text-base font-semibold">
            12.12.2023
          </p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <LuClock className="text-secondary-color text-sm sm:text-base lg:text-lg" />
          <p className="text-xs sm:text-sm lg:text-base font-semibold">
            10:00 - 12:00
          </p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <FaLink className="text-secondary-color text-sm sm:text-base lg:text-lg" />
          <p className="text-xs sm:text-sm lg:text-base font-semibold">
            www.workshop.com
          </p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <LuUsers className="text-secondary-color text-sm sm:text-base lg:text-lg" />
          <p className="text-xs sm:text-sm lg:text-base font-semibold">
            10 participants
          </p>
        </div>
        <div className="flex items-center gap-2 mt-5 justify-between">
          <p className="text-base sm:text-lg lg:text-xl font-semibold">$200</p>
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
  );
};

const ApprovalsViewModal: React.FC<ApprovalsViewModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  activeTab,
}) => {
  console.log(currentRecord);
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className={`${activeTab === "gear" ? "lg:!w-[1000px]" : "lg:!w-[450px]"}`}
    >
      {activeTab === "professionals" ? (
        <ProfessionalView />
      ) : activeTab === "packages" ? (
        <PackageView />
      ) : activeTab === "gear" ? (
        <GearView />
      ) : (
        <WorkshopView />
      )}
    </Modal>
  );
};

export default ApprovalsViewModal;
