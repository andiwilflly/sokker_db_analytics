"use client";
import { usePathname } from "next/navigation";
import React from "react";

export function withPathname<P extends { pathname: string }>(WrappedComponent: React.ComponentType<P>) {
	return function PathnameWrapper(props: Omit<P, "pathname">) {
		const pathname = usePathname();
		return <WrappedComponent {...(props as P)} pathname={pathname} />;
	};
}
