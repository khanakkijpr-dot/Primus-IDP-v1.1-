"use client";
import { motion } from "motion/react";
import Link from "next/link";
import React from "react";
import Balancer from "react-wrap-balancer";
import { 
	Brain, 
	Search, 
	MessageSquare, 
	Sparkles,
	ArrowRight
} from "lucide-react";

export function HeroSection() {
	return (
		<div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 md:px-8 md:py-32">
			{/* Gradient Background - Cinematic Dark Style */}
			<div className="absolute inset-0 -z-10">
				{/* Base gradient - Blood Red to Midnight */}
				<div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0F] via-[#1A1518] to-[#0A0A0F] dark:from-[#0A0A0F] dark:via-[#1A1518] dark:to-[#0A0A0F]" />
				
				{/* Hero Glow - Dramatic red lighting */}
				<div className="absolute top-0 left-[20%] w-[600px] h-[600px] bg-gradient-to-br from-[#A11218]/50 via-[#E24632]/30 to-transparent rounded-full blur-3xl" />
				<div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-gradient-to-tl from-[#D36B3C]/40 via-[#E24632]/20 to-transparent rounded-full blur-3xl" />
				
				{/* Cyber Reflection - Blue accent */}
				<div className="absolute top-1/3 right-[5%] w-[300px] h-[300px] bg-gradient-to-l from-[#A7E4FF]/30 to-transparent rounded-full blur-3xl" />
				<div className="absolute bottom-1/4 left-[5%] w-[200px] h-[200px] bg-gradient-to-r from-[#A7E4FF]/20 to-transparent rounded-full blur-2xl" />
			</div>

			{/* Decorative 3D Ring Element */}
			<motion.div
				initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
				animate={{ opacity: 1, scale: 1, rotate: 0 }}
				transition={{ duration: 1, delay: 0.5 }}
				className="absolute right-[5%] top-[20%] hidden lg:block"
			>
				<div className="relative w-48 h-48">
					<div className="absolute inset-0 rounded-full opacity-80" 
						style={{
							background: 'conic-gradient(from 0deg, #A11218, #E24632, #D36B3C, #A7E4FF, #A11218)',
							WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 16px), #fff 0)',
							mask: 'radial-gradient(farthest-side, transparent calc(100% - 16px), #fff 0)'
						}}
					/>
					<div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#533025] to-[#0A0A0F] opacity-40" />
				</div>
			</motion.div>

			{/* Badge */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="mb-8"
			>
				<span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-[#A11218] to-[#E24632] text-[#E8C3A1] shadow-lg shadow-[#A11218]/30">
					<Sparkles className="w-4 h-4" />
					Self-Hosted • Privacy-First • 100+ LLMs
				</span>
			</motion.div>

			{/* Main Heading */}
			<motion.h1
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
				className="relative z-10 mx-auto mb-6 max-w-5xl text-center text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
			>
				<Balancer>
					<span className="text-[#E8C3A1]">Your </span>
					<span className="italic font-light text-[#7A7A75]">Personal</span>
					<br />
					<span className="bg-gradient-to-r from-[#A7E4FF] via-[#E24632] to-[#D36B3C] bg-clip-text text-transparent">
						AI Research
					</span>
					<span className="text-[#E8C3A1]"> Assistant</span>
				</Balancer>
			</motion.h1>

			{/* Subtitle */}
			<motion.p
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="relative z-10 mx-auto max-w-2xl text-center text-lg md:text-xl text-[#7A7A75] mb-10 leading-relaxed"
			>
				Connect your knowledge base with AI. Integrate Slack, Notion, GitHub, and 15+ tools. 
				Search, chat, and generate insights with powerful RAG capabilities.
			</motion.p>

			{/* CTA Buttons */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.3 }}
				className="flex flex-col sm:flex-row items-center gap-4 mb-20"
			>
				<Link
					href="/register"
					className="group flex items-center justify-center gap-2 h-14 px-10 rounded-full bg-gradient-to-r from-[#A7E4FF] to-[#A7E4FF]/80 text-[#0A0A0F] font-semibold text-lg shadow-xl shadow-[#A7E4FF]/30 hover:shadow-2xl hover:shadow-[#A7E4FF]/40 transition-all duration-300 hover:-translate-y-1"
				>
					Get Started Free
					<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
				</Link>
				<Link
					href="/docs"
					className="flex items-center justify-center h-14 px-10 rounded-full bg-[#533025]/50 text-[#E8C3A1] font-semibold text-lg border-2 border-[#D36B3C]/50 hover:bg-[#D36B3C]/30 hover:border-[#D36B3C] transition-all duration-300 backdrop-blur-sm"
				>
					View Documentation
				</Link>
			</motion.div>

			{/* Feature Cards - Glass morphism style */}
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4 }}
				className="relative z-10 w-full max-w-5xl"
			>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<FeatureCard
						icon={Search}
						title="Hybrid Search"
						description="Vector + full-text search for precise results across your entire knowledge base"
					/>
					<FeatureCard
						icon={MessageSquare}
						title="Chat with Docs"
						description="Conversational AI that understands context and provides cited answers"
					/>
					<FeatureCard
						icon={Brain}
						title="AI Research Agent"
						description="Autonomous research with multi-step reasoning and source verification"
					/>
				</div>
			</motion.div>

			{/* Integration Badges */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.6 }}
				className="mt-20 text-center"
			>
				<p className="text-sm font-medium text-[#7A7A75] mb-5 uppercase tracking-wider">
					Integrates with your favorite tools
				</p>
				<div className="flex flex-wrap justify-center gap-3">
					{["Notion", "Slack", "GitHub", "Google Drive", "Confluence", "Jira"].map((tool) => (
						<span
							key={tool}
							className="px-4 py-2 text-sm font-medium bg-[#533025]/60 text-[#E8C3A1] rounded-full border border-[#D36B3C]/30 backdrop-blur-sm"
						>
							{tool}
						</span>
					))}
					<span className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-[#E24632] to-[#D36B3C] text-[#0A0A0F] rounded-full shadow-md">
						+15 more
					</span>
				</div>
			</motion.div>
		</div>
	);
}

const FeatureCard = ({ 
	icon: Icon, 
	title, 
	description 
}: { 
	icon: React.ElementType; 
	title: string; 
	description: string;
}) => {
	return (
		<motion.div 
			whileHover={{ y: -5, scale: 1.02 }}
			className="group relative p-8 rounded-3xl bg-[#533025]/70 backdrop-blur-xl border border-[#D36B3C]/30 shadow-xl shadow-[#A11218]/10 hover:shadow-2xl hover:shadow-[#A11218]/20 transition-all duration-300"
		>
			{/* Decorative corner accent */}
			<div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#E24632]/30 to-transparent rounded-tr-3xl rounded-bl-full" />
			
			<div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-[#A7E4FF] to-[#A7E4FF]/60 mb-5 shadow-lg shadow-[#A7E4FF]/30">
				<Icon className="w-6 h-6 text-[#0A0A0F]" />
			</div>
			<h3 className="text-xl font-bold text-[#E8C3A1] mb-3">
				{title}
			</h3>
			<p className="text-[#7A7A75] leading-relaxed">
				{description}
			</p>
		</motion.div>
	);
};


