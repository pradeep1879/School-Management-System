
import AdminAnalystics from "../components/AdminAnalystics";




const AdminDashboard = () => {

  return (
    <div className="space-y-10">
      {/*  HEADER  */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin</h1>
        <p className="text-muted-foreground mt-1">
          Real-time overview of school performance
        </p>
      </div>

      

      {/* ================= CONTENT ================= */}

      {/* KPI CARDS  */}

      <AdminAnalystics/>

      
    </div>
  );
};

export default AdminDashboard;
