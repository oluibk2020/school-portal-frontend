

function Footer() {
  const footerYear = new Date().getFullYear();

  return (
    <footer className="footer p-10 footer-center bg-white ">
      <div className="text-center text-secondary">
        Your Premier Tech Hub for Innovative Web Solutions and Expert Software
        Engineering Training
      </div>

      <img
        src="https://charisintelligence.com.ng/wp-content/uploads/2022/04/cropped-chari-color-nobg1-300x136.png"
        alt="charisintelligence logo"
        className=" h-11"
      />
      <p className="text-secondary">
        Copyright &copy; {footerYear} All rights reserved
      </p>
    </footer>
  );
}
export default Footer;
