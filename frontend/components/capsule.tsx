import React from "react";

const Capsule = ({ content }: { content: any }) => {
  return (
    <div className="relative max-w-fit min-w-min justify-between box-border whitespace-nowrap px-1 h-6 text-tiny rounded-full bg-default/40 hidden items-center text-default-500 sm:flex">
      <span className="flex-1 text-inherit font-normal px-1">{content}</span>
    </div>
  );
};

export default Capsule;
