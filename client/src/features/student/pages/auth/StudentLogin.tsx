import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useStudentLogin } from "../../hooks/useLoginStudent";


interface FormData {
  userName: string;
  password: string;
}

export default function StudentLogin() {
  const { register, handleSubmit } = useForm<FormData>();
  const { mutate, isPending } = useStudentLogin();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500">

      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md text-white border border-white/20">

        <h2 className="text-3xl font-bold text-center mb-6">
          Student Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Username */}
          <div>
            <label className="text-sm">Username</label>
            <input
              {...register("userName", { required: true })}
              className="w-full mt-1 p-3 rounded-lg bg-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-white/70"
              placeholder="Enter username"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              className="w-full mt-1 p-3 rounded-lg bg-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 pr-12 placeholder-white/70"
              placeholder="Enter password"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-indigo-500 font-semibold flex justify-center items-center gap-2 hover:scale-105 transition disabled:opacity-70"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}