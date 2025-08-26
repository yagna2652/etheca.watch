import React from 'react';
import StoryImage from '../images/Story-removebg-preview.png';

const IntegrationsSection: React.FC = () => {
  return (
    <section className="CalloutSection_section___KRUc">
      <div className="CalloutSection_container__evjvR">
        <div className="CalloutSection_callout_container__A2Wzj">
          <div className="CalloutSection_content__6LL3k">
            <h2 className="CalloutSection_title__7dfAl FeaturesSection_heading_2__z9mcA">
              We map the chaos
            </h2>
            <p className="CalloutSection_description__MS245 FeaturesSection_body__S4iJv">
              Our AI makes sense of your complex workflow so you don't have to. We turn that chaos into a simple prompt with the right updates, ready for your final say.
            </p>
          </div>
          <div className="CalloutSection_graphic__DaHKB">
            <div
              style={{
                background: 'var(--color-white)',
                borderRadius: '0px',
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0'
              }}
            >
              <img
                src={StoryImage}
                alt="Review, Approve, Done - workflow approval process"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;