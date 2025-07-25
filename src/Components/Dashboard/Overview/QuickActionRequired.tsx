/* eslint-disable @typescript-eslint/no-explicit-any */
const QuickActionRequired = () => {
  const notificationData = [
    {
      id: "1",
      message: {
        text: "Client confirmed Delivery",
        time: "5 minutes ago",
      },
      createdAt: new Date(),
    },
    {
      id: "2",
      message: {
        text: "Pending User Approvals",
        time: "5 minutes ago",
      },
      createdAt: new Date(),
    },
    {
      id: "3",
      message: {
        text: "Workshop Approvals",
        time: "5 minutes ago",
      },
      createdAt: new Date(),
    },
    {
      id: "4",
      message: {
        text: "Packages Approvals",
        time: "5 minutes ago",
      },
      createdAt: new Date(),
    },
    {
      id: "5",
      message: {
        text: "Gear Item Approvals",
        time: "5 minutes ago",
      },
      createdAt: new Date(),
    },
  ];
  return (
    <div
      className="w-full max-h-[300px] xl:max-h-[600px] overflow-y-auto rounded-xl relative  border border-[#E1E1E1]"
      style={{ boxShadow: "0px 0px 5px 1px #0000000D" }}
    >
      <div className="flex justify-between items-center sticky top-0  px-5 pt-5 bg-white z-10 ">
        <h1 className="text-xl font-semibold">Quick Action Required</h1>
      </div>

      <div className="flex flex-col gap-5 p-5 bg-primary-color">
        {notificationData?.map((activity: any, i: number) => (
          <div
            key={i}
            className="flex items-center justify-between gap-2 p-3 rounded-xl bg-[#EFEFEF]"
          >
            <p className="text-secondary-color text-xs sm:text-sm lg:text-base font-semibold">
              {activity?.message?.text}
            </p>

            <p className="text-sm bg-secondary-color px-2.5 py-1 rounded-full text-primary-color">
              4
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionRequired;
