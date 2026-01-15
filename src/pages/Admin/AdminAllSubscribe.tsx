/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetSubscribeQuery } from "../../redux/features/subscribe/subscribeApi";
import AdminAllSubscribeTable from "../../ui/Tables/AdminAllSubscribeTable";

const AdminAllSubscribe = () => {
  const limit = 10;
  const [page, setPage] = useState(1);

  const { data, isFetching } = useGetSubscribeQuery(
    {
      limit,
      page,
    },
    { refetchOnMountOrArgChange: true, pollingInterval: 600000 }
  );

  const allSubs: any[] = data?.data?.subscribers || [];

  const total = data?.data?.meta?.total || 0;

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center py-2 mb-5">
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-base-color font-extrabold ">
          All Subscribers
        </p>
      </div>
      <AdminAllSubscribeTable
        data={allSubs}
        loading={isFetching}
        setPage={setPage}
        page={page}
        total={total}
        limit={limit}
      />
    </div>
  );
};

export default AdminAllSubscribe;
