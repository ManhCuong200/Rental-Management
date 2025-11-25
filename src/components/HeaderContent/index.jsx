import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CountUp from "react-countup";

export default function HeaderContent({ title, description, stats }) {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-gray-500 mt-2">{description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          const rawValue =
            typeof item.value === "string"
              ? Number(item.value.replace(/[^\d]/g, "")) 
              : item.value;

          return (
            <Card
              key={idx}
              className="shadow-sm rounded-2xl p-4 border bg-white"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-base font-semibold">
                  {item.title}
                </CardTitle>

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${item.iconBg}`}
                >
                  <Icon className="w-5 h-5 text-gray-700" />
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-4xl font-bold tracking-tight">
                  <CountUp
                    end={rawValue}
                    duration={1.8}
                    separator=","
                  />
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
