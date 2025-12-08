"use client";
import { IconArrowRight, IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";
import type React from "react";
import { cn } from "@/lib/utils";

export function CTAHomepage() {
	return (
		<section className="w-full grid grid-cols-1 md:grid-cols-2 my-20 md:my-20 justify-start relative z-20 max-w-7xl mx-auto bg-gradient-to-br from-[#0A0A0F] via-[#1A1518] to-[#533025] rounded-3xl overflow-hidden border border-[#D36B3C]/30">
			<GridLineHorizontal className="top-0" offset="200px" />
			<GridLineHorizontal className="bottom-0 top-auto" offset="200px" />
			<GridLineVertical className="left-0" offset="80px" />
			<GridLineVertical className="left-auto right-0" offset="80px" />
			<div className="md:col-span-1 p-8 md:p-14">
				<h2 className="text-left text-[#E8C3A1] text-xl md:text-3xl tracking-tight font-bold">
					Ready to build your own{" "}
					<span className="bg-gradient-to-r from-[#A7E4FF] to-[#E24632] bg-clip-text text-transparent">AI-powered knowledge base?</span>
				</h2>
				<p className="text-left text-[#7A7A75] mt-4 max-w-lg text-base md:text-lg">
					Primus IDP is open source and free to self-host. Get started in minutes with Docker 
					or deploy to your preferred cloud provider.
				</p>

				<div className="flex items-start sm:items-center flex-col sm:flex-row sm:gap-4 mt-8">
					<Link href="/register">
						<button
							type="button"
							className="flex space-x-2 items-center group text-base px-6 py-3 rounded-lg bg-gradient-to-r from-[#A7E4FF] to-[#A7E4FF]/80 text-[#0A0A0F] font-semibold hover:shadow-lg hover:shadow-[#A7E4FF]/30 transition-all duration-200"
						>
							<span>Get Started Free</span>
							<IconArrowRight className="group-hover:translate-x-1 h-4 w-4 transition-transform duration-200" />
						</button>
					</Link>
					<Link href="https://github.com/khanakkijpr-dot/Primus-IDP" target="_blank">
						<button
							type="button"
							className="mt-4 sm:mt-0 flex space-x-2 items-center group text-base px-6 py-3 rounded-lg text-[#E8C3A1] border border-[#D36B3C]/50 hover:bg-[#D36B3C]/20 hover:border-[#D36B3C] transition-all duration-200"
						>
							<IconBrandGithub className="h-5 w-5" />
							<span>Star on GitHub</span>
						</button>
					</Link>
				</div>
			</div>
			<div className="md:col-span-1 p-8 md:p-14 flex flex-col justify-center border-t md:border-t-0 md:border-l border-[#D36B3C]/30">
				<div className="space-y-4">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full bg-[#E24632]/20 flex items-center justify-center">
							<span className="text-[#E24632]">✓</span>
						</div>
						<span className="text-[#E8C3A1]">100% Open Source (MIT License)</span>
					</div>
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full bg-[#E24632]/20 flex items-center justify-center">
							<span className="text-[#E24632]">✓</span>
						</div>
						<span className="text-[#E8C3A1]">Self-hosted & Privacy-first</span>
					</div>
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full bg-[#E24632]/20 flex items-center justify-center">
							<span className="text-[#E24632]">✓</span>
						</div>
						<span className="text-[#E8C3A1]">Active community on Discord</span>
					</div>
				</div>
			</div>
		</section>
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
				"absolute w-[calc(100%+var(--offset))] h-[var(--height)] left-[calc(var(--offset)/2*-1)]",
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

const GridLineVertical = ({ className, offset }: { className?: string; offset?: string }) => {
	return (
		<div
			style={
				{
					"--background": "#ffffff",
					"--color": "rgba(0, 0, 0, 0.2)",
					"--height": "5px",
					"--width": "1px",
					"--fade-stop": "90%",
					"--offset": offset || "150px", //-100px if you want to keep the line inside
					"--color-dark": "rgba(255, 255, 255, 0.2)",
					maskComposite: "exclude",
				} as React.CSSProperties
			}
			className={cn(
				"absolute h-[calc(100%+var(--offset))] w-[var(--width)] top-[calc(var(--offset)/2*-1)]",
				"bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
				"[background-size:var(--width)_var(--height)]",
				"[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
				"[mask-composite:exclude]",
				"z-30",
				"dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
				className
			)}
		></div>
	);
};


