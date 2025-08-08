import CSS from '../styles/Header.module.scss'

function Footer() {
  return (
    <footer className="bg-slate-500 h-40 w-full flex items-center justify-center">
      <img src="./Logo-FLO.png" alt="" className={CSS.img} />
    </footer>
  )
}

export default Footer
