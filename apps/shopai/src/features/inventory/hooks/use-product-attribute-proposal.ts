import { useInventoryStore } from '../inventory-provider';
import type { ProductAttributeProposal } from '../types';

export function useProductAttributeProposal() {
  const { data } = useInventoryStore();

  return {
    get(
      key?: keyof ProductAttributeProposal,
      value?: string,
    ): ProductAttributeProposal[] | ProductAttributeProposal | undefined {
      const proposals = data.get().attributeProposals;
      if (key && value !== undefined) {
        return proposals.filter((proposal: ProductAttributeProposal) => proposal[key] === value);
      }
      return proposals;
    },

    set(
      proposalsOrProposal: ProductAttributeProposal[] | ProductAttributeProposal,
      proposalId?: string,
    ) {
      if (proposalId && !Array.isArray(proposalsOrProposal)) {
        const prev = data.get().attributeProposals;
        data.set({
          ...data.get(),
          attributeProposals: prev.map((proposal) =>
            proposal.id === proposalId ? proposalsOrProposal : proposal,
          ),
        });
      } else if (Array.isArray(proposalsOrProposal)) {
        data.set({
          ...data.get(),
          attributeProposals: proposalsOrProposal,
        });
      }
    },

    add(proposal: ProductAttributeProposal) {
      const prev = data.get().attributeProposals;
      data.set({ ...data.get(), attributeProposals: [...prev, proposal] });
    },

    update(updates: Partial<ProductAttributeProposal>, proposalId?: string) {
      if (!proposalId) return;
      const prev = data.get().attributeProposals;
      data.set({
        ...data.get(),
        attributeProposals: prev.map((proposal) =>
          proposal.id === proposalId ? { ...proposal, ...updates } : proposal,
        ),
      });
    },

    remove(proposalId: string) {
      const prev = data.get().attributeProposals;
      data.set({
        ...data.get(),
        attributeProposals: prev.filter((proposal) => proposal.id !== proposalId),
      });
    },

    reset() {
      data.reset();
    },
  };
}
