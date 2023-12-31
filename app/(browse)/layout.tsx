import { Navbar } from "./_components/navbar";
import { SideBar, SideBarSkeleton } from "./_components/sidebar";
import { Container } from "./_components/container";
import { Suspense } from "react";

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="h-full flex pt-20">
        <Suspense fallback={<SideBarSkeleton />}>
          <SideBar />
        </Suspense>

        <Container>{children}</Container>
      </div>
    </>
  );
}
