import { Navbar } from "./_components/navbar";
import { SideBar } from "./_components/sidebar";
import { Container } from "./_components/container";

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="h-full flex pt-20">
        <SideBar />
        <Container>{children}</Container>
      </div>
    </>
  );
}
