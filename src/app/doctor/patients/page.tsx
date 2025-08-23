import { AppLayout } from "@/components/app-layout";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PatientsPage() {
  return (
    <AppLayout userType="doctor">
      <Card>
        <CardHeader>
          <CardTitle>My Patients</CardTitle>
          <CardDescription>This page is under construction. View and manage your patient records here.</CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
}
