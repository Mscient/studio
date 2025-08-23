
import { AppLayout } from "@/components/app-layout";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function CommunityPage() {
  return (
    <AppLayout userType="doctor">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare />
            Community
          </CardTitle>
          <CardDescription>
            This page is under construction. Future enhancements will include:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>A public feed for doctors to post updates and chat.</li>
              <li>Private, secure groups for discussing patient cases with colleagues.</li>
              <li>The ability to share encrypted patient files and lab reports.</li>
              <li>Tools for creating polls and connecting with other professionals.</li>
            </ul>
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
}
