// src/components/common/OrganicSymbols.tsx
export default function OrganicSymbols() {
  return (
    <div className="hidden">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <symbol id="movement-icon" viewBox="0 0 120 120">
            <image href="/symbols/movement.svg" width="120" height="120" />
          </symbol>
          <symbol id="campaigns-icon" viewBox="0 0 120 120">
            <image href="/symbols/campaigns.svg" width="120" height="120" />
          </symbol>
          <symbol id="projects-icon" viewBox="0 0 120 120">
            <image href="/symbols/projects.svg" width="120" height="120" />
          </symbol>
          <symbol id="resources-icon" viewBox="0 0 120 120">
            <image href="/symbols/resources.svg" width="120" height="120" />
          </symbol>
        </defs>
      </svg>
    </div>
  );
}
