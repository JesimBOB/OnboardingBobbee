import { HomeMediaShowcase } from "@/components/HomeMediaShowcase";
import siteContent from "@/data/site-content.json";

type SiteContent = {
  bobbee: {
    homeVideoSrc: string;
  };
};

const content = siteContent as SiteContent;

export default function HomePage() {
  return (
    <div className="pb-12">
      <HomeMediaShowcase videoSrc={content.bobbee.homeVideoSrc} />
    </div>
  );
}
