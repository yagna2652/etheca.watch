import React from 'react';
const WorksWithToolsImage = '/images/workswithyourtools-removebg-preview.png';

const IntegrationsShowcase: React.FC = () => {
  return (
    <section className="CalloutSection_section___KRUc" style={{ borderTop: '1px solid var(--color-border-grid-alpha-60-white)' }}>
      <div className="CalloutSection_container__evjvR">
        <div className="CalloutSection_callout_container__A2Wzj">
          <div 
            className="CalloutSection_content__6LL3k"
            style={{
              position: 'relative',
              backgroundSize: '20px 20px',
              backgroundImage: `
                linear-gradient(to right, rgba(224, 224, 229, 0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(224, 224, 229, 0.3) 1px, transparent 1px)
              `,
            }}
          >
            <h2 className="CalloutSection_title__7dfAl FeaturesSection_heading_2__z9mcA">
              Works with your tools.
            </h2>
            <p className="CalloutSection_description__MS245 FeaturesSection_body__S4iJv">
              We integrate with your favorite CRMs, project management boards, and communication apps to capture updates automatically.
            </p>
          </div>
          <div className="CalloutSection_graphic__DaHKB DataSection_graphic__r_FIJ">
            <div
              style={{
                background: 'var(--color-surface-gray)',
                borderRadius: 'var(--radius)',
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--spacer-lg)'
              }}
            >
              <img
                src={WorksWithToolsImage}
                alt="Works with your tools - integrations with CRMs and project management"
                className="content-image-mobile"
                style={{
                  maxWidth: '100%',
                  maxHeight: '320px',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>
            <div className="DataSection_animation__8pvV_"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsShowcase;