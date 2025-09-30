import Header1 from "./Header1";



export default function Layout1({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header1 />
            <main className="flex-1">{children}</main>
            <footer className="border-t">
                <div className="container py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
                    <p>
                        © {new Date().getFullYear()} AIMindmap. Tăng tốc tư duy với AI.
                    </p>
                    <div className="flex items-center gap-3">
                        <a className="hover:text-foreground" href="#features">Tính năng</a>
                        <a className="hover:text-foreground" href="#pricing">Giá</a>
                        <a className="hover:text-foreground" href="#faq">FAQ</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
