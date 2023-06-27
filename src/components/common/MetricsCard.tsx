import Link from 'next/link';
import React from 'react'
import Loader from "./Loader";

type Props = {
  metric_one?: number;
  metric_one_label?: string;
  metric_two?: number;
  metric_two_label?: string;
  metric_three?: number;
  metric_three_label?: string;
  isLoading: boolean;
};

const MetricsCard = ({
  metric_one = 0,
  metric_two = 0,
  metric_three = 0,
  metric_one_label = "Metric 1",
  metric_two_label = "Metric 2",
  metric_three_label = "Metric 3",
  isLoading,
}: Props) => {
  if (isLoading) {
    return (
      <div className="my-4 flex h-fit min-h-max w-full min-w-[24rem] max-w-2xl flex-col items-center justify-center rounded-lg bg-slate-300 p-4 shadow-md  dark:bg-slate-600">
        <Loader />
      </div>
    );
  }
  return (
    <div className="my-4 flex h-fit w-full min-w-[24rem] max-w-2xl flex-col items-center justify-center rounded-lg bg-slate-300 p-4 shadow-md dark:bg-slate-600  ">
      <Link href={"/employee-manager"}>
        <div className="flex h-2/3 w-36 flex-col items-center justify-center">
          <p className="w-full text-center text-3xl">{metric_one}</p>
          <p className="w-full text-center text-base">
            {metric_one_label}
          </p>
        </div>
      </Link>
      <div className="flex h-1/2 w-full flex-col justify-around p-4  sm:flex-row">
        <div className="w-46 flex h-1/3 flex-col items-center justify-center p-4">
          <p className="w-full text-center text-2xl">{metric_two}</p>
          <p className="w-full text-center text-base">
            {metric_two_label}
          </p>
        </div>
        <div className="w-46 flex h-1/3 flex-col items-center justify-center p-4">
          <p className="w-full text-center text-2xl">{metric_three}</p>
          <p className="w-full text-center text-base">
            {metric_three_label}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MetricsCard