import { HomeMediaShowcase } from "@/components/HomeMediaShowcase";
import siteContent from "@/data/site-content.json";

type SiteContent = {
  bobbee: {
    videoSrc: string;
  };
};

const content = siteContent as SiteContent;

export default function HomePage() {
  return (
    <div className="pb-12">
      <HomeMediaShowcase videoSrc={content.bobbee.videoSrc} />
    </div>
  );
}
