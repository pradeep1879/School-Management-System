import { useAuthStore } from "@/store/auth.store"
import { Navigate } from "react-router-dom"

interface Props {
  children: React.ReactNode
  allowedRoles: ("admin" | "teacher" | "student")[]
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {

  const { token, role, hasHydrated } = useAuthStore()

  if (!hasHydrated) {
    return null
  }

  if (!token || !role) {
    return <Navigate to="/" replace />
  }

  if (!allowedRoles.includes(role)) {

    // redirect user to their own dashboard
    if (role === "admin") return <Navigate to="/admin/dashboard" replace />
    if (role === "teacher") return <Navigate to="/teacher/dashboard" replace />
    if (role === "student") return <Navigate to="/student/dashboard" replace />

  }

  return <>{children}</>
}

export default ProtectedRoute