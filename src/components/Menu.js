import React from "react";
import MenuItem from "./MenuItem";

const Menu = ({ data, items, children, extraClasses }) => (
  <nav className={`c-nav ${extraClasses}`.trim()}>
    <ul className="c-nav__list">
      {children}
      {!!(items && items.length) &&
        items.map(({ sys }) => (
          <MenuItem data={data} sys={sys} key={`MenuItem${sys.id}`} />
        ))}
    </ul>
  </nav>
);

export default Menu;
