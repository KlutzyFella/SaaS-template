"use client"
import React, { useState } from 'react'; // Fixed: Changed '=>' to 'from'
// import { UserButton } from "@clerk/nextjs"; // Removed due to compilation error
import { Wind, PlusCircle, Edit, Trash2, User } from "lucide-react"; // Added User icon

// Assuming these Shadcn UI components are available at these paths
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Define a simple type for your items for better readability and structure
interface Item {
    id: string;
    title: string;
    description: string;
    status: string; // Example status field
}

function DashboardPage() {
    // State to hold your CRUD items. Initialized with some dummy data.
    const [items, setItems] = useState<Item[]>([
        { id: '1', title: 'Task Management App', description: 'Build a comprehensive task management application with user authentication and real-time updates.', status: 'In Progress' },
        { id: '2', title: 'Client Onboarding Portal', description: 'Develop a portal for new clients to submit their information and track onboarding progress.', status: 'Completed' },
        { id: '3', title: 'Project Tracking Dashboard', description: 'Create an interactive dashboard to visualize project timelines, resource allocation, and budget.', status: 'Pending' },
        { id: '4', title: 'Inventory Management System', description: 'Design and implement a system to track product inventory, sales, and supplier details.', status: 'Backlog' },
    ]);

    // State for managing the visibility of the "Create New Item" dialog
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    // State for managing the visibility of the "Edit Item" dialog
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    // State for managing the visibility of the "Delete Item" dialog
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    // State to store the item currently being edited or deleted
    const [currentItem, setCurrentItem] = useState<Item | null>(null);

    /**
     * Handles the creation of a new item.
     * Adds the new item to the 'items' state and closes the dialog.
     * @param newItem The new item object to add.
     */
    const handleCreateItem = (newItem: Omit<Item, 'id'>) => {
        // Generate a unique ID for the new item (in a real app, this might come from a database)
        setItems([...items, { id: Date.now().toString(), ...newItem }]);
        setIsCreateDialogOpen(false); // Close the dialog after creation
    };

    /**
     * Handles the updating of an existing item.
     * Maps through the 'items' state to find and update the specific item.
     * @param updatedItem The updated item object.
     */
    const handleEditItem = (updatedItem: Item) => {
        setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
        setIsEditDialogOpen(false); // Close the dialog after editing
        setCurrentItem(null); // Clear the current item
    };

    /**
     * Handles the deletion of an item.
     * Filters the 'items' state to remove the item with the given ID.
     * @param itemId The ID of the item to delete.
     */
    const handleDeleteItem = (itemId: string) => {
        setItems(items.filter(item => item.id !== itemId));
        setIsDeleteDialogOpen(false); // Close the dialog after deletion
        setCurrentItem(null); // Clear the current item
    };

    return (
        <div className="min-h-screen bg-background font-sans">
            {/* Header - User's existing code */}
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

                    {/* User Profile - Replaced Clerk UserButton with a placeholder for compilation */}
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                           <User className="w-6 h-6" />
                        </div>
                        {/* Original Clerk UserButton code (commented out for compilation)
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
                        */}
                    </div>
                </div>
            </header>

            {/* Main Content Area for CRUD components */}
            <main className="container mx-auto px-4 py-8">
                {/* This div centers the content and constrains its width */}
                <div className="max-w-4xl mx-auto">
                    {/* Section header and Create New Item button */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">Your Items</h2>
                        {/* Dialog for creating a new item */}
                        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="flex items-center gap-2 rounded-md shadow-sm hover:shadow-md transition-shadow">
                                    <PlusCircle className="w-5 h-5" />
                                    Create New Item
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] rounded-lg shadow-lg">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-semibold text-gray-800">Create New Item</DialogTitle>
                                </DialogHeader>
                                {/* Form for new item submission */}
                                <form onSubmit={(e) => {
                                    e.preventDefault(); // Prevent default form submission
                                    const formData = new FormData(e.target as HTMLFormElement); // Get form data
                                    handleCreateItem({
                                        title: formData.get('title') as string,
                                        description: formData.get('description') as string,
                                        status: 'New' // Default status for new items
                                    });
                                }}>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="title" className="text-right text-base font-medium">
                                                Title
                                            </Label>
                                            <Input id="title" name="title" className="col-span-3 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500" required />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="description" className="text-right text-base font-medium">
                                                Description
                                            </Label>
                                            <Textarea id="description" name="description" className="col-span-3 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500" required />
                                        </div>
                                    </div>
                                    <Button type="submit" className="w-full rounded-md shadow-sm hover:shadow-md transition-shadow">Add Item</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Grid for displaying items (CRUD components) - now a single column */}
                    <div className="grid grid-cols-1 gap-6"> {/* Changed from md:grid-cols-2 to grid-cols-1 */}
                        {items.map((item) => (
                            <Card key={item.id} className="w-full rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-gray-800">{item.title}</CardTitle>
                                    <CardDescription className="text-md text-gray-600 mt-1">{item.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-base text-gray-700">Status: <span className="font-semibold text-blue-700">{item.status}</span></p>
                                </CardContent>
                                <CardFooter className="flex justify-end gap-2">
                                    {/* Dialog for editing an item */}
                                    <Dialog open={isEditDialogOpen && currentItem?.id === item.id} onOpenChange={(open) => {
                                        setIsEditDialogOpen(open);
                                        // Clear current item when dialog closes
                                        if (!open) setCurrentItem(null);
                                    }}>
                                        <DialogTrigger asChild>
                                            {/* Set current item when edit button is clicked */}
                                            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-600 rounded-full transition-colors duration-200" onClick={() => setCurrentItem(item)}>
                                                <Edit className="w-5 h-5" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px] rounded-lg shadow-lg">
                                            <DialogHeader>
                                                <DialogTitle className="text-2xl font-semibold text-gray-800">Edit Item</DialogTitle>
                                            </DialogHeader>
                                            {/* Display edit form only if currentItem is set */}
                                            {currentItem && (
                                                <form onSubmit={(e) => {
                                                    e.preventDefault();
                                                    const formData = new FormData(e.target as HTMLFormElement);
                                                    handleEditItem({
                                                        ...currentItem, // Preserve original ID and other properties
                                                        title: formData.get('title') as string,
                                                        description: formData.get('description') as string,
                                                        status: formData.get('status') as string,
                                                    });
                                                }}>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="edit-title" className="text-right text-base font-medium">
                                                                Title
                                                            </Label>
                                                            <Input id="edit-title" name="title" defaultValue={currentItem.title} className="col-span-3 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500" required />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="edit-status" className="text-right text-base font-medium">
                                                                Status
                                                            </Label>
                                                            <Input id="edit-status" name="status" defaultValue={currentItem.status} className="col-span-3 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500" required />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="edit-description" className="text-right text-base font-medium">
                                                                Description
                                                            </Label>
                                                            <Textarea id="edit-description" name="description" defaultValue={currentItem.description} className="col-span-3 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500" required />
                                                        </div>
                                                    </div>
                                                    <Button type="submit" className="w-full rounded-md shadow-sm hover:shadow-md transition-shadow">Save Changes</Button>
                                                </form>
                                            )}
                                        </DialogContent>
                                    </Dialog>

                                    {/* Dialog for deleting an item */}
                                    <Dialog open={isDeleteDialogOpen && currentItem?.id === item.id} onOpenChange={(open) => {
                                        setIsDeleteDialogOpen(open);
                                        // Clear current item when dialog closes
                                        if (!open) setCurrentItem(null);
                                    }}>
                                        <DialogTrigger asChild>
                                            {/* Set current item when delete button is clicked */}
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 rounded-full transition-colors duration-200" onClick={() => setCurrentItem(item)}>
                                                <Trash2 className="w-5 h-5" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px] rounded-lg shadow-lg">
                                            <DialogHeader>
                                                <DialogTitle className="text-2xl font-semibold text-gray-800">Delete Item</DialogTitle>
                                            </DialogHeader>
                                            {/* Display confirmation message only if currentItem is set */}
                                            {currentItem && (
                                                <>
                                                    <p className="text-gray-700 text-base">Are you sure you want to delete "<span className="font-semibold text-gray-900">{currentItem.title}</span>"? This action cannot be undone.</p>
                                                    <div className="flex justify-end gap-3 mt-4">
                                                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="rounded-md shadow-sm hover:shadow-md transition-shadow">Cancel</Button>
                                                        <Button variant="destructive" onClick={() => handleDeleteItem(currentItem.id)} className="rounded-md shadow-sm hover:shadow-md transition-shadow">Delete</Button>
                                                    </div>
                                                </>
                                            )}
                                        </DialogContent>
                                    </Dialog>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default DashboardPage;