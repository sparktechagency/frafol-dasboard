/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import { AllImages } from "../../../public/images/AllImages";

const SignIn = () => {
  const router = useNavigate();
  const onFinish = (values: any) => {
    const data = {
      ...values,
      role: "admin",
    };
    localStorage.setItem("user_data", JSON.stringify(data));
    router("/");
  };
  return (
    <div className="text-base-color">
      <Container>
        <div className=" min-h-screen flex justify-center items-center">
          <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto bg-highlight-color p-6 rounded-2xl">
            <img
              src={AllImages?.logo}
              alt="logo"
              className="w-auto mx-auto mb-6"
            />
            {/* -------- Sign In Page Header ------------ */}
            <div className="flex flex-col justify-center items-center">
              <div className="text-center mt-5 mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-secondary-color">
                  Sign in Your Account
                </h1>
              </div>
            </div>
            {/* -------- Form Start ------------ */}
            <ReusableForm handleFinish={onFinish}>
              <ReuseInput
                name="email"
                label="Email"
                placeholder="Enter Your Email"
                inputClassName="!py-2"
              />
              <ReuseInput
                inputType="password"
                name="password"
                label="Password"
                placeholder="Enter Your Password "
                inputClassName="!py-2"
              />
              <div className="flex justify-between items-center mt-10 mb-5">
                <Checkbox className="!text-base-color">Remember me</Checkbox>
                <Link
                  to="/forgot-password"
                  className="!text-base-color !underline font-bold"
                >
                  Forgot Password?
                </Link>
              </div>
              <ReuseButton
                variant="secondary"
                htmlType="submit"
                // icon={allIcons.arrowRight}
              >
                Sign In
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default SignIn;
