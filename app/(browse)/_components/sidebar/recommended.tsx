"use client";
import { useSidebar } from "@/store/use-sidebar";
import { User } from "@prisma/client";
import { UserInfo, UserSkeleton } from "./user";
export const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebar((state) => state);
  const showLabel = !collapsed && data.length > 0;
  return (
    <>
      {showLabel && (
        <div className="pl-6 mb-4 ">
          <p className="text-sm font-semibold text-muted-foreground">
            Recommended
          </p>
        </div>
      )}
      <ul className="space-y-2 x-2">
        {data.map((user) => (
          <UserInfo
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={true}
          />
        ))}
      </ul>
    </>
  );
};

interface RecommendedProps {
  data: User[];
}

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserSkeleton key={i} />
      ))}
    </ul>
  );
};
