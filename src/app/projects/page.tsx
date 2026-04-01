"use client";

import { ProjectEntity } from "@/components/ProjectEntity";
import { PageWrapper } from "@/components/PageWrapper";
import { useState } from "react";
import { IoFunnel } from "react-icons/io5";

export default function ProjectsPage() {
  const [statusFilter, setStatusFilter] = useState<"all" | "planning" | "active" | "complete">("all");

  const projects = [
    {
      id: 1,
      title: "Project Alpha",
      description: "Core infrastructure and foundational framework for the ecosystem",
      status: "active" as const,
      contributors: 12,
      tags: ["infrastructure", "typescript", "core"],
      color: "cyan" as const,
    },
    {
      id: 2,
      title: "Project Beta",
      description: "Community engagement and collaboration platform",
      status: "active" as const,
      contributors: 8,
      tags: ["community", "react", "realtime"],
      color: "pink" as const,
    },
    {
      id: 3,
      title: "Project Gamma",
      description: "Knowledge base and documentation system",
      status: "planning" as const,
      contributors: 5,
      tags: ["documentation", "content", "ai"],
      color: "gold" as const,
    },
    {
      id: 4,
      title: "Project Delta",
      description: "Analytics and metrics visualization dashboard",
      status: "active" as const,
      contributors: 6,
      tags: ["analytics", "three.js", "visualization"],
      color: "purple" as const,
    },
    {
      id: 5,
      title: "Project Epsilon",
      description: "Authentication and identity management layer",
      status: "complete" as const,
      contributors: 4,
      tags: ["auth", "security", "firebase"],
      color: "cyan" as const,
    },
    {
      id: 6,
      title: "Project Zeta",
      description: "Performance optimization and monitoring tools",
      status: "planning" as const,
      contributors: 3,
      tags: ["performance", "devops", "monitoring"],
      color: "pink" as const,
    },
  ];

  const filteredProjects =
    statusFilter === "all"
      ? projects
      : projects.filter((p) => p.status === statusFilter);

  const statusCounts = {
    all: projects.length,
    planning: projects.filter(p => p.status === "planning").length,
    active: projects.filter(p => p.status === "active").length,
    complete: projects.filter(p => p.status === "complete").length,
  };

  return (
    <PageWrapper>
      <div className="relative z-10 min-h-screen w-full overflow-x-hidden px-4 pt-28 pb-10 md:px-8 md:pt-32 md:pb-12">
        <div className="mx-auto w-full max-w-6xl space-y-12 animate-slide-up">
          {/* Header */}
          <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-md space-y-4 text-center">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[--color-brand-pink] animate-pulse-subtle" />
              <span className="caption text-[--color-brand-pink]">COLLABORATIVE VENTURES</span>
            </div>
            <h1 className="heading-1">Dream Entities</h1>
            <p className="body-lg text-[--text-secondary] max-w-2xl mx-auto">
              Explore transformative projects being forged within the ARISE_osc ecosystem. Each entity represents a collective endeavor awaiting your contribution.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {(["all", "planning", "active", "complete"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold uppercase text-sm tracking-wide transition-all duration-300 capitalize ${
                  statusFilter === filter
                    ? "btn btn-primary"
                    : "btn btn-ghost border border-[--border-color-light]"
                }`}
              >
                <IoFunnel className="text-lg" />
                {filter === "all" ? "All" : filter}
                <span className="ml-1 px-2 py-0.5 rounded-full bg-white/10 text-xs">
                  {statusCounts[filter]}
                </span>
              </button>
            ))}
          </div>

          {/* Project Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
              {filteredProjects.map((project) => (
                <ProjectEntity key={project.id} {...project} />
              ))}
            </div>
          ) : (
            <div className="glass rounded-lg p-12 text-center space-y-4">
              <p className="body-lg text-[--text-secondary]">
                No entities in this phase yet.
              </p>
              <p className="body-sm text-[--text-tertiary]">
                Check back soon for new collaborative ventures.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

