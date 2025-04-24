"use client";
import {useStore} from "@/app/provider";
import {Menu, Tag} from "antd";
import {observer} from "mobx-react";
import Link from "next/link";
import React from "react";

function Sidebar({pagesPaths}: { pagesPaths: string[] }) {
	const store = useStore(); // Get the store from context
	const [selectedPath, setSelectedPath] = React.useState<string | null>(null);

	React.useEffect(() => {
		const match = window.location.pathname.match(/transfers\/(\S+)/);
		if (match) setSelectedPath(match[1]);
	}, []);

	return (
		<>
			<Menu
				mode="inline"
				key={selectedPath}
				defaultSelectedKeys={selectedPath ? [selectedPath] : []}
				style={{height: "100%", borderRight: 0}}
				items={pagesPaths.map(pagePath => {
					const chartType = pagePath.split("_")[0];
					const name = pagePath.split("_")[1]?.replace(/-/g, " ");
					return {
						key: pagePath,
						label: (
							<Link href={`/transfers/${pagePath}${store.filters.query}`}>
								<Tag color="error"
								     className="text-center! w-10 h-6 flex items-center justify-center p-0">{chartType}</Tag>
								<span className="text-xs">{name}</span>
							</Link>
						),
					}
				})}
			/>
		</>
	);
}

export default observer(Sidebar);
