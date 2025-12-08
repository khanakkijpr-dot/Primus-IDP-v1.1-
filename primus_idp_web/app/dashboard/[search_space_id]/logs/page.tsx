"use client";

// Re-export the logs page from the (manage) route group
// This ensures /dashboard/[id]/logs works correctly
export { default } from "./(manage)/page";
