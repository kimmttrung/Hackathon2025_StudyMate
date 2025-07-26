import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function PlaceholderPage({ title, description, icon: Icon }) {
    const IconComponent = Icon || Construction;

    return (
        <Layout>
            <div className="p-6 max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">

                    </h1>
                    <p className="text-muted-foreground mt-2">{description}</p>
                </div>

                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="flex items-center justify-center gap-2 text-xl">
                            <Construction className="w-6 h-6 text-primary" />
                            Trang đang được phát triển
                        </CardTitle>
                        <CardDescription>
                            Tính năng này sẽ sớm được bổ sung. Hãy tiếp tục prompt để yêu cầu tôi hoàn thiện trang này.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Trang <strong>{title}</strong> sẽ bao gồm tất cả các tính năng cần thiết cho việc cài đặt và quản lý.
                        </p>
                        <Button variant="outline" className="mt-4">
                            Yêu cầu hoàn thiện trang này
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </Layout>

    );
}
