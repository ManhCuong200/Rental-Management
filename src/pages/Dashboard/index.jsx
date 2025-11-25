import HeaderContent from "@/components/HeaderContent";
import { Home, Users, FileText, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const statsData = [
    {
      title: "Tổng Số Phòng",
      value: 6,
      icon: Home,
      iconBg: "bg-blue-100",
    },
    {
      title: "Tổng Người Thuê",
      value: 5,
      icon: Users,
      iconBg: "bg-green-100",
    },
    {
      title: "Tổng Hóa Đơn",
      value: "₫263,135,233",
      icon: FileText,
      iconBg: "bg-purple-100",
    },
    {
      title: "Hóa Đơn Chưa Thanh Toán",
      value: 3,
      icon: AlertCircle,
      iconBg: "bg-red-100",
    },
  ];

  return (
    <HeaderContent
      title="Dashboard"
      description="Overview of your rental property management"
      stats={statsData}
    />
  );
}
