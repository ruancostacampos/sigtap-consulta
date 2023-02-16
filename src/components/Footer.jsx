import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="flex justify-center w-full bg-slate-300">
        <div className="flex items-center p-2 gap-4">
          <p className="font-bold">Desenvolvido por Ruan Costa Campos</p>
          <ul className="flex p-4 gap-4 justify-center">
            <li>
              <a href="https://github.com/ruancostacampos">
                <FaGithub className="h-7 w-7 hover:fill-blue-500" />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/ruancostacampos/">
                <FaLinkedin className="h-7 w-7 hover:fill-blue-500" />
              </a>
            </li>
            <li>
              <a href="https://wa.me/5577991882211?text=Ol%C3%A1%2C%20vi%20seu%20projeto%20do%20SIGTAP%20e%20gostei!">
                <FaWhatsapp className="h-7 w-7 hover:fill-green-500 transition-all" />
              </a>
            </li>
          </ul>
        </div>
      </footer>
  )
}

export default Footer;