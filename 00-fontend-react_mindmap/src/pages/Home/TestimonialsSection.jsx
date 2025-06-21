
import { useState, useEffect } from 'react';

const TestimonialsSection = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const testimonials = [
        {
            name: 'Nguyễn Văn A',
            text: 'Đã giúp tôi đạt điểm cao trong kỳ thi cuối kỳ!',
            score: '9.5/10'
        },
        {
            name: 'Trần Thị B',
            text: 'Mindmap và flashcard rất hữu ích cho việc ghi nhớ',
            score: '9.8/10'
        },
        {
            name: 'Lê Văn C',
            text: 'Lộ trình học tập rõ ràng, dễ theo dõi tiến độ',
            score: '9.7/10'
        }
    ];

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    useEffect(() => {
        const interval = setInterval(nextTestimonial, 4000);
        return () => clearInterval(interval);
    }, []);

    const handleDotClick = (index) => {
        setCurrentTestimonial(index);
    };

    return (
        <section id="success" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 max-sm:px-4">
                <div className="text-center mb-16">
                    <h2 className="text-5xl max-sm:text-3xl font-bold text-[#1E293B] mb-6">
                        Hàng nghìn người đã thành công
                    </h2>
                    <p className="text-xl max-sm:text-lg text-[#64748B] max-w-3xl mx-auto">
                        Sinh viên từ khắp nơi đã cải thiện điểm số với StudyMaster
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF] p-10 rounded-3xl shadow-2xl border border-[#C7D2FE]">
                        <div className="flex items-center gap-6 mb-8">
                            <img
                                src="https://placehold.co/80x80/6366F1/FFFFFF"
                                alt="Avatar"
                                className="w-20 h-20 rounded-full shadow-lg"
                            />
                            <div>
                                <h4 className="text-2xl font-bold text-[#1E293B]">
                                    {testimonials[currentTestimonial].name}
                                </h4>
                                <p className="text-[#64748B] text-lg">Sinh viên xuất sắc</p>
                                <div className="flex gap-1 mt-2">
                                    <span className="text-2xl">⭐</span>
                                    <span className="text-2xl">⭐</span>
                                    <span className="text-2xl">⭐</span>
                                    <span className="text-2xl">⭐</span>
                                    <span className="text-2xl">⭐</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-2xl text-[#1E293B] leading-relaxed mb-6">
                            {testimonials[currentTestimonial].text}
                        </p>

                        <div className="text-3xl font-bold text-[#6366F1]">
                            {testimonials[currentTestimonial].score}
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className="w-4 h-4 rounded-full transition-all duration-300"
                                style={{
                                    backgroundColor: currentTestimonial === index ? '#6366F1' : '#CBD5E1'
                                }}
                                onClick={() => handleDotClick(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TestimonialsSection;
