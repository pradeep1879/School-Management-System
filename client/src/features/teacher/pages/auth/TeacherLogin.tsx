

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAuthStore } from "@/store/auth.store";
import { useTeacherLogin } from "../../hooks/useCreateTeacher";

type FormValues = {
  email: string;
  password: string;
};

const TeacherLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const loginMutation = useTeacherLogin();

  const onSubmit = (data: FormValues) => {
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        // Assuming backend returns: { token, teacher }
        setAuth({
          token: res.token,
          role: "teacher",
          userId: res.teacher.id,
        });

        navigate("/teacher/dashboard");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 to-purple-600 p-6">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border-0">
        <CardContent className="p-8 space-y-6">

          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold">
              Teacher Login
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Welcome back! Please login to continue.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Email */}
            <div className="space-y-1">
              <Input
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <p className="text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1 relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
              />

              {/* Eye Icon */}
              <div
                className="absolute right-3 top-2.5 cursor-pointer text-muted-foreground"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </div>

              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Error Message */}
            {loginMutation.isError && (
              <p className="text-sm text-red-500 text-center">
                Invalid credentials. Please try again.
              </p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </Button>
          </form>

        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherLogin;