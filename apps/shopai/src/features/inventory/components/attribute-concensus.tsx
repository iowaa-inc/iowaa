'use client';

import React, { useMemo, useState } from 'react';

import { useMediaQuery } from '@/hooks/use-media-query';
import { CheckCircle2 } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CircularProgress } from '@/components/ui/circular-progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';

import { useProductAttributeProperty } from '../hooks/use-product-attribute-property';
import { useProductAttributeProposal } from '../hooks/use-product-attribute-proposal';
import type { ProductAttributeProperty, ProductAttributeProposal } from '../types';

interface AttributeConcensusProps {
  children: React.ReactNode;
  entityId: string;
}

export function AttributeConcensus({ children, entityId }: AttributeConcensusProps) {
  const [userVotes, setUserVotes] = useState<Record<string, string>>({});
  const [open, setOpen] = useState(false);

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const { get: getProps } = useProductAttributeProperty();
  const { get: getProposals, update: updateProposal } = useProductAttributeProposal();

  const properties: ProductAttributeProperty[] = useMemo(() => {
    const res = getProps('entityId', entityId);
    return Array.isArray(res) ? res : [];
  }, [getProps, entityId]);

  const attributeConflicts = useMemo(() => {
    return properties
      .map((property) => {
        const proposals =
          (getProposals('propertyId', property.id) as ProductAttributeProposal[]) || [];

        if (proposals.length < 2) return null;

        const notConsensus = proposals.filter((p) => (p.votes || 0) < p.votesRequired);

        if (notConsensus.length > 0) {
          return {
            property,
            proposals,
          };
        }

        return null;
      })
      .filter(Boolean) as {
      property: ProductAttributeProperty;
      proposals: ProductAttributeProposal[];
    }[];
  }, [properties, getProposals]);

  function selectProposal(propertyId: string, proposalId: string) {
    setUserVotes((current) => ({
      ...current,
      [propertyId]: proposalId,
    }));
  }

  function submitVotes() {
    Object.entries(userVotes).forEach(([propId, proposalId]) => {
      const conflict = attributeConflicts.find((c) => c.property.id === propId);
      const proposal = conflict?.proposals.find((p) => p.id === proposalId);
      if (proposal && (proposal.votes || 0) < proposal.votesRequired) {
        updateProposal({ votes: (proposal.votes || 0) + 1 }, proposal.id);
      }
    });
    setOpen(false);
    setUserVotes({});
  }

  // Prepare a trigger that just sets open (copied from attribute-proposal, using asChild and pointer events)
  const trigger = (
    <span
      suppressHydrationWarning
      tabIndex={0}
      role="button"
      style={{ display: 'inline-flex' }}
      onClick={() => setOpen(true)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setOpen(true);
        }
      }}
    >
      {children}
    </span>
  );

  // Extracted VotingContent logic inline here, removing unnecessary props.
  const renderVotingContent = (scrollAreaClass?: string) => (
    <>
      <ScrollArea className={scrollAreaClass ?? 'max-h-[54vh] flex-1 pr-2'}>
        <Accordion type="single" collapsible className="w-full">
          {attributeConflicts.map(({ property, proposals }) => {
            const propertyId = property.id;
            const userSelected = userVotes[propertyId];
            const sortedProposals = [...proposals].sort((a, b) => (b.votes || 0) - (a.votes || 0));
            const userHasVoted = !!userSelected;
            return (
              <AccordionItem key={propertyId} value={propertyId}>
                <AccordionTrigger className="py-3 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{property.name}</span>
                    <span className="bg-muted size-1.5 rounded-full"></span>
                    <p className="text-muted-foreground text-sm">
                      {sortedProposals.length} proposals
                    </p>
                    {userHasVoted && (
                      <Badge variant="secondary" className="py-3">
                        <CheckCircle2 className="mr-1" />
                        Voted
                      </Badge>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    {sortedProposals.map((proposal) => {
                      const isUserVote = userSelected === proposal.id;
                      const votes = proposal.votes || 0;
                      const needed = proposal.votesRequired || 1;
                      const supportPct = Math.round((votes / needed) * 100);
                      return (
                        <button
                          key={proposal.id}
                          type="button"
                          onClick={() => selectProposal(propertyId, proposal.id)}
                          className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                            isUserVote
                              ? 'border-primary'
                              : 'border-border hover:border-foreground/30'
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-base font-semibold">{proposal.value}</span>
                                  {isUserVote && (
                                    <Badge variant="default" className="p-3">
                                      Your Vote
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col items-center gap-1">
                                <CircularProgress
                                  className="size-12"
                                  value={supportPct}
                                  max={100}
                                  size={58}
                                  strokeWidth={4}
                                />
                              </div>
                            </div>
                            <div className="text-muted-foreground flex items-center justify-between text-xs">
                              <span>
                                {votes} / {needed} supports
                              </span>
                              <span>
                                {votes >= needed
                                  ? '✓ Consensus reached'
                                  : `${needed - votes} more needed`}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </ScrollArea>
      <div className="flex justify-end pt-4">
        <Button
          className="smw-fit w-full"
          type="button"
          onClick={submitVotes}
          disabled={Object.keys(userVotes).length === 0}
          variant="default"
        >
          Submit Votes
        </Button>
      </div>
    </>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent
          className="flex max-h-[85vh] flex-col overflow-hidden"
          style={{ maxWidth: '38rem' }}
        >
          <DialogHeader>
            <DialogTitle>Vote on Product Attribute Proposals</DialogTitle>
            <DialogDescription>
              Help the community decide the correct product details by voting for the attribute
              value you support.
            </DialogDescription>
          </DialogHeader>
          {renderVotingContent()}
        </DialogContent>
      </Dialog>
    );
  }

  // Mobile: show as drawer, header in parent, scroll max-height custom for mobile
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Vote on Product Attribute Proposals</DrawerTitle>
          <DrawerDescription>
            Help the community decide the correct product details by voting for the attribute value
            you support.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-6 pb-6">{renderVotingContent('flex-1 pr-2 max-h-[60vh]')}</div>
      </DrawerContent>
    </Drawer>
  );
}
