import React from "react";
import { getAsset, getEntry } from "../helpers/getData";
import Icon from "./Icon";

const MenuItem = ({ data, sys }) => {
  /**
   * Cross reference assets to get images
   */
  if (!data || !(sys && sys.id)) return null;

  const menuItem = getEntry(data, sys.id);

  if (!(menuItem && menuItem.url)) return null;

  const menuItemIcon =
    menuItem &&
    menuItem.uploadedIcon &&
    menuItem.uploadedIcon.sys &&
    menuItem.uploadedIcon.sys.id &&
    getAsset(data, menuItem.uploadedIcon.sys.id);

  return (
    <li
      className="c-nav__list-item"
      key={`${menuItem && menuItem.url}${sys.id}`}
    >
      <a
        href={menuItem.url}
        target="_blank"
        rel="noreferrer"
        className="c-nav__link"
        title={menuItem.label || ""}
      >
        {!!(menuItemIcon && menuItemIcon.file && menuItemIcon.file.url) ? (
          <img
            src={menuItemIcon.file.url}
            alt={menuItemIcon.title || ""}
            className="c-nav__icon"
          />
        ) : (
          <>
            {!!menuItem.icon && (
              <Icon icon={menuItem.icon} extraClasses="c-nav__icon" />
            )}
          </>
        )}
      </a>
    </li>
  );
};

export default MenuItem;
