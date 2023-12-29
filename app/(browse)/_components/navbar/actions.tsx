import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
export const Actions = async () => {
  const user = await currentUser();
  return (
    <div className="flx items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {!user && (
        <SignInButton>
          <Button size={`sm`} variant={`primary`}>
            Login
          </Button>
        </SignInButton>
      )}
      {!!user && (
        <div className="flex items-center gap-x-4">
          <Button
            size="sm"
            variant={`ghost`}
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`/user/${user.username}`}>
              <LayoutDashboard className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </div>
  );
};
