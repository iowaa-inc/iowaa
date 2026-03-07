import * as React from 'react';

import { RiExpandUpDownLine, RiPauseFill, RiPlayFill } from '@remixicon/react';

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui-core/components/avatar';
import { Button } from '@repo/ui-core/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui-core/components/dialog';
import { Input } from '@repo/ui-core/components/input';
import { ScrollArea } from '@repo/ui-core/components/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui-core/components/tabs';

// Separate profiles into different categories
const communityProfiles = [
  {
    name: 'Chinedu Okafor',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'CO',
    description: 'Rich, warm baritone great for narration and audiobooks.',
  },
  {
    name: 'Sarah Johnson',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'SJ',
    description: 'Bright and energetic with clear, articulate diction.',
  },
  {
    name: 'Alex Lee',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'AL',
    description: 'Smooth and calming, ideal for meditation or relaxation scripts.',
  },
  {
    name: 'Maria Gonzalez',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'MG',
    description: 'Dynamic, expressive, excellent for podcasts.',
  },
  {
    name: 'Priya Singh',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'PS',
    description: 'Warm and friendly, with a versatile delivery.',
  },
  {
    name: 'Liam Martin',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'LM',
    description: 'Deeper resonance, works well for dramatic reads.',
  },
  {
    name: 'Sophia Rossi',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'SR',
    description: 'Elegant and clear, ideal for storytelling.',
  },
  {
    name: 'Hiroshi Tanaka',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'HT',
    description: 'Quiet confidence and smooth delivery for technical reads.',
  },
  {
    name: 'Amira El-Sayed',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'AE',
    description: 'Expressive mid-range with approachable style.',
  },
  {
    name: 'Jack Thompson',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'JT',
    description: 'Strong, bold voice suited for announcements.',
  },
];

const projectsProfiles = [
  {
    name: 'David Kim',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'DK',
    description: 'Professional and approachable for business narrations.',
  },
  {
    name: 'Fatima Zahra',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'FZ',
    description: 'Friendly tone, excellent for onboarding instructions.',
  },
  {
    name: 'John Smith',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'JS',
    description: 'Neutral and clear, perfect for corporate presentations.',
  },
  {
    name: 'Carlos Mendes',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'CM',
    description: 'Conversational style, great for interviews.',
  },
  {
    name: 'Anna Kowalska',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'AK',
    description: 'Soft-spoken yet confident, suited for training videos.',
  },
  {
    name: 'Omar Farouk',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'OF',
    description: 'Enthusiastic and motivating, ideal for announcements.',
  },
  {
    name: 'Lisa Müller',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'LM',
    description: 'Warm, welcoming, great for introductions.',
  },
  {
    name: 'Ethan Clark',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'EC',
    description: 'Direct and crisp, perfect for product launches.',
  },
  {
    name: 'Zara Patel',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'ZP',
    description: 'Relatable and engaging for feedback or surveys.',
  },
  {
    name: 'Santiago Rivera',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'SR',
    description: 'Cheerful, youthful energy for casual contexts.',
  },
];

const scriptProfiles = [
  {
    name: 'Emily Chen',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'EC',
    description: 'Clear and gentle, perfect for e-learning modules.',
  },
  {
    name: 'Mohammed Ali',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'MA',
    description: 'Confident tone, ideal for science and technology scripts.',
  },
  {
    name: 'Olga Petrova',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'OP',
    description: 'Warmth with authority, suited for documentaries.',
  },
  {
    name: 'Lucas Dubois',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'LD',
    description: 'Calm, inviting style for stories and narrative.',
  },
  {
    name: 'Keisha Brown',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'KB',
    description: 'Lively storytelling voice with expressive intonation.',
  },
  {
    name: 'Igor Nowak',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'IN',
    description: 'Steady, even delivery for technical walkthroughs.',
  },
  {
    name: 'Layla Hussein',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'LH',
    description: 'Radiant and expressive, great for creative writing.',
  },
  {
    name: 'Thomas Evans',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'TE',
    description: 'Polished, neutral reporter style.',
  },
  {
    name: 'Chen Wei',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'CW',
    description: 'Balanced, patient—excellent for children’s books.',
  },
  {
    name: 'Nina Williams',
    image: 'https://api.dicebear.com/9.x/glass/svg?seed=Katherine&radius=0',
    initials: 'NW',
    description: 'Modern and upbeat, suited for marketing copy.',
  },
];

// Helper to get correct tabs label and data
const tabsData = [
  { value: 'community', label: 'Community', profiles: communityProfiles },
  { value: 'projects', label: 'Workspace', profiles: projectsProfiles },
  { value: 'script', label: 'Script', profiles: scriptProfiles },
];

export function VoiceProfileSelector() {
  const [query, setQuery] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('community');
  // Keep track of which profile is playing, if any (by name for simplicity)
  const [playingProfile, setPlayingProfile] = React.useState<string | null>(null);

  // Determine current profiles list by selected tab
  const currentTab = tabsData.find((tab) => tab.value === activeTab) ?? tabsData[0]!;
  const profiles = currentTab.profiles;

  // Filtering
  const filteredProfiles = React.useMemo(() => {
    if (!query) return profiles;
    return profiles.filter((profile) => profile.name.toLowerCase().includes(query.toLowerCase()));
  }, [profiles, query]);

  // Pick first available profile for collapsed button
  const allProfiles = [...communityProfiles, ...projectsProfiles, ...scriptProfiles];
  const firstProfile = allProfiles[0]!;

  // Toggle play/pause for a profile
  const handlePlayPause = (profileName: string) => {
    setPlayingProfile((current) => (current === profileName ? null : profileName));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-fit w-full justify-between py-1">
          <div className="flex items-center justify-center gap-3">
            <Avatar size="default">
              <AvatarImage src={firstProfile.image} alt={firstProfile.name} />
              <AvatarFallback>{firstProfile.initials}</AvatarFallback>
            </Avatar>
            <span className="max-w-[120px] truncate text-sm font-medium">{firstProfile.name}</span>
          </div>
          <RiExpandUpDownLine className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Select a Voice Profile</DialogTitle>
          <DialogDescription>
            Choose a voice profile from your available options or create a new one.
          </DialogDescription>
        </DialogHeader>
        <div className="h-full">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col gap-2">
            <div className="mb-2 flex items-center gap-2">
              <TabsList variant="line">
                {tabsData.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="min-w-[90px]">
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="flex-1" />
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder={`Search ${currentTab.label.toLowerCase()} profiles`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="button" variant="secondary" size="lg">
                New Profile
              </Button>
            </div>
            <div className="mt-4 space-y-1">
              <TabsContent value={activeTab as string} className="m-0 p-0">
                <ScrollArea className="h-80">
                  {filteredProfiles.length === 0 ? (
                    <div className="text-muted-foreground py-6 text-center text-sm">
                      No profiles found.
                    </div>
                  ) : (
                    filteredProfiles.map((profile) => (
                      <div
                        key={profile.name}
                        className="flex items-center justify-between rounded-md px-2 py-2"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar size="lg">
                            <AvatarImage src={profile.image} alt={profile.name} />
                            <AvatarFallback>{profile.initials}</AvatarFallback>
                          </Avatar>
                          <div className="flex min-w-0 flex-col">
                            <span className="text-sm font-medium">{profile.name}</span>
                            <span className="text-muted-foreground max-w-[320px] truncate text-xs font-medium">
                              {profile.description}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            size="icon"
                            variant="secondary"
                            className="rounded-full"
                            aria-label={
                              playingProfile === profile.name
                                ? `Pause ${profile.name}`
                                : `Play ${profile.name}`
                            }
                            onClick={() => handlePlayPause(profile.name)}
                          >
                            {playingProfile === profile.name ? <RiPauseFill /> : <RiPlayFill />}
                          </Button>
                          <Button
                            type="button"
                            className="rounded-full"
                            aria-label={`Load ${profile.name}`}
                          >
                            Load
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </ScrollArea>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
