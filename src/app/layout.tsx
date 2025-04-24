import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "antd/dist/reset.css"; // for latest AntD styling reset
import "@/styles/globals.css";
import * as fs from "node:fs";
import * as path from "node:path";
import AntdRegistry from "@/app/AntdRegistry";
import AppProvider from "@/app/provider";
import Filters from "@/components/Filters.component";
import Sidebar from "@/components/Sidebar.component";
import React from "react";
import DB from "@/db/DB";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Sokker analytics",
};

export default function RootLayout({children}: Readonly<{
	children: React.ReactNode;
}>) {
	const db = new DB().getFromToRange();
	const fromMs = db.fromMs;
	const toMs = db.toMs;
	const transfersPath = path.join(process.cwd(), "src/app/transfers");
	const pagesPaths = fs.readdirSync(transfersPath, {withFileTypes: true}).map(({name}) => name);

	return (
		<html lang="en">
		<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
		<AntdRegistry>
			<AppProvider>
				<div className="w-full flex p-2">
					<div style={{minWidth: 310}}>
						<Sidebar pagesPaths={pagesPaths}/>
					</div>

					<div className="w-full">
						{children}
					</div>

					<div style={{minWidth: 200, width: 200}}>
						<Filters fromMs={fromMs} toMs={toMs}/>
					</div>
				</div>
			</AppProvider>
		</AntdRegistry>
		</body>
		</html>
	);
}
