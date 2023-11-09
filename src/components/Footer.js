function Footer({ isLoading }) {
  return (
    !isLoading &&
    (
      <footer className="footer">
        <p className="footer__copyright">&#64; {new Date().getFullYear()} The Place</p>
      </footer>
    )
  );
}

export default Footer;
