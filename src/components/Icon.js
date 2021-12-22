import React from "react";
import EmailIcon from "../assets/icons/email.svg";
import FacebookIcon from "../assets/icons/facebook.svg";
import InstagramIcon from "../assets/icons/instagram.svg";
import LinkIcon from "../assets/icons/link.svg";
import LinkedinIcon from "../assets/icons/linkedin.svg";
import MixcloudIcon from "../assets/icons/mixcloud.svg";
import SoundcloudIcon from "../assets/icons/soundcloud.svg";
import SpotifyIcon from "../assets/icons/spotify.svg";
import TwitterIcon from "../assets/icons/twitter.svg";

const ICONS = {
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
  if (!icon) return;

  const SelectedIcon = ICONS[icon] || ICONS.other;

  return <SelectedIcon className={extraClasses} />;
};

export default Icon;
