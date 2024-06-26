import { withAuth } from "@/components/withAuth";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

function Settings() {
  const { data: sessionData, update: updateSession } = useSession();
  const { toast } = useToast();

  const [name, setName] = useState(sessionData?.user?.name || "");
  const [email, setEmail] = useState(sessionData?.user?.email || "");
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [notifications, setNotifications] = useState(true);

  const updateUserMutation = api.user.update.useMutation({
    onSuccess: async () => {
      await updateSession();
      toast({
        title: "Settings updated",
        description: "Your settings have been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update settings: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserMutation.mutate({
      name,
      email,
      settings: {
        darkMode,
        currency,
        notifications,
      },
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[1fr_300px]">
        <main className="flex w-full flex-col items-start justify-start gap-8 p-4 md:p-8 lg:pl-24 xl:pl-32">
          <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
          <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account profile information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                  />
                </div>
              </CardContent>
            </Card>
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </main>
        <Nav />
      </div>
    </div>
  );
}

export default withAuth(Settings);