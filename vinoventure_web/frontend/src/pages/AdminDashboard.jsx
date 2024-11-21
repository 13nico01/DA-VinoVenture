import Navbar from "../components/MainComponents/Navbar";
import AdminDashboardMain from "../components/DashboardComponents/AdminDashboardMain";

function AdminDashboard() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <AdminDashboardMain />
      </div>
    </>
  );
}

export default AdminDashboard;
