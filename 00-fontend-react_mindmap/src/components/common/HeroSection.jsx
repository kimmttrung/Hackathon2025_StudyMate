const HeroSection = () => {
  const handleButtonHover = (e, isEntering, type) => {
    if (type === 'primary') {
      if (isEntering) {
        e.target.style.transform = 'translateY(-3px) scale(1.02)';
        e.target.style.boxShadow = '0 25px 50px -12px rgba(99, 102, 241, 0.4)';
      } else {
        e.target.style.transform = 'translateY(0) scale(1)';
        e.target.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
      }
    } else if (type === 'secondary') {
      if (isEntering) {
        e.target.style.backgroundColor = '#6366F1';
        e.target.style.color = 'white';
        e.target.style.transform = 'translateY(-2px)';
      } else {
        e.target.style.backgroundColor = 'white';
        e.target.style.color = '#6366F1';
        e.target.style.transform = 'translateY(0)';
      }
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#EEF2FF] via-[#F1F5F9] to-[#FEF3C7]">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] opacity-10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#F59E0B] to-[#EAB308] rounded-full opacity-20 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full opacity-20 blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 transform-[translate(-50%,-50%)] w-80 h-80 bg-gradient-to-r from-[#EC4899] to-[#BE185D] rounded-full opacity-15 blur-3xl animate-pulse" />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 max-sm:px-4">
        <h1 className="text-6xl max-sm:text-4xl font-bold text-[#1E293B] mb-6 leading-tight">
          <span>Chinh phục mọi kỳ thi với </span>
          <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
            StudyMaster
          </span>
        </h1>

        <p className="text-2xl max-sm:text-lg text-[#64748B] mb-8 leading-relaxed max-w-3xl mx-auto">
          Nền tảng học tập thông minh với AI, tạo mindmap, flashcard và lộ
          trình học tập cá nhân hóa
        </p>

        <div className="flex flex-col max-sm:flex-col items-center gap-6 max-sm:gap-4">
          <button
            className="px-10 py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-2xl font-bold text-xl shadow-2xl transition-all duration-300 max-sm:w-full"
            onMouseEnter={(e) => handleButtonHover(e, true, 'primary')}
            onMouseLeave={(e) => handleButtonHover(e, false, 'primary')}
          >
            🚀 Bắt đầu miễn phí ngay
          </button>
          <button
            className="px-10 py-4 bg-white border-2 border-[#6366F1] text-[#6366F1] rounded-2xl font-bold text-xl shadow-xl transition-all duration-300 max-sm:w-full"
            onMouseEnter={(e) => handleButtonHover(e, true, 'secondary')}
            onMouseLeave={(e) => handleButtonHover(e, false, 'secondary')}
          >
            📹 Xem demo
          </button>
        </div>

        <div className="mt-12 grid grid-cols-3 max-sm:grid-cols-1 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#6366F1] mb-2">
              10,000+
            </div>
            <div className="text-[#64748B] font-medium">
              Sinh viên tin dùng
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#10B981] mb-2">
              95%
            </div>
            <div className="text-[#64748B] font-medium">
              Cải thiện điểm số
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#F59E0B] mb-2">
              4.9/5
            </div>
            <div className="text-[#64748B] font-medium">
              Đánh giá người dùng
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
