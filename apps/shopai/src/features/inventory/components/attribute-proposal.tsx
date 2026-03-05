'use client';

import React, { useState } from 'react';

import { useMediaQuery } from '@/hooks/use-media-query';

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

import { AttributesCreator } from './attributes-creator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TriggerElement = React.ReactElement<any, string | React.JSXElementConstructor<any>>;

export function AttributeProposal({
  children,
  entityId,
}: {
  children: React.ReactNode;
  entityId: string;
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // Use props.children as trigger for both dialog/drawer
  const trigger = (
    <span suppressHydrationWarning>
      {React.isValidElement(children) ? (
        React.cloneElement(children as TriggerElement, {
          onClick: (e: React.MouseEvent) => {
            const props = (children as React.ReactElement).props as {
              onClick?: (event: React.MouseEvent) => void;
            };
            if (typeof props.onClick === 'function') props.onClick(e);
            setOpen(true);
          },
        })
      ) : (
        <span onClick={() => setOpen(true)}>{children}</span>
      )}
    </span>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Propose New Attribute</DialogTitle>
            <DialogDescription>
              Suggest a new product specification. This will be reviewed by other users and, if
              uncontested for 4 days, added automatically.
            </DialogDescription>
          </DialogHeader>
          <AttributesCreator onClose={() => setOpen(false)} productId={entityId} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Propose New Attribute</DrawerTitle>
          <DrawerDescription>
            Suggest a new product specification. This will be reviewed by other users and, if
            uncontested for 4 days, added automatically.
          </DrawerDescription>
        </DrawerHeader>
        <AttributesCreator onClose={() => setOpen(false)} productId={entityId} />
      </DrawerContent>
    </Drawer>
  );
}
