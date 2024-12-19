"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { UserRoundX } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { deleteDoctor } from "@/lib/api";

const DeleteDoctor = ({
  id,
  revalidateData,
}: {
  id: string;
  revalidateData: any;
}) => {
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDeleteDoctor = async () => {
    setLoading(true);
    try {
      const response = await deleteDoctor({ id });

      if (response.status == 200) {
        revalidateData();
        toast({
          title: response?.data?.message || "Doctor deleted successfully.",
        });
      }
    } catch (err) {
      toast({
        title: "Failed to delete the doctor",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      color="danger"
      key={id}
      isIconOnly={true}
      isLoading={isLoading}
      onPress={handleDeleteDoctor}
    >
      <UserRoundX />
    </Button>
  );
};

export default DeleteDoctor;
