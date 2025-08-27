import React from 'react';
const InvisibleHandImage = '/images/Invisible-hand-removebg-preview.png';

const InvisibleHandSection: React.FC = () => {
  return (
    <section className="Home_gradient_wrapper__ndCXg" style={{ borderTop: '1px solid #e0e0e0' }}>
      <div className="CalloutSection_section___KRUc">
        <div className="CalloutSection_container__evjvR">
          <div className="CalloutSection_callout_container__A2Wzj">
            <div className="CalloutSection_content__6LL3k">
              <h2 className="CalloutSection_title__7dfAl FeaturesSection_heading_2__z9mcA">
                The invisible hand that updates your data
              </h2>
              <p className="CalloutSection_description__MS245 FeaturesSection_body__S4iJv">
                Focus on your work, not data entry. Our AI learns your workflow to keep your source of truth perfectly accurate, guaranteed.
              </p>
            </div>
            <div className="CalloutSection_graphic__DaHKB">
              <div
                style={{
                  background: 'white',
                  borderRadius: '0px',
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px'
                }}
              >
                <img
                  src={InvisibleHandImage}
                  alt="The invisible hand that updates your data"
                  className="content-image-mobile"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '320px',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvisibleHandSection;