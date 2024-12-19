"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/hooks/use-toast";

import { createDoctor } from "@/lib/api";

// Validation schema using Zod
const createDoctorSchema = z.object({
  first_name: z.string().min(2, "First Name is required"),
  last_name: z.string().min(2, "Last Name is required"),
  username: z
    .string()
    .min(3, "Username is required")
    .max(25, "Username must be 15 characters or less"),
  email: z.string().email("Invalid email address"),
});

type CreateDoctorFormData = z.infer<typeof createDoctorSchema>;

interface CreateDoctorModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  revalidateData: () => void;
}

const CreateDoctorModal = ({
  isOpen,
  onOpenChange,
  revalidateData,
}: CreateDoctorModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // Initialize the form with React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateDoctorFormData>({
    resolver: zodResolver(createDoctorSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
    },
  });

  // Function to clear the form
  const clearForm = () => {
    reset(); // Reset the form to default values
  };

  // Submit handler
  const onSubmit = async (data: CreateDoctorFormData) => {
    setIsLoading(true);
    try {
      const response = await createDoctor(data);

      if (response?.status === 201) {
        revalidateData(); // Revalidate data after successful creation
        reset(); // Clear the form
        onOpenChange(false); // Close the modal
      } else {
      }
    } catch (err) {
      console.error("Error creating doctor:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(x: any) => {
        onOpenChange(x);
        // clearForm();
      }}
    >
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader className="flex flex-col gap-1">
            Create Doctor
          </ModalHeader>
          <ModalBody>
            {/* First Name */}
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="First Name"
                  placeholder="Enter first name"
                  isInvalid={!!errors.first_name}
                  errorMessage={errors.first_name?.message}
                />
              )}
            />
            {/* Last Name */}
            <Controller
              name="last_name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Last Name"
                  placeholder="Enter last name"
                  isInvalid={!!errors.last_name}
                  errorMessage={errors.last_name?.message}
                />
              )}
            />
            {/* Username */}
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Username"
                  placeholder="Enter username"
                  isInvalid={!!errors.username}
                  errorMessage={errors.username?.message}
                />
              )}
            />
            {/* Email */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Email"
                  placeholder="Enter email"
                  type="email"
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => {
                clearForm(); // Clear the form on close
                onOpenChange(false);
              }}
            >
              Close
            </Button>
            <Button
              color="secondary"
              variant="light"
              onPress={clearForm} // Add a button to clear the form manually
            >
              Clear
            </Button>
            <Button
              color="primary"
              isLoading={isLoading}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Updating Doctor" : "Update Doctor"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateDoctorModal;
