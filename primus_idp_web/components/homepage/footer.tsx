"use client";
import {
	IconBrandDiscord,
	IconBrandGithub,
	IconBrandLinkedin,
	IconBrandTwitter,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { cn } from "@/lib/utils";

export function Footer() {
	const pages = [
		{
			title: "Documentation",
			href: "/docs",
		},
		{
			title: "Pricing",
			href: "/pricing",
		},
		{
			title: "Privacy",
			href: "/privacy",
		},
		{
			title: "Terms",
			href: "/terms",
		},
	];

	return (
		<div className="border-t border-[#D36B3C]/30 px-8 py-20 w-full relative overflow-hidden bg-gradient-to-b from-transparent via-[#0A0A0F] to-[#1A1518]">
			<div className="max-w-7xl mx-auto text-sm text-[#7A7A75] justify-between items-start md:px-8">
				<div className="flex flex-col items-center justify-center w-full relative">
					<div className="mr-0 md:mr-4 md:flex mb-4">
						<div className="flex items-center gap-2">
							<Image src="/logo.svg" alt="Primus IDP" width={32} height={32} className="rounded-lg" />
							<span className="font-bold text-xl bg-gradient-to-r from-[#A7E4FF] to-[#E24632] bg-clip-text text-transparent">Primus IDP</span>
						</div>
					</div>
					<p className="text-center text-[#7A7A75] max-w-md mb-6">
						Your own localized AI research assistant with RAG capabilities. Self-hosted, privacy-first, and fully customizable.
					</p>

					<ul className="transition-colors flex sm:flex-row flex-col hover:text-text-neutral-800 text-[#7A7A75] list-none gap-4 flex-wrap justify-center">
						{pages.map((page) => (
							<li key={`pages-${page.title}`} className="list-none">
								<Link className="transition-colors hover:text-[#A7E4FF]" href={page.href}>
									{page.title}
								</Link>
							</li>
						))}
					</ul>

					<GridLineHorizontal className="max-w-7xl mx-auto mt-8" />
				</div>
				<div className="flex sm:flex-row flex-col justify-between mt-8 items-center w-full">
					<p className="text-[#7A7A75] dark:text-[#7A7A75] mb-8 sm:mb-0">
						&copy; {new Date().getFullYear()} Primus IDP. Open Source under MIT License.
					</p>
					<div className="flex gap-4">
						<Link href="https://x.com/mod_setter" target="_blank" rel="noopener noreferrer" className="hover:text-[#A7E4FF] dark:hover:text-[#E24632] transition-colors">
							<IconBrandTwitter className="h-6 w-6" />
						</Link>
						<Link href="https://www.linkedin.com/in/rohan-verma-sde/" target="_blank" rel="noopener noreferrer" className="hover:text-[#A7E4FF] dark:hover:text-[#E24632] transition-colors">
							<IconBrandLinkedin className="h-6 w-6" />
						</Link>
						<Link href="https://github.com/khanakkijpr-dot/Primus-IDP" target="_blank" rel="noopener noreferrer" className="hover:text-[#A7E4FF] dark:hover:text-[#E24632] transition-colors">
							<IconBrandGithub className="h-6 w-6" />
						</Link>
						<Link href="https://discord.gg/ejRNvftDp9" target="_blank" rel="noopener noreferrer" className="hover:text-[#A7E4FF] dark:hover:text-[#E24632] transition-colors">
							<IconBrandDiscord className="h-6 w-6" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

const GridLineHorizontal = ({ className, offset }: { className?: string; offset?: string }) => {
	return (
		<div
			style={
				{
					"--background": "#ffffff",
					"--color": "rgba(0, 0, 0, 0.2)",
					"--height": "1px",
					"--width": "5px",
					"--fade-stop": "90%",
					"--offset": offset || "200px", //-100px if you want to keep the line inside
					"--color-dark": "rgba(255, 255, 255, 0.2)",
					maskComposite: "exclude",
				} as React.CSSProperties
			}
			className={cn(
				"w-[calc(100%+var(--offset))] h-[var(--height)]",
				"bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
				"[background-size:var(--width)_var(--height)]",
				"[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
				"[mask-composite:exclude]",
				"z-30",
				"dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
				className
			)}
		></div>
	);
};


