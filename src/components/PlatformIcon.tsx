import { getPlatformIcon } from "../entities/Platfrom";

interface Props {
  slug: string;
}

const PlatformIcon = ({ slug }: Props) => {
  const platformIcon = getPlatformIcon(slug);
  return platformIcon ? (
    <span key={slug} className="platform-icon me-2" title={platformIcon.alt}>
      {platformIcon.icon}
    </span>
  ) : (
    <></>
  );
};

export default PlatformIcon;
