import { useNavigate, useLocation } from "react-router-dom";

import { ArrowLeft, Layers3 } from "lucide-react";
import { cn } from "./lib/utils";
import { Button } from "./ui/Button";



export function Layout({ children, title, showBackButton = true }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-4">
                        {showBackButton && !isHomePage && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate("/")}
                                className="hover:bg-primary/10"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Trang chủ
                            </Button>
                        )}

                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Layers3 className="w-5 h-5 text-primary" />
                            </div>
                            <h1 className={cn("font-bold", title ? "text-lg" : "text-xl")}>
                                {title || "FlashCard Master"}
                            </h1>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container py-8">{children}</main>
        </div>
    );
}
