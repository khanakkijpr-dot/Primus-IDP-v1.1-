"use client";

export function HeroDashboardPreview({ isDark = false }: { isDark?: boolean }) {
	return (
		<div className={`w-full h-full rounded-[20px] overflow-hidden ${isDark ? 'bg-[#0A0A0F]' : 'bg-[#F5EDE6]'}`}>
			<svg
				viewBox="0 0 1920 1080"
				className="w-full h-full"
				xmlns="http://www.w3.org/2000/svg"
			>
				{/* Background */}
				<rect width="1920" height="1080" fill={isDark ? "#0A0A0F" : "#F5EDE6"} />
				
				{/* Sidebar */}
				<rect
					x="0"
					y="0"
					width="280"
					height="1080"
					fill={isDark ? "#1A1518" : "#E8C3A1"}
				/>
				
				{/* Sidebar Header */}
				<g>
					<circle cx="40" cy="40" r="16" fill={isDark ? "#E24632" : "#A11218"} />
					<text
						x="70"
						y="48"
						fill={isDark ? "#E8C3A1" : "#A11218"}
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
					<rect x="20" y="100" width="240" height="40" rx="8" fill={isDark ? "#533025" : "#D36B3C"} opacity="0.3" />
					<circle cx="40" cy="120" r="8" fill={isDark ? "#A7E4FF" : "#A11218"} />
					<text x="60" y="125" fill={isDark ? "#E8C3A1" : "#A11218"} fontSize="14" fontWeight="500" fontFamily="system-ui">Dashboard</text>
					
					{/* Research */}
					<circle cx="40" cy="170" r="8" fill={isDark ? "#533025" : "#D36B3C"} />
					<text x="60" y="175" fill={isDark ? "#7A7A75" : "#7A7A75"} fontSize="14" fontFamily="system-ui">Research</text>
					
					{/* Documents */}
					<circle cx="40" cy="220" r="8" fill={isDark ? "#533025" : "#D36B3C"} />
					<text x="60" y="225" fill={isDark ? "#7A7A75" : "#7A7A75"} fontSize="14" fontFamily="system-ui">Documents</text>
					
					{/* Connectors */}
					<circle cx="40" cy="270" r="8" fill={isDark ? "#533025" : "#D36B3C"} />
					<text x="60" y="275" fill={isDark ? "#7A7A75" : "#7A7A75"} fontSize="14" fontFamily="system-ui">Connectors</text>
					
					{/* Settings */}
					<circle cx="40" cy="320" r="8" fill={isDark ? "#533025" : "#D36B3C"} />
					<text x="60" y="325" fill={isDark ? "#7A7A75" : "#7A7A75"} fontSize="14" fontFamily="system-ui">Settings</text>
				</g>
				
				{/* Main Content Area */}
				{/* Header */}
				<rect
					x="280"
					y="0"
					width="1640"
					height="80"
					fill={isDark ? "#0A0A0F" : "#F5EDE6"}
				/>
				<text
					x="320"
					y="50"
					fill={isDark ? "#E8C3A1" : "#A11218"}
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
					fill={isDark ? "#1A1518" : "#E8C3A1"}
					stroke={isDark ? "#533025" : "#D36B3C"}
					strokeWidth="2"
				/>
				<text
					x="360"
					y="137"
					fill={isDark ? "#7A7A75" : "#7A7A75"}
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
						fill={isDark ? "#1A1518" : "#F5EDE6"}
						stroke={isDark ? "#533025" : "#D36B3C"}
						strokeWidth="2"
					/>
					<text x="340" y="235" fill={isDark ? "#E8C3A1" : "#A11218"} fontSize="20" fontWeight="600" fontFamily="system-ui">Recent Research</text>
					
					{/* List items */}
					<rect x="340" y="260" width="690" height="50" rx="8" fill={isDark ? "#0A0A0F" : "#E8C3A1"} />
					<circle cx="360" cy="285" r="6" fill="#A11218" />
					<text x="380" y="290" fill={isDark ? "#7A7A75" : "#7A7A75"} fontSize="14" fontFamily="system-ui">Q&amp;A Session - Product Strategy</text>
					
					<rect x="340" y="320" width="690" height="50" rx="8" fill={isDark ? "#0A0A0F" : "#E8C3A1"} />
					<circle cx="360" cy="345" r="6" fill="#E24632" />
					<text x="380" y="350" fill={isDark ? "#7A7A75" : "#7A7A75"} fontSize="14" fontFamily="system-ui">Full Report - Market Analysis</text>
					
					<rect x="340" y="380" width="690" height="50" rx="8" fill={isDark ? "#0A0A0F" : "#E8C3A1"} />
					<circle cx="360" cy="405" r="6" fill="#A7E4FF" />
					<text x="380" y="410" fill={isDark ? "#7A7A75" : "#7A7A75"} fontSize="14" fontFamily="system-ui">Podcast Generated - Tech Trends</text>
					
					{/* Card 2 */}
					<rect
						x="1110"
						y="200"
						width="770"
						height="280"
						rx="16"
						fill={isDark ? "#1A1518" : "#F5EDE6"}
						stroke={isDark ? "#533025" : "#D36B3C"}
						strokeWidth="2"
					/>
					<text x="1130" y="235" fill={isDark ? "#E8C3A1" : "#A11218"} fontSize="20" fontWeight="600" fontFamily="system-ui">Connected Sources</text>
					
					{/* Source badges */}
					<rect x="1130" y="260" width="160" height="50" rx="8" fill={isDark ? "#533025" : "#E8C3A1"} />
					<text x="1155" y="290" fill={isDark ? "#A7E4FF" : "#A11218"} fontSize="14" fontWeight="500" fontFamily="system-ui">🔗 Slack</text>
					
					<rect x="1310" y="260" width="160" height="50" rx="8" fill={isDark ? "#533025" : "#E8C3A1"} />
					<text x="1330" y="290" fill={isDark ? "#A7E4FF" : "#A11218"} fontSize="14" fontWeight="500" fontFamily="system-ui">📝 Notion</text>
					
					<rect x="1490" y="260" width="160" height="50" rx="8" fill={isDark ? "#533025" : "#E8C3A1"} />
					<text x="1510" y="290" fill={isDark ? "#A7E4FF" : "#A11218"} fontSize="14" fontWeight="500" fontFamily="system-ui">💻 GitHub</text>
					
					<rect x="1130" y="330" width="160" height="50" rx="8" fill={isDark ? "#533025" : "#E8C3A1"} />
					<text x="1150" y="360" fill={isDark ? "#A7E4FF" : "#A11218"} fontSize="14" fontWeight="500" fontFamily="system-ui">📧 Gmail</text>
					
					<rect x="1310" y="330" width="160" height="50" rx="8" fill={isDark ? "#533025" : "#E8C3A1"} />
					<text x="1325" y="360" fill={isDark ? "#A7E4FF" : "#A11218"} fontSize="14" fontWeight="500" fontFamily="system-ui">🎯 Linear</text>
					
					<rect x="1490" y="330" width="160" height="50" rx="8" fill={isDark ? "#533025" : "#E8C3A1"} />
					<text x="1515" y="360" fill={isDark ? "#A7E4FF" : "#A11218"} fontSize="14" fontWeight="500" fontFamily="system-ui">📊 Jira</text>
				</g>
				
				{/* Bottom Stats Cards */}
				<g>
					<rect
						x="320"
						y="520"
						width="370"
						height="140"
						rx="16"
						fill={isDark ? "#1A1518" : "#F5EDE6"}
						stroke={isDark ? "#533025" : "#D36B3C"}
						strokeWidth="2"
					/>
					<text x="340" y="555" fill={isDark ? "#7A7A75" : "#7A7A75"} fontSize="14" fontFamily="system-ui">Documents Indexed</text>
					<text x="340" y="610" fill={isDark ? "#E8C3A1" : "#A11218"} fontSize="42" fontWeight="700" fontFamily="system-ui">2,847</text>
					
					<rect
						x="720"
						y="520"
						width="370"
						height="140"
						rx="16"
						fill={isDark ? "#1A1518" : "#F5EDE6"}
						stroke={isDark ? "#533025" : "#D36B3C"}
						strokeWidth="2"
					/>
					<text x="740" y="555" fill={isDark ? "#7A7A75" : "#7A7A75"} fontSize="14" fontFamily="system-ui">Queries This Month</text>
					<text x="740" y="610" fill={isDark ? "#E8C3A1" : "#A11218"} fontSize="42" fontWeight="700" fontFamily="system-ui">1,234</text>
					
					<rect
						x="1120"
						y="520"
						width="370"
						height="140"
						rx="16"
						fill={isDark ? "#1A1518" : "#F5EDE6"}
						stroke={isDark ? "#533025" : "#D36B3C"}
						strokeWidth="2"
					/>
					<text x="1140" y="555" fill={isDark ? "#7A7A75" : "#7A7A75"} fontSize="14" fontFamily="system-ui">Active Agents</text>
					<text x="1140" y="610" fill={isDark ? "#E8C3A1" : "#A11218"} fontSize="42" fontWeight="700" fontFamily="system-ui">3</text>
					
					<rect
						x="1520"
						y="520"
						width="360"
						height="140"
						rx="16"
						fill="url(#gradient1)"
						stroke={isDark ? "#533025" : "#D36B3C"}
						strokeWidth="2"
					/>
					<text x="1540" y="555" fill="#E8C3A1" fontSize="14" fontWeight="500" fontFamily="system-ui">Response Time</text>
					<text x="1540" y="610" fill="#E8C3A1" fontSize="42" fontWeight="700" fontFamily="system-ui">&lt;2s</text>
				</g>
				
				{/* Gradient Definition */}
				<defs>
					<linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#A11218" />
						<stop offset="50%" stopColor="#E24632" />
						<stop offset="100%" stopColor="#D36B3C" />
					</linearGradient>
				</defs>
			</svg>
		</div>
	);
}
