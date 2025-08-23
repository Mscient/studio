
import { AppLayout } from "@/components/app-layout";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function EmergencyPage() {
  return (
    <AppLayout userType="doctor">
      <Card>
        <CardHeader>
          <CardTitle>Emergency Requests</CardTitle>
          <CardDescription>This page is under construction. Post and respond to urgent medical needs here.</CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
}
