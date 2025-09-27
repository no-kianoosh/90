
import { DropdownMenu, Button, IconButton, Dialog, Flex, TextField } from "@radix-ui/themes";
import { Car, List, Cross, CarTaxiFront, PersonStanding, Download } from "lucide-react";
import { useState } from "react"

const NavigationDesktop = () => {
    return (
        <nav className="flex items-center justify-between  px-6 py-3 shadow-md text-blue-900 rounded-sm m-1" style={{ background: "repeating-linear-gradient(180deg, #f9f9f9, #f9f9f9 1px, #e5e7eb 1px, #e5e7eb 2px)", }}>
            <div className="flex flex-row gap-3">
                <DropdownMenu.Root dir="rtl">
                    <DropdownMenu.Trigger>
                        <IconButton color="pink" variant="solid" >
                            <List width="18" height="18" />
                        </IconButton>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content >

                        <DropdownMenu.Item color="red" className="w-full flex justify-between cursor-pointer gap-3" ><div>درباره ما</div>
                            <div>⌘</div>
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item color="blue" className="w-full flex justify-between cursor-pointer"><div>درباره ما</div>
                            <div>⌘</div>
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item color="black" className="w-full flex justify-between cursor-pointer"><div>درباره ما</div>
                            <div>⌘</div>
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item color="green" className="w-full flex justify-between cursor-pointer"><div>درباره ما</div>
                            <div>⌘</div>
                        </DropdownMenu.Item>

                    </DropdownMenu.Content>
                </DropdownMenu.Root>
                <Button color="red" variant="surface" className="!border !cursor-pointer" >
                    <div>ثبت سفر جدید</div>
                    <Cross width="18" height="18" />
                </Button>
                <Button color="blue" variant="surface" className="!border !cursor-pointer" >
                    <div>جستجوی سفر</div>
                    <Car width="22" height="22" />
                </Button>
                <Button color="red" variant="classic" className="!border !cursor-pointer" >
                    <div>ورود رانندگان</div>
                    <CarTaxiFront width="18" height="18" />
                </Button>
                <Button color="blue" variant="classic" className="!border !cursor-pointer" >
                    <div>ورود مسافران</div>
                    <PersonStanding width="18" height="18" />
                </Button>
            </div>
            <div className="flex flex-row gap-3 items-center">
                <Button color="jade" variant="solid" className="!border !cursor-pointer !flex-1" >
                    <div>دانلود</div>
                    <Download height="18" />
                </Button>
                <img className="size-10 rounded-2xl border border-lime-400" src="/img/logo.jpg" alt="Login background" />
                <ProfileDialog />
            </div>

        </nav>
    );

    function ProfileDialog() {
        const [open, setOpen] = useState(false);

        // JS function to open dialog
        const openDialog = () => setOpen(true);
        const closeDialog = () => setOpen(false);

        return (
            <>
                <Button onClick={openDialog}>Open via JS</Button>
                <Dialog.Root open={open} onOpenChange={setOpen}>
                    <Dialog.Content maxWidth="450px" onInteractOutside={(event) => event.preventDefault()}>
                        <div className="bg-blue-400 min-h-100"></div>
                    </Dialog.Content>
                </Dialog.Root>
            </>
        );
    }

};


export default NavigationDesktop;
