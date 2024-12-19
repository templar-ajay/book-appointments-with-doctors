"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { UserRoundPen } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { deleteDoctor } from "@/lib/api";

const EditDoctor = ({
  id,
  revalidateData,
}: {
  id: string;
  revalidateData: any;
}) => {
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleUpdateDoctor = async () => {
    setLoading(true);
    // try {
    //   //   const response = await deleteDoctor({ id });

    //   if (response?.status == 200) {
    //     revalidateData();
    //     toast({
    //       title: response?.data?.message || "Doctor updated successfully.",
    //     });
    //   }
    // } catch (err) {
    //   toast({
    //     title: "Failed to update the doctor",
    //   });
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <Button
      color="primary"
      key={id}
      isIconOnly={true}
      isLoading={isLoading}
      onPress={handleUpdateDoctor}
    >
      <UserRoundPen />
    </Button>
  );
};

export default EditDoctor;
