import { cn } from "@/lib/utils";

export const BentoGrid = ({
	className,
	children,
}: {
	className?: string;
	children?: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				"mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
				className
			)}
		>
			{children}
		</div>
	);
};

export const BentoGridItem = ({
	className,
	title,
	description,
	header,
	icon,
}: {
	className?: string;
	title?: string | React.ReactNode;
	description?: string | React.ReactNode;
	header?: React.ReactNode;
	icon?: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				"group/bento shadow-lg row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-[#A11218]/30 bg-white p-4 transition duration-200 hover:shadow-xl hover:border-[#A11218]/60 dark:border-[#E24632]/40 dark:bg-[#1A1518] dark:shadow-none dark:hover:border-[#A7E4FF]/60",
				className
			)}
		>
			{header}
			<div className="transition duration-200 group-hover/bento:translate-x-2">
				{icon}
				<div className="mt-2 mb-2 font-sans font-bold text-[#A11218] dark:text-[#E8C3A1]">
					{title}
				</div>
				<div className="font-sans text-xs font-normal text-[#533025] dark:text-[#E8C3A1]/80">
					{description}
				</div>
			</div>
		</div>
	);
};


