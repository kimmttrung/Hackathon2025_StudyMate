import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavHover = (e, isEntering) => {
    if (isEntering) {
      e.target.style.color = '#6366F1';
      e.target.style.transform = 'translateY(-1px)';
    } else {
      e.target.style.color = '#64748B';
      e.target.style.transform = 'translateY(0)';
    }
  };

  const handleButtonHover = (e, isEntering, type) => {
    if (type === 'primary') {
      if (isEntering) {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 20px 25px -5px rgba(99, 102, 241, 0.3)';
      } else {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
      }
    } else if (type === 'secondary') {
      if (isEntering) {
        e.target.style.backgroundColor = '#6366F1';
        e.target.style.color = 'white';
        e.target.style.transform = 'translateY(-1px)';
      } else {
        e.target.style.backgroundColor = 'transparent';
        e.target.style.color = '#6366F1';
        e.target.style.transform = 'translateY(0)';
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-95 backdrop-blur-lg border-b border-[#E2E8F0] shadow-lg">
      <div className="max-w-7xl mx-auto px-6 max-sm:px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-[#1E293B] font-bold text-xl max-sm:text-lg">
              StudyMaster
            </span>
          </div>

          <nav className="hidden max-lg:flex items-center gap-8">
            <a
              href="#challenges"
              className="text-[#64748B] font-medium transition-all duration-300"
              onMouseEnter={(e) => handleNavHover(e, true)}
              onMouseLeave={(e) => handleNavHover(e, false)}
            >
              Thách thức
            </a>
            <a
              href="#solutions"
              className="text-[#64748B] font-medium transition-all duration-300"
              onMouseEnter={(e) => handleNavHover(e, true)}
              onMouseLeave={(e) => handleNavHover(e, false)}
            >
              Giải pháp
            </a>
            <a
              href="#success"
              className="text-[#64748B] font-medium transition-all duration-300"
              onMouseEnter={(e) => handleNavHover(e, true)}
              onMouseLeave={(e) => handleNavHover(e, false)}
            >
              Thành công
            </a>
            <a
              href="#contact"
              className="text-[#64748B] font-medium transition-all duration-300"
              onMouseEnter={(e) => handleNavHover(e, true)}
              onMouseLeave={(e) => handleNavHover(e, false)}
            >
              Liên hệ
            </a>
          </nav>

          <div className="hidden max-lg:flex items-center gap-4">
            <button
              className="px-6 py-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-xl font-semibold shadow-lg transition-all duration-300"
              onMouseEnter={(e) => handleButtonHover(e, true, 'primary')}
              onMouseLeave={(e) => handleButtonHover(e, false, 'primary')}
            >
              Dùng thử miễn phí
            </button>
            <button
              className="px-6 py-2 border-2 border-[#6366F1] text-[#6366F1] rounded-xl font-semibold transition-all duration-300"
              onMouseEnter={(e) => handleButtonHover(e, true, 'secondary')}
              onMouseLeave={(e) => handleButtonHover(e, false, 'secondary')}
            >
              Liên hệ
            </button>
          </div>

          <button
            className="max-lg:hidden text-[#64748B] p-2"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="max-lg:hidden bg-white border-t border-[#E2E8F0] py-4">
            <nav className="flex flex-col gap-4">
              <a href="#challenges" className="text-[#64748B] px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Thách thức
              </a>
              <a href="#solutions" className="text-[#64748B] px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Giải pháp
              </a>
              <a href="#success" className="text-[#64748B] px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Thành công
              </a>
              <a href="#contact" className="text-[#64748B] px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Liên hệ
              </a>
              <div className="px-4 pt-2 flex flex-col gap-2">
                <button className="w-full px-6 py-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-xl font-semibold">
                  Dùng thử miễn phí
                </button>
                <button className="w-full px-6 py-2 border-2 border-[#6366F1] text-[#6366F1] rounded-xl font-semibold">
                  Liên hệ
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
