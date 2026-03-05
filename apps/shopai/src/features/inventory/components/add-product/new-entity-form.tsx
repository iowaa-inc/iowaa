import React, { useState } from 'react';

import Image from 'next/image';

import { AttributeProposal } from '@/features/inventory/components/attribute-proposal';
import { CheckCircle2, Loader2, Plus, Sparkles, Upload } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';

import { Button } from '@/components/ui/button';
import { ImageComparisonSlider } from '@/components/ui/image-comparison-slider-horizontal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { AttributeEmptyView } from './attribute-empty-view';

type ViewType = 'front' | 'left' | 'top' | 'back';

type ViewState = {
  view: ViewType;
  uploadedImage?: string;
  generatedImage?: string;
  isGenerating: boolean;
};

type Attribute = { name: string; value: string };

type EntityFormState = {
  name: string;
  brand: string;
  description: string;
  isGeneratingDescription: boolean;
  views: ViewState[];
  attributes?: Attribute[];
};

const initialViews: ViewState[] = [
  {
    view: 'front',
    uploadedImage: undefined,
    generatedImage: undefined,
    isGenerating: false,
  },
  {
    view: 'left',
    uploadedImage: undefined,
    generatedImage: undefined,
    isGenerating: false,
  },
  {
    view: 'top',
    uploadedImage: undefined,
    generatedImage: undefined,
    isGenerating: false,
  },
  {
    view: 'back',
    uploadedImage: undefined,
    generatedImage: undefined,
    isGenerating: false,
  },
];

export function NewEntityForm() {
  const [state, setState] = useState<EntityFormState>({
    name: '',
    brand: '',
    description: '',
    isGeneratingDescription: false,
    views: initialViews,
    attributes: [], // for demo; replace with actual attribute logic in integration
  });

  const [peId] = useQueryState('peId', parseAsString);

  const generateDescription = async () => {
    setState((prev) => ({
      ...prev,
      isGeneratingDescription: true,
    }));
    await new Promise((res) => setTimeout(res, 1200));
    setState((prev) => ({
      ...prev,
      description: `Introducing the "${prev.name}", a premium product by ${prev.brand}. Enjoy outstanding quality and design.`,
      isGeneratingDescription: false,
    }));
  };

  const setViewState = (view: ViewType, updates: Partial<ViewState>) => {
    setState((prev) => ({
      ...prev,
      views: prev.views.map((v) => (v.view === view ? { ...v, ...updates } : v)),
    }));
  };

  const uploadImage = (view: ViewType, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (ev) => {
      setViewState(view, {
        uploadedImage: ev.target?.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const generateView = async (view: ViewType) => {
    setViewState(view, { isGenerating: true });
    await new Promise((res) => setTimeout(res, 1200));
    setState((prev) => ({
      ...prev,
      views: prev.views.map((v) => {
        if (v.view === view) {
          return {
            ...v,
            generatedImage: v.uploadedImage ? v.uploadedImage + '#ai' : undefined,
            isGenerating: false,
          };
        }
        return v;
      }),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Product Name & Brand - Grouped and Responsive */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Product Name */}
        <div className="flex-1 space-y-2">
          <Label htmlFor="product-name">
            Product Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="product-name"
            placeholder="e.g., Wireless Headphones Pro"
            value={state.name}
            onChange={(e) => setState((prev) => ({ ...prev, name: e.target.value }))}
            className="border-muted-foreground/20"
          />
        </div>
        {/* Brand */}
        <div className="flex-1 space-y-2">
          <Label htmlFor="brand">
            Brand <span className="text-red-500">*</span>
          </Label>
          <Input
            id="brand"
            placeholder="e.g., Sony, Apple, Samsung"
            value={state.brand}
            onChange={(e) => setState((prev) => ({ ...prev, brand: e.target.value }))}
            className="border-muted-foreground/20"
          />
        </div>
      </div>

      {/* Product Attributes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base">Product Attributes</Label>
          <AttributeProposal entityId={peId ?? ''}>
            <Button type="button" variant="secondary">
              <Plus className="mr-1 h-4 w-4" />
              Add Attribute
            </Button>
          </AttributeProposal>
        </div>
        {state.attributes?.length === 0 && <AttributeEmptyView />}
      </div>

      {/* Product Description with AI Generate */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="description">
            Product Description <span className="text-red-500">*</span>
          </Label>
          <Button
            type="button"
            variant="outline"
            onClick={generateDescription}
            disabled={state.isGeneratingDescription || !state.name.trim()}
            className="gap-2 bg-transparent"
          >
            {state.isGeneratingDescription ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate with AI
              </>
            )}
          </Button>
        </div>
        <Textarea
          id="description"
          placeholder="Enter a detailed product description or click Generate to create one using AI"
          value={state.description}
          onChange={(e) => setState((prev) => ({ ...prev, description: e.target.value }))}
          rows={5}
          className="border-muted-foreground/20 resize-none"
        />
        <p className="text-muted-foreground text-xs">
          AI will analyze your product attributes to generate a comprehensive description
        </p>
      </div>

      {/* Virtual Studio */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-base">
            <Button size="icon-lg" variant="secondary" className="bg-primary/10">
              <Sparkles className="text-primary" />
            </Button>
            AI Virtual Studio
          </Label>
          <p className="text-muted-foreground text-sm">
            Upload photos for each viewing angle and generate studio-quality versions with AI
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {state.views.map((v) => (
            <div key={v.view} className="space-y-2">
              <Label className="capitalize">{v.view} View</Label>
              <div className="bg-muted/50 relative aspect-square overflow-hidden rounded-lg">
                {v.uploadedImage && v.generatedImage ? (
                  <ImageComparisonSlider
                    leftImage={v.uploadedImage}
                    rightImage={v.generatedImage}
                    altLeft={`Original ${v.view}`}
                    altRight={`Studio ${v.view}`}
                    className="h-full w-full"
                  />
                ) : v.uploadedImage || v.generatedImage ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={(v.generatedImage || v.uploadedImage)!}
                      alt={`${v.view} view`}
                      unoptimized
                      fill
                      style={{
                        objectFit: 'contain',
                        width: '100%',
                        height: '100%',
                      }}
                      sizes="100vw"
                    />
                    {v.generatedImage && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="h-4 w-4 rounded-full bg-white text-green-600" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="space-y-2 text-center">
                      <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-white/10">
                        <Upload className="size-6 text-white" />
                      </div>
                      <p className="text-muted-foreground text-xs">No image uploaded</p>
                    </div>
                  </div>
                )}
              </div>
              {/* Action Buttons */}
              <div className="flex gap-2">
                <input
                  id={`${v.view}-upload`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => uploadImage(v.view, e)}
                  className="hidden"
                />
                <label htmlFor={`${v.view}-upload`} className="flex-1">
                  <Button type="button" variant="outline" className="w-full" asChild>
                    <span>
                      <Upload />
                      Upload
                    </span>
                  </Button>
                </label>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => generateView(v.view)}
                  disabled={!v.uploadedImage || v.isGenerating}
                  className="w-full flex-1"
                >
                  {v.isGenerating ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Processing...
                    </>
                  ) : v.generatedImage ? (
                    <>
                      <Sparkles />
                      Regenerate
                    </>
                  ) : (
                    <>
                      <Sparkles />
                      Generate Studio
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <p className="text-muted-foreground w-full text-center text-sm">
          Drag the slider to compare original and studio versions.
        </p>
      </div>
    </div>
  );
}
