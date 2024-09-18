import Navbar from "../components/Navbar";
import AdminDashboardSidebar from "../components/AdminDashboardMain";

function AdminDashboard() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <AdminDashboardSidebar />
      </div>
    </>
  );
}

export default AdminDashboard;
