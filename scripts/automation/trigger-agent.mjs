#!/usr/bin/env node
// Triggers the external AI browser testing agent after local test completion.
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const AGENT_ENDPOINT = process.env.AI_BROWSER_AGENT_URL ?? "http://localhost:6140/api/run";
const AGENT_TOKEN = process.env.AI_BROWSER_AGENT_TOKEN ?? "";
const DASHBOARD_URL = process.env.PRIMUS_IDP_DASHBOARD_URL ?? "http://localhost:8001/dashboard";
const BACKEND_HEALTH_URL = process.env.PRIMUS_IDP_BACKEND_HEALTH_URL ?? "http://localhost:8000/docs";
const REPORT_DIR = process.env.AI_BROWSER_AGENT_REPORT_DIR ?? "docs/ai-browser-tests";

function buildPayload() {
    const taskName = process.env.AI_BROWSER_AGENT_TASK ?? "Primus IDP dashboard smoke test";
    const validationRule = process.env.AI_BROWSER_AGENT_VALIDATION ?? "confirm dashboard stats widget renders";
    const artifacts = (process.env.AI_BROWSER_AGENT_ARTIFACTS ?? "screenshot,console_logs")
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean);

    return {
        task: taskName,
        browser: process.env.AI_BROWSER_AGENT_BROWSER ?? "chrome",
        os: process.env.AI_BROWSER_AGENT_OS ?? "windows",
        llm_model: process.env.AI_BROWSER_AGENT_MODEL ?? "gpt-4o-mini",
        validation: validationRule,
        artifacts,
        context: {
            dashboardUrl: DASHBOARD_URL,
            backendHealthUrl: BACKEND_HEALTH_URL,
            bearerToken: process.env.PRIMUS_IDP_BEARER_TOKEN ?? "",
        },
    };
}

async function triggerAgent() {
    const payload = buildPayload();

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(AGENT_TOKEN ? { Authorization: `Bearer ${AGENT_TOKEN}` } : {}),
        },
        body: JSON.stringify(payload),
    };

    const response = await fetch(AGENT_ENDPOINT, requestOptions);
    if (!response.ok) {
        const errorText = await response.text();
        console.error("AI browser agent failed:", response.status, errorText);
        process.exit(1);
    }

    const result = await response.json().catch(async () => {
        const raw = await response.text();
        console.warn("Agent returned non-JSON payload, saving raw text");
        return { status: "unknown", raw };
    });

    const reportPath = join(process.cwd(), REPORT_DIR, `report-${Date.now()}.json`);
    await mkdir(join(process.cwd(), REPORT_DIR), { recursive: true });
    await writeFile(reportPath, JSON.stringify(result, null, 2), "utf8");

    console.log("AI browser agent completed. Report saved to", reportPath);
    if (result?.status) {
        console.log("Status:", result.status);
    }
    if (result?.details) {
        console.log("Details:", result.details);
    }
}

triggerAgent().catch((error) => {
    console.error("Failed to trigger AI browser agent:", error);
    process.exit(1);
});
