function NavItem({ href, text }: { href: string; text: string }) {
  return (
    <li>
      <a
        href={href}
        className="text-white hover:text-purple-200 transition duration-300"
      >
        {text}
      </a>
    </li>
  );
}

export default NavItem;
