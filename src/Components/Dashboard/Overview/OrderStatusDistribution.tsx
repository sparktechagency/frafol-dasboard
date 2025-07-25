import ReuseSelect from "../../../ui/Form/ReuseSelect";
import OrderStatusChart from "../../Chart/OrderStatusChart";

const OrderStatusDistribution = () => {
  return (
    <div className="w-full lg:w-1/2 p-3 bg-[#FFFFFF] rounded-lg flex flex-col border border-[#E1E1E1]">
      <div className="flex justify-between text-base-color mt-4">
        <p className="text-2xl lg:text-3xl text-secondary-color font-bold mb-5">
          Order Status Distribution
        </p>
        <div>
          <ReuseSelect
            selectClassName="!w-[160px]"
            name="orderStatus"
            options={[
              {
                value: "photography",
                label: "Photography",
              },
              {
                value: "videography",
                label: "Videography",
              },
              {
                value: "gear",
                label: "Gears",
              },
            ]}
          />
        </div>
      </div>
      <hr />
      <div>
        <OrderStatusChart />
      </div>
    </div>
  );
};

export default OrderStatusDistribution;
