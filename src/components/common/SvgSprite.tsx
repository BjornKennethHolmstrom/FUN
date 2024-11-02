// src/components/common/SvgSprite.tsx
export default function SvgSprite() {
  return (
    <div
      className="hidden"
      dangerouslySetInnerHTML={{
        __html: `
          <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <!-- Symbols content from organic-symbols.svg -->
          </svg>
        `,
      }}
    />
  );
}
