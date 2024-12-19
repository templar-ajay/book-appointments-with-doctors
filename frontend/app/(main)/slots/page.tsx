"use client";

import { useEffect, useState } from "react";
import { Spinner, useDisclosure } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import CustomTableHeader from "@/components/table-header";
import { getAllDoctors } from "@/lib/api";
import { cn } from "@/lib/utils";
import DeleteDoctor from "@/components/doctors/deleteDoctor";
// import CreateSlotModal from "@/components/slots/createSlots";

const Page = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [revalidate, setRevalidate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<
    {
      _id: string;
      start_time: string;
      end_time: string;
      status: string;
      doctor_id: any;
    }[]
  >([]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   (async () => {
  //     try {
  //       const response = await getAllDoctors();

  //       if (response?.status == 200) {
  //         setData(response.data);
  //       }
  //     } catch (err) {
  //       console.error("error loading doctors data:" + err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   })();
  // }, [revalidate]);

  const revalidateData = () => {
    setRevalidate(!revalidate);
  };

  return (
    <div>
      <CustomTableHeader
        // count={Boolean(data.length) && data?.length}
        ctaText="Add Time Slot"
        loader={
          <Spinner className={cn("mx-auto w-full", { hidden: !isLoading })} />
        }
        title="Time Slots"
        onCtaClick={onOpen}
      />

      <Table removeWrapper aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>START_TIME</TableColumn>
          <TableColumn>END_TIME</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>

        <TableBody className={cn({ hidden: isLoading })}>
          {data.map((item) => {
            return (
              <TableRow key={item._id}>
                <TableCell>{item.start_time}</TableCell>
                <TableCell>{item.end_time}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <DeleteDoctor id={item._id} revalidateData={revalidateData} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
