"use client";

export function HeroDashboardPreview({ isDark = false }: { isDark?: boolean }) {
	return (
		<div className={`w-full h-full rounded-[20px] overflow-hidden ${isDark ? 'bg-neutral-950' : 'bg-white'}`}>
			<svg
				viewBox="0 0 1920 1080"
				className="w-full h-full"
				xmlns="http://www.w3.org/2000/svg"
			>
				{/* Background */}
				<rect width="1920" height="1080" fill={isDark ? "#0a0a0a" : "#ffffff"} />
				
				{/* Sidebar */}
				<rect
					x="0"
					y="0"
					width="280"
					height="1080"
					fill={isDark ? "#171717" : "#f9fafb"}
				/>
				
				{/* Sidebar Header */}
				<g>
					<circle cx="40" cy="40" r="16" fill={isDark ? "#3b82f6" : "#6366f1"} />
					<text
						x="70"
						y="48"
						fill={isDark ? "#e5e5e5" : "#1f2937"}
						fontSize="18"
						fontWeight="700"
						fontFamily="system-ui, -apple-system, sans-serif"
					>
						Primus IDP
					</text>
				</g>
				
				{/* Sidebar Menu Items */}
				<g>
					{/* Dashboard */}
					<rect x="20" y="100" width="240" height="40" rx="8" fill={isDark ? "#2563eb" : "#3b82f6"} opacity="0.2" />
					<circle cx="40" cy="120" r="8" fill={isDark ? "#3b82f6" : "#2563eb"} />
					<text x="60" y="125" fill={isDark ? "#e5e5e5" : "#1f2937"} fontSize="14" fontWeight="500" fontFamily="system-ui">Dashboard</text>
					
					{/* Research */}
					<circle cx="40" cy="170" r="8" fill={isDark ? "#737373" : "#9ca3af"} />
					<text x="60" y="175" fill={isDark ? "#a3a3a3" : "#6b7280"} fontSize="14" fontFamily="system-ui">Research</text>
					
					{/* Documents */}
					<circle cx="40" cy="220" r="8" fill={isDark ? "#737373" : "#9ca3af"} />
					<text x="60" y="225" fill={isDark ? "#a3a3a3" : "#6b7280"} fontSize="14" fontFamily="system-ui">Documents</text>
					
					{/* Connectors */}
					<circle cx="40" cy="270" r="8" fill={isDark ? "#737373" : "#9ca3af"} />
					<text x="60" y="275" fill={isDark ? "#a3a3a3" : "#6b7280"} fontSize="14" fontFamily="system-ui">Connectors</text>
					
					{/* Settings */}
					<circle cx="40" cy="320" r="8" fill={isDark ? "#737373" : "#9ca3af"} />
					<text x="60" y="325" fill={isDark ? "#a3a3a3" : "#6b7280"} fontSize="14" fontFamily="system-ui">Settings</text>
				</g>
				
				{/* Main Content Area */}
				{/* Header */}
				<rect
					x="280"
					y="0"
					width="1640"
					height="80"
					fill={isDark ? "#0a0a0a" : "#ffffff"}
				/>
				<text
					x="320"
					y="50"
					fill={isDark ? "#e5e5e5" : "#1f2937"}
					fontSize="28"
					fontWeight="700"
					fontFamily="system-ui, -apple-system, sans-serif"
				>
					AI Research Assistant
				</text>
				
				{/* Search Bar */}
				<rect
					x="320"
					y="100"
					width="1560"
					height="60"
					rx="12"
					fill={isDark ? "#171717" : "#f9fafb"}
					stroke={isDark ? "#262626" : "#e5e7eb"}
					strokeWidth="2"
				/>
				<text
					x="360"
					y="137"
					fill={isDark ? "#737373" : "#9ca3af"}
					fontSize="16"
					fontFamily="system-ui"
				>
					Ask anything about your connected knowledge sources...
				</text>
				
				{/* Content Cards */}
				<g>
					{/* Card 1 */}
					<rect
						x="320"
						y="200"
						width="750"
						height="280"
						rx="16"
						fill={isDark ? "#171717" : "#ffffff"}
						stroke={isDark ? "#262626" : "#e5e7eb"}
						strokeWidth="2"
					/>
					<text x="340" y="235" fill={isDark ? "#e5e5e5" : "#1f2937"} fontSize="20" fontWeight="600" fontFamily="system-ui">Recent Research</text>
					
					{/* List items */}
					<rect x="340" y="260" width="690" height="50" rx="8" fill={isDark ? "#0a0a0a" : "#f9fafb"} />
					<circle cx="360" cy="285" r="6" fill="#3b82f6" />
					<text x="380" y="290" fill={isDark ? "#d4d4d4" : "#374151"} fontSize="14" fontFamily="system-ui">Q&amp;A Session - Product Strategy</text>
					
					<rect x="340" y="320" width="690" height="50" rx="8" fill={isDark ? "#0a0a0a" : "#f9fafb"} />
					<circle cx="360" cy="345" r="6" fill="#8b5cf6" />
					<text x="380" y="350" fill={isDark ? "#d4d4d4" : "#374151"} fontSize="14" fontFamily="system-ui">Full Report - Market Analysis</text>
					
					<rect x="340" y="380" width="690" height="50" rx="8" fill={isDark ? "#0a0a0a" : "#f9fafb"} />
					<circle cx="360" cy="405" r="6" fill="#ec4899" />
					<text x="380" y="410" fill={isDark ? "#d4d4d4" : "#374151"} fontSize="14" fontFamily="system-ui">Podcast Generated - Tech Trends</text>
					
					{/* Card 2 */}
					<rect
						x="1110"
						y="200"
						width="770"
						height="280"
						rx="16"
						fill={isDark ? "#171717" : "#ffffff"}
						stroke={isDark ? "#262626" : "#e5e7eb"}
						strokeWidth="2"
					/>
					<text x="1130" y="235" fill={isDark ? "#e5e5e5" : "#1f2937"} fontSize="20" fontWeight="600" fontFamily="system-ui">Connected Sources</text>
					
					{/* Source badges */}
					<rect x="1130" y="260" width="160" height="50" rx="8" fill={isDark ? "#1e293b" : "#eff6ff"} />
					<text x="1155" y="290" fill={isDark ? "#60a5fa" : "#2563eb"} fontSize="14" fontWeight="500" fontFamily="system-ui">🔗 Slack</text>
					
					<rect x="1310" y="260" width="160" height="50" rx="8" fill={isDark ? "#1e1b2e" : "#f5f3ff"} />
					<text x="1330" y="290" fill={isDark ? "#a78bfa" : "#7c3aed"} fontSize="14" fontWeight="500" fontFamily="system-ui">📝 Notion</text>
					
					<rect x="1490" y="260" width="160" height="50" rx="8" fill={isDark ? "#1a1a1a" : "#fef3c7"} />
					<text x="1510" y="290" fill={isDark ? "#fbbf24" : "#d97706"} fontSize="14" fontWeight="500" fontFamily="system-ui">💻 GitHub</text>
					
					<rect x="1130" y="330" width="160" height="50" rx="8" fill={isDark ? "#1e2a1a" : "#ecfdf5"} />
					<text x="1150" y="360" fill={isDark ? "#4ade80" : "#059669"} fontSize="14" fontWeight="500" fontFamily="system-ui">📧 Gmail</text>
					
					<rect x="1310" y="330" width="160" height="50" rx="8" fill={isDark ? "#2a1a1e" : "#fce7f3"} />
					<text x="1325" y="360" fill={isDark ? "#f472b6" : "#db2777"} fontSize="14" fontWeight="500" fontFamily="system-ui">🎯 Linear</text>
					
					<rect x="1490" y="330" width="160" height="50" rx="8" fill={isDark ? "#1a1e2a" : "#dbeafe"} />
					<text x="1515" y="360" fill={isDark ? "#60a5fa" : "#2563eb"} fontSize="14" fontWeight="500" fontFamily="system-ui">📊 Jira</text>
				</g>
				
				{/* Bottom Stats Cards */}
				<g>
					<rect
						x="320"
						y="520"
						width="370"
						height="140"
						rx="16"
						fill={isDark ? "#171717" : "#ffffff"}
						stroke={isDark ? "#262626" : "#e5e7eb"}
						strokeWidth="2"
					/>
					<text x="340" y="555" fill={isDark ? "#a3a3a3" : "#6b7280"} fontSize="14" fontFamily="system-ui">Documents Indexed</text>
					<text x="340" y="610" fill={isDark ? "#e5e5e5" : "#1f2937"} fontSize="42" fontWeight="700" fontFamily="system-ui">2,847</text>
					
					<rect
						x="720"
						y="520"
						width="370"
						height="140"
						rx="16"
						fill={isDark ? "#171717" : "#ffffff"}
						stroke={isDark ? "#262626" : "#e5e7eb"}
						strokeWidth="2"
					/>
					<text x="740" y="555" fill={isDark ? "#a3a3a3" : "#6b7280"} fontSize="14" fontFamily="system-ui">Queries This Month</text>
					<text x="740" y="610" fill={isDark ? "#e5e5e5" : "#1f2937"} fontSize="42" fontWeight="700" fontFamily="system-ui">1,234</text>
					
					<rect
						x="1120"
						y="520"
						width="370"
						height="140"
						rx="16"
						fill={isDark ? "#171717" : "#ffffff"}
						stroke={isDark ? "#262626" : "#e5e7eb"}
						strokeWidth="2"
					/>
					<text x="1140" y="555" fill={isDark ? "#a3a3a3" : "#6b7280"} fontSize="14" fontFamily="system-ui">Active Agents</text>
					<text x="1140" y="610" fill={isDark ? "#e5e5e5" : "#1f2937"} fontSize="42" fontWeight="700" fontFamily="system-ui">3</text>
					
					<rect
						x="1520"
						y="520"
						width="360"
						height="140"
						rx="16"
						fill="url(#gradient1)"
						stroke={isDark ? "#262626" : "#e5e7eb"}
						strokeWidth="2"
					/>
					<text x="1540" y="555" fill="#ffffff" fontSize="14" fontWeight="500" fontFamily="system-ui">Response Time</text>
					<text x="1540" y="610" fill="#ffffff" fontSize="42" fontWeight="700" fontFamily="system-ui">&lt;2s</text>
				</g>
				
				{/* Gradient Definition */}
				<defs>
					<linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#3b82f6" />
						<stop offset="50%" stopColor="#8b5cf6" />
						<stop offset="100%" stopColor="#ec4899" />
					</linearGradient>
				</defs>
			</svg>
		</div>
	);
}
