import Link from "next/link";
import React from "react";
import Loader from "../common/Loader";

type Props = {
  metric_one?: number;
  metric_one_loading?: boolean;
  metric_one_label?: string;
  metric_two?: number;
  metric_two_loading?: boolean;
  metric_two_label?: string;
  metric_three?: number;
  metric_three_loading?: boolean;
  metric_three_label?: string;
  isLoading: boolean;
};

const AdminMetricsCard = ({
  metric_one = 0,
  metric_two = 0,
  metric_three = 0,
  metric_one_label = "Metric 1",
  metric_two_label = "Metric 2",
  metric_three_label = "Metric 3",
  metric_one_loading,
  metric_two_loading,
  metric_three_loading,
  isLoading,
}: Props) => {
  if (isLoading) {
    return (
      <div className="my-4 flex h-fit min-h-max w-full min-w-[24rem] max-w-2xl flex-col items-center justify-center rounded-lg bg-slate-300/40 p-4 shadow-md  backdrop-blur-md dark:bg-slate-600/40">
        <Loader />
      </div>
    );
  }
  return (
    <div className="my-4 flex h-fit w-full min-w-[24rem] max-w-2xl flex-col items-center justify-center rounded-lg bg-slate-300/40 p-4 shadow-md  backdrop-blur-md dark:bg-slate-600/40">
      <Link href={"/employee-manager"}>
        <div className="flex h-2/3 w-36 flex-col items-center justify-center">
          {metric_one_loading ? (
            <Loader />
          ) : (
            <p className="w-full text-center text-3xl">{metric_one}</p>
          )}
          <p className="w-full text-center text-base">{metric_one_label}</p>
        </div>
      </Link>
      <div className="flex h-1/2 w-full flex-col justify-around p-4  sm:flex-row">
        <Link
          href="/leave-request-manager"
          className="w-46 flex h-1/3 flex-col items-center justify-center p-4"
        >
          <div>
            {metric_two_loading ? (
              <Loader />
            ) : (
              <p className="w-full text-center text-3xl">{metric_two}</p>
            )}
            <p className="w-full text-center text-base">{metric_two_label}</p>
          </div>
        </Link>
        <div className="w-46 flex h-1/3 flex-col items-center justify-center p-4">
          {metric_three_loading ? (
            <Loader />
          ) : (
            <p className="w-full text-center text-3xl">{metric_three}</p>
          )}
          <p className="w-full text-center text-base">{metric_three_label}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminMetricsCard;
