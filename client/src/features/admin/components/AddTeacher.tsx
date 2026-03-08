import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { useCreateTeacher } from "@/features/teacher/hooks/useCreateTeacher";

interface AddTeacherProps {
  setOpen: (value: boolean) => void;
}

interface TeacherFormData {
  teacherName: string;
  email: string;
  password: string;
  contactNo: string;
  experience: string;
  baseSalary: string;
  perDaySalary: string;
  image: FileList;
}

const AddTeacher = ({ setOpen }: AddTeacherProps) => {
  const { register, handleSubmit, reset, watch } =
    useForm<TeacherFormData>();

  const { mutate, isPending } = useCreateTeacher();

  const [showPassword, setShowPassword] = useState(false);

  const imageFile = watch("image");

  const onSubmit = (data: TeacherFormData) => {
    if (!data.image?.[0]) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();

    formData.append("teacherName", data.teacherName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("contactNo", data.contactNo);
    formData.append("experience", data.experience);
    formData.append("baseSalary", data.baseSalary);
    formData.append("perDaySalary", data.perDaySalary);
    formData.append("image", data.image[0]);

    mutate(formData, {
      onSuccess: (res: any) => {
        toast.success(res.message);
        reset();
        setOpen(false);
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || "Something went wrong"
        );
      },
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Teacher</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 overflow-y-auto min-h-180 custom-scrollbar">
        <FieldGroup>

          {/* Name */}
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input
              {...register("teacherName")}
              disabled={isPending}
              placeholder="Teacher name"
            />
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              type="email"
              {...register("email")}
              disabled={isPending}
            />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel>Password</FieldLabel>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                disabled={isPending}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </Field>

          {/* Phone */}
          <Field>
            <FieldLabel>Phone</FieldLabel>
            <Input
              {...register("contactNo")}
              disabled={isPending}
            />
          </Field>

          {/* Experience */}
          <Field>
            <FieldLabel>Experience</FieldLabel>
            <Input
              {...register("experience")}
              disabled={isPending}
              placeholder="e.g. 5 years"
            />
          </Field>

          {/* Salary Section */}
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Base Salary</FieldLabel>
              <Input
                type="number"
                {...register("baseSalary")}
                disabled={isPending}
                placeholder="30000"
              />
            </Field>

            <Field>
              <FieldLabel>Per Day Salary</FieldLabel>
              <Input
                type="number"
                {...register("perDaySalary")}
                disabled={isPending}
                placeholder="1000"
              />
            </Field>
          </div>

          {/* Image Upload */}
          <Field>
            <FieldLabel>Upload Image</FieldLabel>
            <Input
              type="file"
              accept="image/png, image/jpeg"
              {...register("image")}
              disabled={isPending}
            />
          </Field>

          {/* Image Preview */}
          {imageFile?.[0] && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(imageFile[0])}
                alt="preview"
                className="h-24 w-24 rounded-md object-cover border"
              />
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2"
          >
            {isPending && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {isPending ? "Creating..." : "Create Teacher"}
          </Button>

        </FieldGroup>
      </form>
    </DialogContent>
  );
};

export default AddTeacher;