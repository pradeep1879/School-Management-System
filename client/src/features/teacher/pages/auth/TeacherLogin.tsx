import { useState } from "react"
import { useForm } from "react-hook-form"
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { useAuthStore } from "@/store/auth.store"
import { useTeacherLogin } from "../../hooks/useCreateTeacher"

type FormValues = {
  email: string
  password: string
}

const TeacherLogin = () => {

  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const loginMutation = useTeacherLogin()

  const onSubmit = (data: FormValues) => {

    loginMutation.mutate(data, {
      onSuccess: (res) => {

        setAuth({
          token: res.token,
          role: "teacher",
          userId: res.teacher.id,
        })

        navigate("/teacher/dashboard")

      },
    })

  }

  return (

    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-950">

      {/* LEFT SIDE LOGIN */}
      <div className="flex items-center justify-center px-8 py-12">

        <div className="w-full max-w-md">

          {/* SCHOOL BRAND */}
          <div className="flex items-center gap-3 mb-10">

            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
              S
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Springdale High School
              </h2>
              <p className="text-xs text-slate-400">
                Learning Management Portal
              </p>
            </div>

          </div>

          {/* HEADING */}
          <div className="mb-8">

            <p className="text-indigo-400 text-xs uppercase tracking-widest mb-2">
              Teacher Portal
            </p>

            <h1 className="text-3xl font-bold text-white">
              Welcome back
            </h1>

            <p className="text-sm text-slate-400 mt-1">
              Sign in to access your classes and manage students.
            </p>

          </div>

          {/* LOGIN FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* EMAIL */}
            <div>

              <label className="text-xs text-slate-400 uppercase tracking-wide">
                Email Address
              </label>

              <div className="relative mt-1">

                <Mail
                  className="absolute left-3 top-3.5 text-slate-500"
                  size={18}
                />

                <input
                  type="email"
                  placeholder="teacher@school.edu"
                  className="w-full h-11 pl-10 pr-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  {...register("email", {
                    required: "Email is required"
                  })}
                />

              </div>

              {errors.email && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.email.message}
                </p>
              )}

            </div>

            {/* PASSWORD */}
            <div>

              <label className="text-xs text-slate-400 uppercase tracking-wide">
                Password
              </label>

              <div className="relative mt-1">

                <Lock
                  className="absolute left-3 top-3.5 text-slate-500"
                  size={18}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-10 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  {...register("password", {
                    required: "Password is required"
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>

              </div>

              {errors.password && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.password.message}
                </p>
              )}

            </div>

            {/* ERROR */}
            {loginMutation.isError && (
              <p className="text-sm text-red-400">
                Invalid email or password
              </p>
            )}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full h-11 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition"
            >

              {loginMutation.isPending
                ? <Loader2 className="animate-spin" size={18}/>
                : "Login to Dashboard"
              }

            </button>

          </form>

          {/* LINKS */}
          <div className="flex justify-between mt-6 text-sm">

            <button className="text-slate-400 hover:text-white">
              Forgot password?
            </button>

            <button className="text-indigo-400 hover:text-indigo-300">
              Contact Admin
            </button>

          </div>

          {/* FOOTER */}
          <p className="text-xs text-slate-500 mt-10">
            © {new Date().getFullYear()} Springdale High School
          </p>

        </div>

      </div>

      {/* RIGHT IMAGE */}
      <div className="hidden lg:block relative">

        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
          alt="School"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-slate-900/80"/>

      </div>

    </div>

  )
}

export default TeacherLogin