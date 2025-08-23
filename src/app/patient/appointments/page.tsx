import { AppLayout } from "@/components/app-layout";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AppointmentsPage() {
  return (
    <AppLayout userType="patient">
      <Card>
        <CardHeader>
          <CardTitle>My Appointments</CardTitle>
          <CardDescription>This page is under construction. Here you will see your upcoming and past appointments.</CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
}
