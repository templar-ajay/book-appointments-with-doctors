import { Plus } from "lucide-react";

import Capsule from "./capsule";
import { Button } from "@nextui-org/react";

const CustomTableHeader = ({
  title,
  count,
  ctaText,
  onCtaClick,
  loader,
}: {
  title: string;
  count?: string | number | boolean;
  ctaText?: string;
  onCtaClick?: any;
  loader?: any;
}) => {
  return (
    <div className="mb-[18px] flex items-center justify-between">
      <div className="flex w-[226px] items-center gap-2">
        <h1 className="text-2xl font-[700] leading-[32px]">{title}</h1>
        {count && <Capsule content={count} />}
        {loader}
      </div>
      {ctaText && (
        <Button
          color="primary"
          endContent={<Plus size={16} />}
          variant="solid"
          onPress={onCtaClick}
        >
          {ctaText}
        </Button>
      )}
    </div>
  );
};

export default CustomTableHeader;
