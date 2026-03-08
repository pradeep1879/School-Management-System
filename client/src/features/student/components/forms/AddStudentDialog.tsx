import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateStudent } from "../../hooks/useCreateStudent";

import { useClassDropdown } from "@/features/class/hooks/useClassDropDown";

interface Props {
  setOpen: (v: boolean) => void;
}

const AddStudentDialog = ({ setOpen }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, setValue, reset } = useForm();
  const { mutate, isPending } = useCreateStudent();
  const { data, isLoading } = useClassDropdown();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onSubmit = (data: any) => {
    if (!imageFile) {
      toast.error("Please upload student photo");
      return;
    }

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    formData.append("image", imageFile);

    mutate(formData, {
      onSuccess: () => {
        reset();
        setPreview(null);
        setOpen(false);
      },
    });
  };

  return (
    <DialogContent className="max-w-3xl max-h-[90vh] custom-scrollbar overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Add New Student</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* ================= ACCOUNT INFO ================= */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Account Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Full Name</FieldLabel>
              <Input {...register("studentName")} placeholder="Student name" />
            </Field>

            <Field>
              <FieldLabel>User Name</FieldLabel>
              <Input {...register("userName")} placeholder="Unique username" />
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  disabled={isPending}
                  placeholder="Strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </Field>

            <Field>
              <FieldLabel>Roll Number</FieldLabel>
              <Input {...register("rollNumber")} placeholder="01" />
            </Field>
          </div>
        </div>

        {/* ================= PERSONAL INFO ================= */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Parent's Name</FieldLabel>
              <Input {...register("fatherName")} placeholder="Parent name" />
            </Field>

            <Field>
              <FieldLabel>Date of Birth</FieldLabel>
              <Input type="date" {...register("dateOfBirth")} />
            </Field>

            <Field>
              <FieldLabel>Gender</FieldLabel>
              <Select onValueChange={(v) => setValue("gender", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel>Phone</FieldLabel>
              <Input {...register("contactNo")} placeholder="Contact number" />
            </Field>
          </div>
        </div>

        {/* ================= ACADEMIC INFO ================= */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Academic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Class</FieldLabel>
              <Select
                onValueChange={(v) => setValue("classId", v)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {data?.classes?.map((cls: any) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      Class {cls.slug} - Section {cls.section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel>Admission Date</FieldLabel>
              <Input type="date" {...register("admissionDate")} />
            </Field>
          </div>
        </div>

        {/* ================= CONTACT INFO ================= */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Address
          </h3>

          <Field>
            <FieldLabel>Address</FieldLabel>
            <Input {...register("address")} placeholder="Full address" />
          </Field>
        </div>

        {/* ================= IMAGE ================= */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Profile Image
          </h3>

          <Field>
            <Input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImageFile(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mt-4 h-24 w-24 rounded-lg object-cover border"
              />
            )}
          </Field>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex justify-end gap-4 pt-4 border-t">
          <Button
            variant="outline"
            type="button"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Creating" : "Create Student"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default AddStudentDialog;
