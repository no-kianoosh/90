
import { DropdownMenu, Button, IconButton, Dialog, Flex, TextField } from "@radix-ui/themes";
import { Car, List, Cross, CarTaxiFront, PersonStanding, Download, Search } from "lucide-react";
import { useState } from "react"
import { useContext } from 'react';
import { scrollAndShine } from "../components/desk-comp/Card1";
import { Download_Modal, Login_Modal, Rules_Modal } from "./Modals"
import { G, GSet } from "./../bmr1"

const NavigationDesktop = () => {

    return (
        <nav className="flex items-center justify-between bg-opacity-5 px-4 py-3 shadow-md text-blue-900 rounded-sm m-1">
            <div className="flex flex-row gap-3">
                <DropdownMenu.Root dir="rtl">
                    <DropdownMenu.Trigger>
                        <IconButton color="pink" variant="solid" className=" !py-4.5">
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
                <Button color="red" variant="surface" className="!border !cursor-pointer  !py-4.5 !bg-white"
                    onClick={() => GSet((O) => { O.mod.login = true; O.user.type = "رانندگان" })}>
                    <div>ثبت سفر جدید</div>
                    <Cross width="18" height="18" />
                </Button>
                <Button onClick={scrollAndShine} color="blue" variant="surface" className="!border !cursor-pointer !bg-white !py-4.5" >
                    <div>جستجوی سفر</div>
                    <Search width="22" height="22" />
                </Button>
                <Button color="red" variant="classic" className="!border !cursor-pointer  !py-4.5" >
                    <div>ورود رانندگان</div>
                    <CarTaxiFront width="18" height="18" />
                </Button>
                <Button color="blue" variant="classic" className="!border !cursor-pointer  !py-4.5" >
                    <div>ورود مسافران</div>
                    <PersonStanding width="18" height="18" />
                </Button>
            </div>
            <div className="flex flex-row gap-3 items-center">
                <Button onClick={() => GSet((O) => O.mod.download = true)}
                    color="jade" variant="solid" className="!border !cursor-pointer !flex-1" >
                    <div>دانلود</div>
                    <Download height="18" />
                </Button>
                <Download_Modal />
                <Login_Modal />
                <Rules_Modal />
                <img className="size-10 rounded-2xl border border-lime-400" src="/img/logo.jpg" alt="Login background" />
            </div>
        </nav >
    );
};


export default NavigationDesktop;
