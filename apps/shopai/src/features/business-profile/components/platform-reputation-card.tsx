'use client';

import { CheckCircle } from 'lucide-react';
import * as Recharts from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';

import { ALL_BUSINESS_TRUST_TASKS, type TrustTask } from '../constants';
import { useBusinessProfile } from '../hooks';

export function PlatformReputationCard() {
  const { get: getBusiness } = useBusinessProfile();
  const business = getBusiness();

  const allTasks = ALL_BUSINESS_TRUST_TASKS;
  const completedTaskIds: string[] = business.completedTrustTaskIds ?? [];
  const completedTasks = allTasks.filter((task) => completedTaskIds.includes(task.id));
  const undoneTasks = allTasks.filter((task) => !completedTaskIds.includes(task.id));

  const trustScore = typeof business.trustScore === 'number' ? business.trustScore : 0;
  const sellerLevel = business.sellerLevel || 'Seller';

  const totalPoints = allTasks.reduce((sum: number, t: TrustTask) => sum + t.points, 0);
  const completedCount = completedTasks.length;
  const currentPoints = completedTasks.reduce((sum: number, t: TrustTask) => sum + t.points, 0);
  const sortedTasks = [...completedTasks, ...undoneTasks];

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Platform Reputation</CardTitle>
        <CardDescription>Build trust and unlock seller privileges</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center">
            <ChartContainer
              config={
                {
                  trustScore: {
                    label: 'Trust Score',
                    color: 'hsl(var(--chart-2))',
                  },
                } satisfies ChartConfig
              }
              className="mx-auto aspect-square max-h-[250px]"
            >
              <Recharts.RadialBarChart
                data={[{ trustScore, fill: 'var(--color-trustScore)' }]}
                endAngle={100}
                innerRadius={80}
                outerRadius={140}
              >
                <Recharts.PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  className="first:fill-muted last:fill-background"
                  polarRadius={[86, 74]}
                />
                <Recharts.RadialBar dataKey="trustScore" background />
                <Recharts.PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Recharts.Label
                    content={({ viewBox }: { viewBox?: { cx?: number; cy?: number } }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-4xl font-bold"
                            >
                              {trustScore}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              / 100
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Recharts.PolarRadiusAxis>
              </Recharts.RadialBarChart>
            </ChartContainer>

            <div className="mt-6 space-y-2 text-center">
              <p className="text-foreground text-lg font-semibold">
                Merchant Level: <span>{sellerLevel}</span>
              </p>
              <div className="space-y-1">
                <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">Progress to Level 2</span>
                  <span className="text-foreground font-medium">
                    {totalPoints - currentPoints} points needed
                  </span>
                </div>
                <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                  <div
                    className="bg-primary h-full transition-all duration-500"
                    style={{
                      width: totalPoints === 0 ? '0%' : `${(currentPoints / totalPoints) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-foreground mb-1 text-sm font-semibold">Complete Tasks</h4>
              <p className="text-muted-foreground text-sm">
                Earn points to increase your trust score ({completedCount}/{allTasks.length})
              </p>
            </div>

            <div className="space-y-3">
              {sortedTasks.map((task) => {
                const isDone = completedTaskIds.includes(task.id);
                return (
                  <div key={task.id} className="flex items-start gap-3 opacity-100">
                    <div className="mt-0.5 shrink-0">
                      {isDone ? (
                        <CheckCircle className="h-5 w-5 text-green-600" aria-label="Completed" />
                      ) : (
                        <div className="border-muted-foreground/30 h-5 w-5 rounded-full border-2" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm ${isDone ? 'text-muted-foreground line-through' : 'text-foreground'}`}
                      >
                        {task.label}
                      </p>
                    </div>
                    <span className="text-muted-foreground shrink-0 text-sm font-medium">
                      +{task.points}pts
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
