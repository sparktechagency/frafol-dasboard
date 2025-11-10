/* eslint-disable @typescript-eslint/no-explicit-any */

const QuickActionRequired = ({ quickActions }: { quickActions: any }) => {
  // Example stats (you’ll probably get these from props or API)

  // Match each label with its corresponding quickAction count
  const notificationData = [
    {
      id: "1",
      message: {
        text: "Client confirmed Delivery",
        count: quickActions?.totalConfirmedDeliveries,
      },
    },
    {
      id: "2",
      message: {
        text: "Pending User Approvals",
        count: quickActions?.totalPendingUsers,
      },
    },
    {
      id: "3",
      message: {
        text: "Workshop Approvals",
        count: quickActions?.totalPendingWorkshops,
      },
    },
    {
      id: "4",
      message: {
        text: "Packages Approvals",
        count: quickActions?.totalPendingPackages,
      },
    },
    {
      id: "5",
      message: {
        text: "Gear Item Approvals",
        count: quickActions?.totalPendingGears,
      },
    },
  ];

  return (
    <div
      className="w-full max-h-[300px] xl:max-h-[600px] overflow-y-auto rounded-xl relative border border-[#E1E1E1]"
      style={{ boxShadow: "0px 0px 5px 1px #0000000D" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center sticky top-0 px-5 pt-5 bg-white z-10">
        <h1 className="text-xl font-semibold">Quick Action Required</h1>
      </div>

      {/* Notification List */}
      <div className="flex flex-col gap-5 p-5 bg-primary-color">
        {notificationData.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-2 p-3 rounded-xl bg-[#EFEFEF]"
          >
            <p className="text-secondary-color text-xs sm:text-sm lg:text-base font-semibold">
              {item.message.text}
            </p>

            <p className="text-sm bg-secondary-color px-2.5 py-1 rounded-full text-primary-color">
              {item.message.count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionRequired;
