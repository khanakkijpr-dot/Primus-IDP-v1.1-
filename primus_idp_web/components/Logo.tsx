"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
	return (
		<Link href="/">
			<Image src="/logo.svg" className={cn(className)} alt="Primus IDP logo" width={128} height={128} />
		</Link>
	);
};


