import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject, getNextProject } from "@/data/projects";
import { ProjectDetail } from "@/components/ProjectDetail";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

/** Pre-render one static page per project at build time. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/** Per-page SEO. Title flows through the root template → "Name — Sebastian August". */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  const url = `${site.url}/projects/${project.slug}`;
  const hero = project.images[0];

  return {
    title: project.name,
    description: project.tagline,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${project.name} — ${site.name}`,
      description: project.tagline,
      url,
      siteName: site.name,
      // Use the project's hero shot when it exists; otherwise fall back to the
      // site-wide generated OG image (app/opengraph-image.tsx applies here too).
      ...(hero ? { images: [{ url: hero, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — ${site.name}`,
      description: project.tagline,
      ...(hero ? { images: [hero] } : {}),
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(slug);

  return <ProjectDetail project={project} nextProject={nextProject} />;
}
