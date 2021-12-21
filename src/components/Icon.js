import { ReactComponent as EmailIcon } from "../assets/icons/email.svg";
import { ReactComponent as FacebookIcon } from "../assets/icons/facebook.svg";
import { ReactComponent as InstagramIcon } from "../assets/icons/instagram.svg";
import { ReactComponent as LinkIcon } from "../assets/icons/link.svg";
import { ReactComponent as LinkedinIcon } from "../assets/icons/linkedin.svg";
import { ReactComponent as MixcloudIcon } from "../assets/icons/mixcloud.svg";
import { ReactComponent as SoundcloudIcon } from "../assets/icons/soundcloud.svg";
import { ReactComponent as SpotifyIcon } from "../assets/icons/spotify.svg";
import { ReactComponent as TwitterIcon } from "../assets/icons/twitter.svg";

const icons = {
  email: EmailIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  other: LinkIcon,
  linkedin: LinkedinIcon,
  mixcloud: MixcloudIcon,
  soundcloud: SoundcloudIcon,
  spotify: SpotifyIcon,
  twitter: TwitterIcon,
};

const Icon = ({ icon, extraClasses }) => {
  const SelectedIcon = icons[icon] || LinkIcon;

  return <SelectedIcon className={extraClasses} />;
};

export default Icon;
