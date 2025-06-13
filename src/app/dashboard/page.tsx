import { UserButton } from "@clerk/nextjs"
import { Wind } from "lucide-react"

function DashboardPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    {/* Logo and Brand */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                            <Wind className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Startup Name</h1>
                            {/* <p className="text-sm text-gray-500">Cloud Storage</p> */}
                        </div>
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center gap-4">
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10",
                                    userButtonPopoverCard: "shadow-lg",
                                },
                            }}
                            showName={false}
                            userProfileMode="modal"
                        />
                    </div>
                </div>
            </header>
        </div>
    )
};

export default DashboardPage;
