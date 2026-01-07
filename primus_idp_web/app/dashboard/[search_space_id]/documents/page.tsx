"use client";

// Re-export the documents page from the (manage) route group
// This ensures /dashboard/[id]/documents works correctly
export { default } from "./(manage)/page";
