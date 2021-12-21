import { getAsset, getEntry } from "../helpers/getData";
import Icon from "./Icon";

const MenuItem = ({ data, sys }) => {
  /**
   * Cross reference assets to get images
   */
  const menuItem = getEntry(data, sys.id);
  const menuItemIcon =
    menuItem?.uploadedIcon && getAsset(data, menuItem?.uploadedIcon?.sys?.id);

  if (!menuItem?.url) return null;

  return (
    <li className="c-nav__list-item" key={`${menuItem?.url}${sys.id}`}>
      <a
        href={menuItem.url}
        target="_blank"
        className="c-nav__link"
        title={menuItem.label}
      >
        {!!menuItemIcon?.file?.url ? (
          <img
            src={menuItemIcon.file.url}
            alt={menuItemIcon.title || ""}
            className="c-nav__icon"
          />
        ) : (
          <Icon icon={menuItem.icon} extraClasses="c-nav__icon" />
        )}
      </a>
    </li>
  );
};

export default MenuItem;
