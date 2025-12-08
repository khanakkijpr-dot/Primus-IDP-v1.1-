import { Brain, Database, Lock, Search, Zap, Globe } from "lucide-react";
import type { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function FeaturesCards() {
	return (
		<section className="py-12 md:py-20 dark:bg-transparent">
			<div className="@container mx-auto max-w-7xl px-4">
				<div className="text-center">
					<span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-gradient-to-r from-[#A11218] to-[#E24632] text-white rounded-full">
						Why Primus IDP?
					</span>
					<h2 className="text-balance text-4xl font-bold lg:text-5xl bg-gradient-to-r from-[#A11218] to-[#D36B3C] dark:from-[#A7E4FF] dark:to-[#E24632] bg-clip-text text-transparent">
						Your Personal AI Research Assistant
					</h2>
					<p className="mt-4 text-lg text-[#533025] dark:text-[#E8C3A1]/80 max-w-2xl mx-auto">
						Like NotebookLM and Perplexity, but connected to YOUR knowledge base and fully self-hosted.
					</p>
				</div>
				<div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-12 grid max-w-sm gap-6 *:text-center md:mt-16">
					<Card className="group shadow-lg hover:shadow-xl transition-all duration-300 border border-[#A11218]/20 hover:border-[#A11218]/50 bg-white dark:bg-[#1A1518] dark:border-[#E24632]/30 dark:hover:border-[#A7E4FF]/60">
						<CardHeader className="pb-3">
							<CardDecorator>
								<Brain className="size-6 text-[#A7E4FF]" aria-hidden />
							</CardDecorator>

							<h3 className="mt-6 font-semibold text-lg text-[#A11218] dark:text-[#E8C3A1]">Advanced RAG Pipeline</h3>
						</CardHeader>

						<CardContent>
							<p className="text-sm text-[#533025] dark:text-[#E8C3A1]/70">
								Hierarchical indices with hybrid search combining semantic + full-text search 
								using Reciprocal Rank Fusion for superior accuracy.
							</p>
						</CardContent>
					</Card>

					<Card className="group shadow-lg hover:shadow-xl transition-all duration-300 border border-[#A11218]/20 hover:border-[#A11218]/50 bg-white dark:bg-[#1A1518] dark:border-[#E24632]/30 dark:hover:border-[#A7E4FF]/60">
						<CardHeader className="pb-3">
							<CardDecorator>
								<Lock className="size-6 text-[#E24632]" aria-hidden />
							</CardDecorator>

							<h3 className="mt-6 font-semibold text-lg text-[#A11218] dark:text-[#E8C3A1]">Privacy-First & Self-Hosted</h3>
						</CardHeader>

						<CardContent>
							<p className="text-sm text-[#533025] dark:text-[#E8C3A1]/70">
								Your data stays yours. Works flawlessly with Ollama local LLMs. 
								Open source and easy to deploy on your own infrastructure.
							</p>
						</CardContent>
					</Card>

					<Card className="group shadow-lg hover:shadow-xl transition-all duration-300 border border-[#A11218]/20 hover:border-[#A11218]/50 bg-white dark:bg-[#1A1518] dark:border-[#E24632]/30 dark:hover:border-[#A7E4FF]/60">
						<CardHeader className="pb-3">
							<CardDecorator>
								<Zap className="size-6 text-[#D36B3C]" aria-hidden />
							</CardDecorator>

							<h3 className="mt-6 font-semibold text-lg text-[#A11218] dark:text-[#E8C3A1]">100+ LLMs Supported</h3>
						</CardHeader>

						<CardContent>
							<p className="text-sm text-[#533025] dark:text-[#E8C3A1]/70">
								Connect to any LLM provider - OpenAI, Anthropic, Azure, Ollama, and more. 
								6000+ embedding models and all major rerankers supported.
							</p>
						</CardContent>
					</Card>

					<Card className="group shadow-lg hover:shadow-xl transition-all duration-300 border border-[#A11218]/20 hover:border-[#A11218]/50 bg-white dark:bg-[#1A1518] dark:border-[#E24632]/30 dark:hover:border-[#A7E4FF]/60">
						<CardHeader className="pb-3">
							<CardDecorator>
								<Database className="size-6 text-[#A7E4FF]" aria-hidden />
							</CardDecorator>

							<h3 className="mt-6 font-semibold text-lg text-[#A11218] dark:text-[#E8C3A1]">50+ File Formats</h3>
						</CardHeader>

						<CardContent>
							<p className="text-sm text-[#533025] dark:text-[#E8C3A1]/70">
								Upload documents, images, videos, and more. Support for PDF, DOCX, 
								spreadsheets, presentations, and code files.
							</p>
						</CardContent>
					</Card>

					<Card className="group shadow-lg hover:shadow-xl transition-all duration-300 border border-[#A11218]/20 hover:border-[#A11218]/50 bg-white dark:bg-[#1A1518] dark:border-[#E24632]/30 dark:hover:border-[#A7E4FF]/60">
						<CardHeader className="pb-3">
							<CardDecorator>
								<Search className="size-6 text-[#A11218]" aria-hidden />
							</CardDecorator>

							<h3 className="mt-6 font-semibold text-lg text-[#A11218] dark:text-[#E8C3A1]">Cited Answers</h3>
						</CardHeader>

						<CardContent>
							<p className="text-sm text-[#533025] dark:text-[#E8C3A1]/70">
								Get Perplexity-style cited answers with source references. 
								Every response is grounded in your knowledge base.
							</p>
						</CardContent>
					</Card>

					<Card className="group shadow-lg hover:shadow-xl transition-all duration-300 border border-[#A11218]/20 hover:border-[#A11218]/50 bg-white dark:bg-[#1A1518] dark:border-[#E24632]/30 dark:hover:border-[#A7E4FF]/60">
						<CardHeader className="pb-3">
							<CardDecorator>
								<Globe className="size-6 text-[#E24632]" aria-hidden />
							</CardDecorator>

							<h3 className="mt-6 font-semibold text-lg text-[#A11218] dark:text-[#E8C3A1]">15+ Integrations</h3>
						</CardHeader>

						<CardContent>
							<p className="text-sm text-[#533025] dark:text-[#E8C3A1]/70">
								Connect Slack, Notion, GitHub, Gmail, Discord, Jira, Confluence, 
								and more. All your knowledge in one place.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
	<div
		aria-hidden
		className="relative mx-auto size-36 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
	>
		<div className="absolute inset-0 [--border:black] dark:[--border:white] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
		<div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l rounded-lg shadow-sm">
			{children}
		</div>
	</div>
);


