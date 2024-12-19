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
import { Delete, UserRoundPen } from "lucide-react";

import CustomTableHeader from "@/components/table-header";
import CreateDoctorModal from "@/components/doctors/createDoctorModal";
import { getAllDoctors } from "@/lib/api";
import { cn } from "@/lib/utils";
import DeleteDoctor from "@/components/doctors/deleteDoctor";
import EditDoctor from "@/components/doctors/editDoctorButton";

const Page = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [revalidate, setRevalidate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<
    {
      _id: string;
      first_name: string;
      last_name: string;
      username: string;
      email: string;
    }[]
  >([]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await getAllDoctors();

        if (response?.status == 200) {
          setData(response.data);
        }
      } catch (err) {
        console.error("error loading doctors data:" + err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [revalidate]);

  const revalidateData = () => {
    setRevalidate(!revalidate);
  };

  return (
    <div>
      <CustomTableHeader
        count={Boolean(data.length) && data?.length}
        ctaText="Add Doctor"
        loader={
          <Spinner className={cn("mx-auto w-full", { hidden: !isLoading })} />
        }
        title="Doctors"
        onCtaClick={onOpen}
      />

      <Table removeWrapper aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>USERNAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>

        <TableBody className={cn({ hidden: isLoading })}>
          {data.map((item) => {
            return (
              <TableRow key={item._id}>
                <TableCell>{item.first_name + " " + item.last_name}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <DeleteDoctor
                      id={item._id}
                      revalidateData={revalidateData}
                    />
                    {/* <EditDoctor id={item._id} revalidateData={revalidateData} /> */}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <CreateDoctorModal
        isOpen={isOpen}
        revalidateData={revalidateData}
        onOpenChange={onOpenChange}
      />
    </div>
  );
};

export default Page;
