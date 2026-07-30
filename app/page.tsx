import { Hero } from "@/components/sections/Hero";
import { Clients } from "@/components/sections/Clients";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { NetworkPreview } from "@/components/sections/NetworkPreview";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Process } from "@/components/sections/Process";
import { PrintDivision } from "@/components/sections/PrintDivision";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Clients />
      <ServicesOverview />
      <NetworkPreview />
      <SelectedWork />
      <Process />
      <PrintDivision />
      <ContactCTA index="06" />
    </>
  );
}
