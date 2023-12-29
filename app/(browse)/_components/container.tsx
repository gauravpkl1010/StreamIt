"use client";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
export const Container = ({ children }: ContainerProps) => {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);
  const match = useMediaQuery("(max-width:1024px)");
  useEffect(() => {
    if (match) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [match, onCollapse, onExpand]);
  return (
    <div
      className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
    >
      {children}
    </div>
  );
};

interface ContainerProps {
  children: React.ReactNode;
}
