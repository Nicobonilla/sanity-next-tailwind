import { SiteIdentity } from '@/lib/site-identity';

import ReviewsProof from '@/components/content/ReviewsProof';

export default function ReviewsSection({
  siteIdentity,
}: {
  siteIdentity: SiteIdentity;
}) {
  return (
    <ReviewsProof
      description="Cuando existan perfiles externos configurados, esta seccion refuerza confianza sin inventar testimonios ni depender de texto ambiguo."
      eyebrow="Prueba social"
      siteIdentity={siteIdentity}
      source="home_reviews"
      title="Resenas verificables y referencias visibles para reducir friccion."
    />
  );
}
