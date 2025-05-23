// app/AntdRegistry.js
"use client";

import React from "react";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import { useServerInsertedHTML } from "next/navigation";

export default function AntdRegistry({ children }: { children: React.ReactNode }) {
	const [cache] = React.useState(() => createCache());

	useServerInsertedHTML(() => {
		return (
			<style
				id="antd"
				dangerouslySetInnerHTML={{
					__html: extractStyle(cache, true),
				}}
			/>
		);
	});

	return <StyleProvider cache={cache}> {children} </StyleProvider>;
}
