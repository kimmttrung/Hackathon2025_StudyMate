const ContactSection = () => {
    const handleButtonHover = (e, isEntering, type) => {
        if (type === 'primary') {
            if (isEntering) {
                e.target.style.transform = 'translateY(-3px) scale(1.05)';
                e.target.style.boxShadow = '0 25px 50px -12px rgba(255, 255, 255, 0.5)';
            } else {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
            }
        } else if (type === 'secondary') {
            if (isEntering) {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
            } else {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.transform = 'translateY(0)';
            }
        }
    };

    return (
        <section
            id="contact"
            className="py-20 bg-gradient-to-br from-[#6366F1] via-[#8B5CF6] to-[#EC4899]"
        >
            <div className="max-w-4xl mx-auto px-6 max-sm:px-4 text-center">
                <h2 className="text-5xl max-sm:text-3xl font-bold text-white mb-6">
                    Sẵn sàng thành công?
                </h2>

                <p className="text-2xl max-sm:text-lg text-white opacity-90 mb-10 max-w-2xl mx-auto">
                    Tham gia cùng hàng nghìn sinh viên đã cải thiện kết quả học tập
                </p>

                <div className="flex flex-col max-sm:flex-col items-center gap-6 max-sm:gap-4">
                    <button
                        className="px-12 py-5 bg-white text-[#6366F1] rounded-2xl font-bold text-2xl shadow-2xl transition-all duration-300 max-sm:w-full"
                        onMouseEnter={(e) => handleButtonHover(e, true, 'primary')}
                        onMouseLeave={(e) => handleButtonHover(e, false, 'primary')}
                    >
                        🎯 Dùng thử miễn phí ngay
                    </button>

                    <button
                        className="px-12 py-5 border-3 border-white text-white rounded-2xl font-bold text-2xl transition-all duration-300 max-sm:w-full"
                        onMouseEnter={(e) => handleButtonHover(e, true, 'secondary')}
                        onMouseLeave={(e) => handleButtonHover(e, false, 'secondary')}
                    >
                        📞 Liên hệ tư vấn
                    </button>
                </div>

                <div className="mt-12 text-white opacity-75">
                    <p className="text-lg">📧 support@studymaster.vn | 📱 1900-123</p>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;
