
import { cn } from "./lib/utils";
import { Card, CardContent } from "./ui/card";


export function NavigationCard({
    title,
    description,
    icon: Icon,
    onClick,
    className,
    iconColor,
}) {
    return (
        <Card
            className={cn(
                "group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 overflow-hidden",
                "hover:border-primary/50 active:scale-95",
                className,
            )}
            onClick={onClick}
        >
            <CardContent className="p-8 text-center space-y-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div
                    className={cn(
                        "w-16 h-16 mx-auto rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
                        iconColor || "bg-primary/10 text-primary",
                    )}
                >
                    <Icon className="w-8 h-8" />
                </div>

                <div className="space-y-2 relative z-10">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </CardContent>
        </Card>
    );
}
