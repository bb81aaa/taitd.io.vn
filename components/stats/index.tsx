"use client"

import { getBlogReactionsCount } from "@/server/actions/blog"
import { useQuery } from "@tanstack/react-query"

import { Percentage } from "@/types/wakatime"
import StatCard from "@/components/stat-card"
import CodingProgress from "@/components/stats/coding-progress"
import GithubContributor from "@/components/stats/github-contributor"

export default function Stats() {
  const { data: githubData } = useQuery({
    queryKey: ["githubData"],
    queryFn: () => fetch("/api/stats/github").then((res) => res.json()),
  })

  const { data: wakatimeData } = useQuery({
    queryKey: ["wakatimeData"],
    queryFn: () => fetch("/api/stats/wakatime").then((res) => res.json()),
  })

  const { data: umamiData } = useQuery({
    queryKey: ["umamiData"],
    queryFn: () => fetch("/api/stats/views").then((res) => res.json()),
  })

  const { data: reactionsCount } = useQuery({
    queryKey: ["get-reactions-count"],
    queryFn: async () => await getBlogReactionsCount(),
    retry: true,
    retryDelay: 500,
  })

  const statCards = [
    {
      title: "Github Repositories",
      value: githubData?.repos,
      description: "Public repositories",
      link: `${githubData?.user?.html_url}?tab=repositories`,
    },
    {
      title: "Github Stars",
      value: githubData?.starsCount,
      description: "Total stars received",
      link: githubData?.user?.html_url,
    },
    {
      title: "Github Followers",
      value: githubData?.user?.followers,
      description: "People following me",
      link: githubData?.user?.html_url,
    },
    {
      title: "Total Coding Hours",
      value: wakatimeData?.codingHours,
      description: "Total hours spent coding",
      link: "https://wakatime.com/",
    },
    {
      title: "Coding Hours In Last Week",
      value: wakatimeData?.weekly?.data?.total,
      description: "Total hours spent coding",
      link: "https://wakatime.com/",
    },
    {
      title: "Daily Average Coding Hours",
      value: wakatimeData?.weekly?.data?.dailyAverage,
      description: "Total hours spent coding",
      link: "https://wakatime.com/",
    },
    {
      title: "Best Day Coding Hours",
      value: wakatimeData?.weekly?.data?.bestDay
        ? `${wakatimeData?.weekly?.data?.bestDay.total}`
        : undefined,
      description: "Total hours spent coding",
      link: "https://wakatime.com/",
    },
    {
      title: "Blog Views",
      value: umamiData?.data.pageviews.value,
      description: "Total blog views",
      link: "https://us.umami.is/share/1hfu7snOAr7VkPJj/taitd.io.vn",
    },
    {
      title: "Blog Reactions",
      value: reactionsCount,
      description: "Total blog reactions",
      link: "https://taitd.io.vn/blog",
    },
  ]

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {statCards.map((card) => (
          <StatCard key={card.title} card={card} />
        ))}
      </div>
      <GithubContributor />
      <CodingProgress
        languages={wakatimeData?.weekly?.data?.languages as Percentage[]}
        operatingSystems={
          wakatimeData?.weekly?.data?.operatingSystems as Percentage[]
        }
      />
    </>
  )
}
