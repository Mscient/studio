import { AppLayout } from "@/components/app-layout";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AppointmentsPage() {
  return (
    <AppLayout userType="doctor">
      <Card>
        <CardHeader>
          <CardTitle>My Appointments</CardTitle>
          <CardDescription>This page is under construction. Manage all your patient appointments here.</CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
}
