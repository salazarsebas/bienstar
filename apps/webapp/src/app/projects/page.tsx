import ArcGalleryHero from "@/components/ArcImagesHero"

export default function Home() {
  // Using actual images from public folder
  const images = [
    "/projects/reforestation.webp",
    "/projects/reforestation.webp",
    "/projects/reforestation.webp",
    "/projects/reforestation.webp",
    "/projects/reforestation.webp",
    "/projects/reforestation.webp",
    "/projects/reforestation.webp",
    "/projects/reforestation.webp",
    "/projects/reforestation.webp",
    "/projects/reforestation.webp",
  ]

  return (
    <main className="relative min-h-screen bg-background">
      <ArcGalleryHero
        images={images}
        startAngle={20}
        endAngle={160}
        radiusLg={480}
        radiusMd={360}
        radiusSm={260}
        cardSizeLg={120}
        cardSizeMd={100}
        cardSizeSm={80}
        className="pt-16 pb-16 md:pt-20 md:pb-20 lg:pt-24 lg:pb-24"
      />
    </main>
  )
}
