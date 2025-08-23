import { AppLayout } from "@/components/app-layout";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrescriptionsPage() {
  return (
    <AppLayout userType="patient">
      <Card>
        <CardHeader>
          <CardTitle>My Prescriptions</CardTitle>
          <CardDescription>This page is under construction. Here you will find all your medical reports and prescriptions.</CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
}
