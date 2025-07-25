import { RiShoppingBag2Fill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import { MdAttachMoney } from "react-icons/md";

const OverviewCards = () => {
  const countData = [
    {
      id: 1,
      background: "#ffffff",
      name: "Total Users",
      icon: <HiUsers className="size-5 text-secondary-color" />,
      count: 1000,
    },
    {
      id: 2,
      background: "#ffffff",
      name: "Regular Users",
      icon: <HiUsers className="size-5 text-secondary-color" />,
      count: 800,
    },
    {
      id: 3,
      background: "#ffffff",
      name: "Photographers/Videographers",
      icon: <HiUsers className="size-6 text-secondary-color" />,
      count: 1500,
    },
    {
      id: 4,
      background: "#ffffff",
      name: "Active Orders",
      icon: <RiShoppingBag2Fill className="size-6 text-secondary-color" />,
      count: 150,
    },
    {
      id: 4,
      background: "#ffffff",
      name: "Earrings From Commission",
      icon: <MdAttachMoney className="size-6 text-secondary-color" />,
      count: "$150",
    },
  ];
  return (
    <div className="flex flex-row flex-wrap gap-1 lg:gap-3 mb-5 ">
      {/* Company  */}
      {countData.map((item) => (
        <div
          key={item.id}
          className={`flex rounded-2xl w-full my-2 lg:my-0 flex-1 border border-[#E1E1E1] p-6`}
          style={{
            backgroundColor: item.background,
          }}
        >
          <div className="!w-full">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm sm:text-base lg:text-lg  font-semibold mb-1  tracking-tight w-full text-nowrap">
                {item.name}
              </p>
              <p>{item?.icon}</p>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl  font-bold capitalize tracking-wider">
              {item.count}
            </p>
            <p className="text-xs lg:text-sm capitalize tracking-wider mt-2 font-semibold">
              <span className="text-success"> +12</span> from last month
            </p>
            {/* <div className="bg-[#FAF4FF] p-3 rounded-full">{item.icon}</div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
